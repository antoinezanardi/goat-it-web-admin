import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { DataTable } from "@cucumber/cucumber";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";
import { validateDataTableAndGetFirstRow, validateDataTableAndGetRows } from "#acceptance/features/support/helpers/datatable.helpers.ts";
import {
  QUESTION_THEME_FORM_ERROR_ROW_SCHEMA,
  QUESTION_THEME_TABLE_ROW_SCHEMA,
} from "#acceptance/features/step-definitions/question-theme/datatables/question-theme.datatables.schemas.ts";
import { doesTableContainRowMatchingAttributes } from "#acceptance/features/support/helpers/table.helpers.ts";

Then(
  /^the question theme table should contain a row with the following attributes:$/u,
  async function(this: GoatItWorld, dataTable: DataTable): Promise<void> {
    const row = validateDataTableAndGetFirstRow(dataTable, QUESTION_THEME_TABLE_ROW_SCHEMA);
    const table = this.page.getByRole("table");

    await expect(table).toBeVisible();

    await expect(async() => {
      const wasFound = await doesTableContainRowMatchingAttributes(this.page, row);

      expect(wasFound).toBe(true);
    }).toPass();
  },
);

Then(
  /^the question theme table should not contain a row with the following attributes:$/u,
  async function(this: GoatItWorld, dataTable: DataTable): Promise<void> {
    const row = validateDataTableAndGetFirstRow(dataTable, QUESTION_THEME_TABLE_ROW_SCHEMA);
    const table = this.page.getByRole("table");

    await expect(table).toBeVisible();

    await expect(async() => {
      const wasFound = await doesTableContainRowMatchingAttributes(this.page, row);

      expect(wasFound).toBe(false);
    }).toPass();
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
      const errorText = fieldContainer.getByText(row.error, { exact: true });

      await expect(errorText).toBeVisible();
    }
  },
);

Then(
  /^the question themes status filter should be visible$/u,
  async function(this: GoatItWorld): Promise<void> {
    const statusFilter = this.page.getByTestId("question-themes-table-status-filter");

    await expect(statusFilter).toBeVisible();
  },
);

Then(
  /^the question themes status filter should not be visible$/u,
  async function(this: GoatItWorld): Promise<void> {
    const statusFilter = this.page.getByTestId("question-themes-table-status-filter");

    await expect(statusFilter).toBeHidden();
  },
);

Then(
  /^the question themes filters badge should display "(?<count>[^"]*)"$/u,
  async function(this: GoatItWorld, count: string): Promise<void> {
    const badge = this.page.getByTestId("table-filters-section-badge");

    await expect(badge).toBeVisible();
    await expect(badge).toContainText(count);
  },
);