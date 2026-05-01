import { When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";

When(
  /^the user switches the locale to "(?<localeName>[^"]+)"$/u,
  async function(this: GoatItWorld, localeName: string): Promise<void> {
    const localeButton = this.page.getByTestId("locale-select");

    await expect(localeButton).toBeVisible();
    await localeButton.click();

    const listbox = this.page.getByRole("listbox");

    await expect(listbox).toBeVisible();

    const option = listbox.getByRole("option", { name: localeName });

    await expect(option).toBeVisible();
    await option.click();
    await expect(listbox).toBeHidden();
  },
);