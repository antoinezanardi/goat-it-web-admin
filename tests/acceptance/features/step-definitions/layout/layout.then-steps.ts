import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";

Then(
  /^the app name in navbar should be "(?<name>[^"]*)"$/u,
  async function(this: GoatItWorld, name: string): Promise<void> {
    const locator = this.page.locator("#default-layout-header").getByText(name, { exact: true });

    await expect(locator).toBeVisible();
  },
);