import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";

Then(
  /^the input with name "(?<name>[^"]*)" should have value "(?<value>[^"]*)"$/u,
  async function(this: GoatItWorld, name: string, value: string): Promise<void> {
    const locator = this.page.getByRole("textbox", { name });

    await expect(locator).toHaveValue(value);
  },
);

Then(
  /^the input with name "(?<name>[^"]*)" should be focused$/u,
  async function(this: GoatItWorld, name: string): Promise<void> {
    const locator = this.page.getByRole("textbox", { name });

    await expect(locator).toBeFocused();
  },
);