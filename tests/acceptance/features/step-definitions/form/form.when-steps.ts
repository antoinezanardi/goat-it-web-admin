import { When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";

When(
  /^the user fills the input with name "(?<name>[^"]*)" with text "(?<text>[^"]*)"$/u,
  async function(this: GoatItWorld, name: string, text: string): Promise<void> {
    const locator = this.page.getByRole("textbox", { name });

    await expect(locator).toBeVisible();
    await locator.fill(text);
  },
);