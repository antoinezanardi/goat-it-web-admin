import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { DataTable } from "@cucumber/cucumber";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";
import { validateDataTableAndGetFirstRow, validateDataTableAndGetRows } from "#acceptance/features/support/helpers/datatable.helpers.ts";
import {
  QUESTION_THEME_FORM_ERROR_ROW_SCHEMA,
  QUESTION_THEME_TABLE_ROW_SCHEMA,
} from "#acceptance/features/step-definitions/question-theme/datatables/question-theme.datatables.schemas.ts";
import { findTableRowMatchingAttributes } from "#acceptance/features/step-definitions/question-theme/helpers/question-theme.then-steps.helpers.ts";

Then(
  /^the question theme table should contain a row with the following attributes:$/u,
  async function(this: GoatItWorld, dataTable: DataTable): Promise<void> {
    const row = validateDataTableAndGetFirstRow(dataTable, QUESTION_THEME_TABLE_ROW_SCHEMA);
    const table = this.page.getByRole("table");

    await expect(table).toBeVisible();

    const wasFound = await findTableRowMatchingAttributes(this.page, row);

    expect(wasFound).toBe(true);
  },
);

Then(
  /^the question theme table should not contain a row with the following attributes:$/u,
  async function(this: GoatItWorld, dataTable: DataTable): Promise<void> {
    const row = validateDataTableAndGetFirstRow(dataTable, QUESTION_THEME_TABLE_ROW_SCHEMA);
    const table = this.page.getByRole("table");

    await expect(table).toBeVisible();

    const wasFound = await findTableRowMatchingAttributes(this.page, row);

    expect(wasFound).toBe(false);
  },
);

Then(
  /^the question theme form should display the following errors:$/u,
  async function(this: GoatItWorld, dataTable: DataTable): Promise<void> {
    const rows = validateDataTableAndGetRows(dataTable, QUESTION_THEME_FORM_ERROR_ROW_SCHEMA);
    const dialog = this.page.getByRole("dialog");

    await expect(dialog).toBeVisible();

    for (const row of rows) {
      const fieldContainer = dialog.getByTestId(`question-theme-form-${row.field.toLowerCase()}-field`);
      const errorText = fieldContainer.getByText(row.error);

      // oxlint-disable-next-line eslint/no-await-in-loop -- Playwright assertions require sequential evaluation
      await expect(errorText).toBeVisible();
    }
  },
);