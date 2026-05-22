import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";

Then(
  /^the theme "(?<themeName>[^"]*)" should be visible in the question theme selector list$/u,
  async function(this: GoatItWorld, themeName: string): Promise<void> {
    const dialog = this.page.getByRole("dialog");
    const themeList = dialog.getByTestId("question-theme-selector-list");

    await expect(themeList.getByText(themeName)).toBeVisible();
  },
);

Then(
  /^the theme "(?<themeName>[^"]*)" should be hidden in the question theme selector list$/u,
  async function(this: GoatItWorld, themeName: string): Promise<void> {
    const dialog = this.page.getByRole("dialog");
    const themeList = dialog.getByTestId("question-theme-selector-list");

    await expect(themeList.getByText(themeName)).toBeHidden();
  },
);

Then(
  /^the question form source urls input should have no tags$/u,
  async function(this: GoatItWorld): Promise<void> {
    const dialog = this.page.getByRole("dialog");
    const sourceUrlsContainer = dialog.getByTestId("question-source-urls-input");
    const tags = sourceUrlsContainer.locator("[data-part='item-preview']");

    await expect(tags).toHaveCount(0);
  },
);

Then(
  /^the remove button for the theme "(?<themeName>[^"]*)" should be disabled in the question form theme selector$/u,
  async function(this: GoatItWorld, themeName: string): Promise<void> {
    const dialog = this.page.getByRole("dialog");
    const themeList = dialog.getByTestId("question-theme-selector-list");
    const themeItem = themeList.locator("[data-testid^='question-theme-selector-item-']").filter({ hasText: themeName });
    const removeButton = themeItem.locator("[data-testid^='question-theme-selector-remove-']");

    await expect(removeButton).toBeDisabled();
  },
);