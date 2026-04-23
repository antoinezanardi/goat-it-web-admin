import { fileURLToPath } from "node:url";

import type { ITestCaseHookParameter } from "@cucumber/cucumber";
import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";
import { createPage, createTest } from "@nuxt/test-utils/e2e";

import {
  ACCEPTANCE_TESTS_DEFAULT_LOCALE,
  BEFORE_ALL_TIMEOUT,
  BEFORE_TIMEOUT,
} from "#acceptance/features/support/constants/hooks.constants.ts";
import {
  generateScreenshotOnScenarioFailure,
  removeAcceptanceTestsReportsScreenshotsDirectory,
} from "#acceptance/features/support/helpers/hooks.helpers.ts";
import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";

const { beforeEach, afterEach, afterAll, beforeAll } = createTest({
  runner: "cucumber",
  server: true,
  browserOptions: {
    type: "chromium",
    launch: {
      headless: true,
      ignoreDefaultArgs: ["--hide-scrollbars"],
    },
  },
  rootDir: fileURLToPath(new URL("../../../..", import.meta.url)),
  nuxtConfig: {
    i18n: {
      defaultLocale: ACCEPTANCE_TESTS_DEFAULT_LOCALE,
    },
  },
});

BeforeAll({ timeout: BEFORE_ALL_TIMEOUT }, async(): Promise<void> => {
  removeAcceptanceTestsReportsScreenshotsDirectory();
  await beforeAll();
});

Before({ timeout: BEFORE_TIMEOUT }, async function(this: GoatItWorld): Promise<void> {
  beforeEach();
  this.page = await createPage();
  this.context = this.page.context();
});

After(async function(this: GoatItWorld, scenario: ITestCaseHookParameter): Promise<void> {
  afterEach();

  if (scenario.result?.status === Status.FAILED) {
    try {
      await generateScreenshotOnScenarioFailure(this, scenario);
    } catch(error: unknown) {
      console.error("Failed to generate screenshot on scenario failure:", error);
    }
  }

  try {
    await this.context.close();
  } catch(error: unknown) {
    console.error("Failed to close browser context:", error);
  }
});

AfterAll(async(): Promise<void> => {
  await afterAll();
});