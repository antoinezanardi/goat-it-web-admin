import { When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { DataTable } from "@cucumber/cucumber";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";
import { validateDataTableAndGetFirstRow } from "#acceptance/features/support/helpers/datatable.helpers.ts";
import { resolveVisibleDialog } from "#acceptance/features/support/helpers/dialog.helpers.ts";
import { selectOptionFromListbox } from "#acceptance/features/support/helpers/listbox.helpers.ts";
import { QUESTION_FORM_ROW_SCHEMA } from "#acceptance/features/step-definitions/question/datatables/question.datatables.schemas.ts";
import { fillQuestionForm } from "#acceptance/features/step-definitions/question/helpers/question.when-steps.helpers.ts";

When(
  /^the user fills the question form with the following attributes:$/u,
  async function(this: GoatItWorld, dataTable: DataTable): Promise<void> {
    const row = validateDataTableAndGetFirstRow(dataTable, QUESTION_FORM_ROW_SCHEMA);
    const dialog = await resolveVisibleDialog(this.page);
    await fillQuestionForm(dialog, row);
  },
);

When(
  /^the user removes the theme "(?<themeName>[^"]*)" from the question form selected themes$/u,
  async function(this: GoatItWorld, themeName: string): Promise<void> {
    const dialog = await resolveVisibleDialog(this.page);

    const themeList = dialog.getByTestId("question-theme-selector-list");
    const themeItem = themeList.locator("[data-testid^='question-theme-selector-assignment-']").filter({ has: this.page.getByText(themeName, { exact: true }) });
    const removeButton = themeItem.locator("[data-testid^='question-theme-selector-remove-']");

    await expect(removeButton).toBeVisible();
    await removeButton.click();
  },
);

When(
  /^the user types "(?<text>[^"]*)" in the question form source urls input and presses Enter$/u,
  async function(this: GoatItWorld, text: string): Promise<void> {
    const dialog = await resolveVisibleDialog(this.page);

    const sourceInput = dialog.getByRole("textbox", { name: "Sources*" });

    await expect(sourceInput).toBeVisible();
    await sourceInput.fill(text);
    await sourceInput.press("Enter");
  },
);

When(
  /^the user adds the theme "(?<themeName>[^"]*)" in the question form theme selector$/u,
  async function(this: GoatItWorld, themeName: string): Promise<void> {
    const dialog = await resolveVisibleDialog(this.page);

    const themeSelect = dialog.getByTestId("question-theme-selector-select");

    await expect(themeSelect).toBeVisible();

    await selectOptionFromListbox(themeSelect, this.page, themeName);
  },
);

When(
  /^the user sets the theme "(?<themeName>[^"]*)" as primary in the question form theme selector$/u,
  async function(this: GoatItWorld, themeName: string): Promise<void> {
    const dialog = await resolveVisibleDialog(this.page);

    const themeList = dialog.getByTestId("question-theme-selector-list");
    const themeItem = themeList.locator("[data-testid^='question-theme-selector-assignment-']").filter({ has: this.page.getByText(themeName, { exact: true }) });
    const primaryButton = themeItem.locator("[data-testid^='question-theme-selector-primary-']");

    await expect(primaryButton).toBeVisible();
    await primaryButton.click();
  },
);

When(
  /^the user toggles hint for the theme "(?<themeName>[^"]*)" in the question form theme selector$/u,
  async function(this: GoatItWorld, themeName: string): Promise<void> {
    const dialog = await resolveVisibleDialog(this.page);

    const themeList = dialog.getByTestId("question-theme-selector-list");
    const themeItem = themeList.locator("[data-testid^='question-theme-selector-assignment-']").filter({ has: this.page.getByText(themeName, { exact: true }) });
    const hintSwitch = themeItem.locator("[data-testid^='question-theme-selector-hint-']");

    await expect(hintSwitch).toBeVisible();
    await hintSwitch.click();
  },
);

When(
  /^the user clicks the expand button on the question row with statement "(?<statement>[^"]+)"$/u,
  async function(this: GoatItWorld, statement: string): Promise<void> {
    const table = this.page.getByRole("table");
    const row = table.getByRole("row").filter({ has: this.page.getByText(statement, { exact: true }) });
    const expandButton = row.getByRole("button", { name: `See answer and more info for question "${statement}"` });

    await expect(expandButton).toBeVisible();
    await expandButton.click();
  },
);