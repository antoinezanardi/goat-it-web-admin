import { fileURLToPath } from "node:url";

import type { ITestCaseHookParameter } from "@cucumber/cucumber";
import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";
import { createPage, createTest } from "@nuxt/test-utils/e2e";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";
import {
  generateScreenshotOnScenarioFailure,
  removeAcceptanceTestsReportsScreenshotsDirectory,
} from "#acceptance/features/support/helpers/hooks.helpers.ts";

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
      defaultLocale: "en",
    },
  },
});

const BEFORE_ALL_TIMEOUT = 360_000;

const BEFORE_TIMEOUT = 10_000;

BeforeAll({ timeout: BEFORE_ALL_TIMEOUT }, async(): Promise<void> => {
  removeAcceptanceTestsReportsScreenshotsDirectory();
  await beforeAll();
});

Before({ timeout: BEFORE_TIMEOUT }, async function(this: GoatItWorld): Promise<void> {
  beforeEach();
  this.page = await createPage();
  this.context = this.page.context();
});

After({}, async function(this: GoatItWorld, scenario: ITestCaseHookParameter): Promise<void> {
  afterEach();

  if (scenario.result?.status === Status.FAILED) {
    await generateScreenshotOnScenarioFailure(this, scenario);
  }
  await this.page.close();
  await this.context.close();
});

AfterAll(async(): Promise<void> => {
  await afterAll();
});