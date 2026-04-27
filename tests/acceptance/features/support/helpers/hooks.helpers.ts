import { execSync } from "node:child_process";

import type { ITestCaseHookParameter } from "@cucumber/cucumber";
import { rimraf } from "rimraf";

import { ACCEPTANCE_TESTS_REPORTS_SCREENSHOTS_PATH } from "#acceptance/features/support/constants/acceptance.constants.ts";
import {
  SANDBOX_HEALTH_CHECK_INTERVAL_IN_MS,
  SANDBOX_HEALTH_CHECK_MAX_RETRIES,
  SANDBOX_HEALTH_CHECK_URL,
} from "#acceptance/features/support/constants/hooks.constants.ts";
import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";

function removeAcceptanceTestsReportsScreenshotsDirectory(): void {
  const acceptanceTestsReportsDirectoryFilesPath = `${process.cwd()}/${ACCEPTANCE_TESTS_REPORTS_SCREENSHOTS_PATH}`;

  console.info(`Removing reports screenshots directory: "${acceptanceTestsReportsDirectoryFilesPath}"`);
  rimraf.sync(acceptanceTestsReportsDirectoryFilesPath);
}

function sanitizeScenarioName(name: string): string {
  const MAX_LENGTH = 200;

  return name
    .replaceAll(/["*/:<>?\\|]/gu, "-")
    .replaceAll("..", "")
    .replaceAll(/\s+/gu, "-")
    .replaceAll(/^-+|-+$/gu, "")
    .slice(0, MAX_LENGTH);
}

async function generateScreenshotOnScenarioFailure(world: GoatItWorld, scenario: ITestCaseHookParameter): Promise<void> {
  const screenShotExtension = ".png";
  const sanitizedName = sanitizeScenarioName(scenario.pickle.name);
  const screenShotRelativePath = `${ACCEPTANCE_TESTS_REPORTS_SCREENSHOTS_PATH}/${sanitizedName}-${Date.now()}${screenShotExtension}`;
  const screenShot = await world.page.screenshot({
    path: screenShotRelativePath,
    fullPage: true,
  });

  world.attach(screenShot, "image/png");
  const screenShotFullPath = `${process.cwd()}/${screenShotRelativePath}`;

  console.info(`Screenshot for failure scenario: ${scenario.pickle.name} saved at: "${screenShotFullPath}"`);
}

async function sleep(ms: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(resolve, ms);
  });
}

function resetSandbox(): void {
  execSync("pnpm run docker:api-sandbox:reset", { stdio: "inherit" });
}

async function waitForSandboxHealthCheck(): Promise<void> {
  const MS_IN_SECOND = 1000;

  for (let attempt = 1; attempt <= SANDBOX_HEALTH_CHECK_MAX_RETRIES; attempt++) {
    try {
      // oxlint-disable-next-line eslint/no-await-in-loop -- Intentional sequential retry polling
      const response = await fetch(SANDBOX_HEALTH_CHECK_URL);

      if (response.ok) {
        return;
      }
    } catch {
      // Server not ready yet, retry
    }

    if (attempt < SANDBOX_HEALTH_CHECK_MAX_RETRIES) {
      // oxlint-disable-next-line eslint/no-await-in-loop -- Intentional sequential delay between retries
      await sleep(SANDBOX_HEALTH_CHECK_INTERVAL_IN_MS);
    }
  }

  throw new Error(`Goat It API sandbox did not become healthy after ${SANDBOX_HEALTH_CHECK_MAX_RETRIES} retries (${SANDBOX_HEALTH_CHECK_MAX_RETRIES * SANDBOX_HEALTH_CHECK_INTERVAL_IN_MS / MS_IN_SECOND}s).`);
}

export {
  generateScreenshotOnScenarioFailure,
  removeAcceptanceTestsReportsScreenshotsDirectory,
  resetSandbox,
  sanitizeScenarioName,
  sleep,
  waitForSandboxHealthCheck,
};