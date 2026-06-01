import { When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { DataTable } from "@cucumber/cucumber";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";
import { validateDataTableAndGetFirstRow } from "#acceptance/features/support/helpers/datatable.helpers.ts";
import { QUESTION_THEME_FORM_ROW_SCHEMA } from "#acceptance/features/step-definitions/question-theme/datatables/question-theme.datatables.schemas.ts";
import { fillQuestionThemeForm, fillQuestionThemeFormByTestId } from "#acceptance/features/step-definitions/question-theme/helpers/question-theme.when-steps.helpers.ts";

When(
  /^the user fills the question theme form with the following attributes:$/u,
  async function(this: GoatItWorld, dataTable: DataTable): Promise<void> {
    const row = validateDataTableAndGetFirstRow(dataTable, QUESTION_THEME_FORM_ROW_SCHEMA);
    const dialog = this.page.getByRole("dialog");

    await expect(dialog).toBeVisible();
    await fillQuestionThemeForm(dialog, row);
  },
);

When(
  /^the user fills and submits the question theme edit form with the following attributes:$/u,
  async function(this: GoatItWorld, dataTable: DataTable): Promise<void> {
    const row = validateDataTableAndGetFirstRow(dataTable, QUESTION_THEME_FORM_ROW_SCHEMA);
    const dialog = this.page.getByRole("dialog").first();

    await expect(dialog).toBeVisible();
    await fillQuestionThemeFormByTestId(dialog, row);

    const submitButton = dialog.getByTestId("default-modal-footer-primary-button");

    await expect(submitButton).toBeEnabled();
    await submitButton.click();
    await expect(dialog).toBeHidden();
  },
);

When(
  /^the user expands|collapses the question themes filters$/u,
  async function(this: GoatItWorld): Promise<void> {
    const toggleButton = this.page.getByRole("button", { name: "Filters" });

    await expect(toggleButton).toBeVisible();
    await toggleButton.click();
  },
);

When(
  /^the user filters question themes by status "(?<status>[^"]*)"$/u,
  async function(this: GoatItWorld, status: string): Promise<void> {
    const filterSelect = this.page.getByTestId("question-themes-table-status-filter");

    await expect(filterSelect).toBeVisible();

    const selectButton = filterSelect.getByRole("button");

    await selectButton.click();

    const listbox = this.page.getByRole("listbox");

    await expect(listbox).toBeVisible();
    await listbox.getByRole("option", { name: status }).click();
  },
);

When(
  /^the user clears the question themes filters$/u,
  async function(this: GoatItWorld): Promise<void> {
    const clearButton = this.page.getByRole("button", { name: "Clear all" });

    await expect(clearButton).toBeVisible();
    await clearButton.click();
  },
);