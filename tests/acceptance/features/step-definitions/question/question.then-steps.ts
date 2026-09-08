import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";
import { resolveVisibleDialog } from "#acceptance/features/support/helpers/dialog.helpers.ts";
import { getQuestionApplicableLocalesSelect } from "#acceptance/features/support/helpers/question.helpers.ts";

Then(
  /^the theme "(?<themeName>[^"]*)" should be visible in the question theme selector list$/u,
  async function(this: GoatItWorld, themeName: string): Promise<void> {
    const dialog = await resolveVisibleDialog(this.page);
    const themeList = dialog.getByTestId("question-theme-selector-list");

    await expect(themeList.getByText(themeName, { exact: true })).toBeVisible();
  },
);

Then(
  /^the theme "(?<themeName>[^"]*)" should be hidden in the question theme selector list$/u,
  async function(this: GoatItWorld, themeName: string): Promise<void> {
    const dialog = await resolveVisibleDialog(this.page);
    const themeList = dialog.getByTestId("question-theme-selector-list");

    await expect(themeList.getByText(themeName, { exact: true })).toBeHidden();
  },
);

Then(
  /^the question form source urls input should have no tags$/u,
  async function(this: GoatItWorld): Promise<void> {
    const dialog = await resolveVisibleDialog(this.page);
    const sourceUrlsContainer = dialog.getByTestId("question-source-urls-input");
    const tags = sourceUrlsContainer.locator("[data-part='item-preview']");

    await expect(tags).toHaveCount(0);
  },
);

Then(
  /^the remove button for the theme "(?<themeName>[^"]*)" should be disabled in the question form theme selector$/u,
  async function(this: GoatItWorld, themeName: string): Promise<void> {
    const dialog = await resolveVisibleDialog(this.page);
    const themeList = dialog.getByTestId("question-theme-selector-list");
    const themeItem = themeList.locator("[data-testid^='question-theme-selector-assignment-']").filter({ has: this.page.getByText(themeName, { exact: true }) });
    const removeButton = themeItem.locator("[data-testid^='question-theme-selector-remove-']");

    await expect(removeButton).toBeDisabled();
  },
);

Then(
  /^the remove button for the theme "(?<themeName>[^"]*)" should be hidden in the question form theme selector$/u,
  async function(this: GoatItWorld, themeName: string): Promise<void> {
    const dialog = await resolveVisibleDialog(this.page);
    const themeList = dialog.getByTestId("question-theme-selector-list");
    const themeItem = themeList.locator("[data-testid^='question-theme-selector-assignment-']").filter({ has: this.page.getByText(themeName, { exact: true }) });
    const removeButton = themeItem.locator("[data-testid^='question-theme-selector-remove-']");

    await expect(removeButton).toBeHidden();
  },
);

Then(
  /^the option with name "(?<name>[^"]*)" in the applicable locales dropdown should have icon "(?<icon>[^"]*)"$/u,
  async function(this: GoatItWorld, name: string, icon: string): Promise<void> {
    const listbox = this.page.getByRole("listbox");

    await expect(listbox).toBeVisible();

    const option = listbox.getByRole("option", { name, exact: true });
    const iconElement = option.locator(".iconify");

    await expect(iconElement).toBeVisible();

    const classes = await iconElement.evaluate((element: Element) => element.getAttribute("class") ?? "");
    const iconSetName = icon.replace(/^i-/u, "").split("-").slice(0, 2).join("-");
    const hasCorrectIcon = classes.includes(iconSetName);

    expect(hasCorrectIcon, `Expected icon classes "${classes}" to contain "${iconSetName}"`).toBe(true);
  },
);

Then(
  /^the question form applicable locales selector should have no selected locales$/u,
  async function(this: GoatItWorld): Promise<void> {
    const dialog = await resolveVisibleDialog(this.page);
    const select = getQuestionApplicableLocalesSelect(dialog);

    await expect(select.locator("[aria-label^='Remove ']")).toHaveCount(0);
  },
);