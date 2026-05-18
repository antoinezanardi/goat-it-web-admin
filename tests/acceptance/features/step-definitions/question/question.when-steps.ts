import { When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { DataTable } from "@cucumber/cucumber";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";
import { validateDataTableAndGetFirstRow } from "#acceptance/features/support/helpers/datatable.helpers.ts";
import { QUESTION_FORM_ROW_SCHEMA } from "#acceptance/features/step-definitions/question/datatables/question.datatables.schemas.ts";
import { fillQuestionForm } from "#acceptance/features/step-definitions/question/helpers/question.when-steps.helpers.ts";

When(
  /^the user fills the question form with the following attributes:$/u,
  async function(this: GoatItWorld, dataTable: DataTable): Promise<void> {
    const row = validateDataTableAndGetFirstRow(dataTable, QUESTION_FORM_ROW_SCHEMA);
    const dialog = this.page.getByRole("dialog");

    await expect(dialog).toBeVisible();
    await fillQuestionForm(dialog, row);
  },
);

When(
  /^the user removes the theme "(?<themeName>[^"]*)" from the selected themes$/u,
  async function(this: GoatItWorld, themeName: string): Promise<void> {
    const dialog = this.page.getByRole("dialog");

    await expect(dialog).toBeVisible();

    const themeList = dialog.getByTestId("question-theme-selector-list");
    const themeItem = themeList.locator("div").filter({ hasText: themeName }).first();
    const removeButton = themeItem.getByRole("button").last();

    await expect(removeButton).toBeVisible();
    await removeButton.click();
  },
);

When(
  /^the user types "(?<text>[^"]*)" in the source urls input and presses Enter$/u,
  async function(this: GoatItWorld, text: string): Promise<void> {
    const dialog = this.page.getByRole("dialog");

    await expect(dialog).toBeVisible();

    const sourceInput = dialog.getByRole("textbox", { name: "Sources*" });

    await expect(sourceInput).toBeVisible();
    await sourceInput.fill(text);
    await sourceInput.press("Enter");
  },
);