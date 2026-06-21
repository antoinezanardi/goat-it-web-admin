import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { DataTable } from "@cucumber/cucumber";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";
import { validateDataTableAndGetFirstRow } from "#acceptance/features/support/helpers/datatable.helpers.ts";
import { doesTableContainRowMatchingAttributes } from "#acceptance/features/support/helpers/table.helpers.ts";
import { QUESTION_TABLE_ROW_SCHEMA } from "#acceptance/features/step-definitions/question/datatables/question.datatables.schemas.ts";

Then(
  /^the questions table should contain a row with the following attributes:$/u,
  async function(this: GoatItWorld, dataTable: DataTable): Promise<void> {
    const row = validateDataTableAndGetFirstRow(dataTable, QUESTION_TABLE_ROW_SCHEMA);
    const table = this.page.getByRole("table");

    await expect(table).toBeVisible();

    await expect(async() => {
      const wasFound = await doesTableContainRowMatchingAttributes(this.page, row);

      expect(wasFound).toBe(true);
    }).toPass();
  },
);

Then(
  /^the questions table should not contain a row with the following attributes:$/u,
  async function(this: GoatItWorld, dataTable: DataTable): Promise<void> {
    const row = validateDataTableAndGetFirstRow(dataTable, QUESTION_TABLE_ROW_SCHEMA);
    const table = this.page.getByRole("table");

    await expect(table).toBeVisible();

    await expect(async() => {
      const wasFound = await doesTableContainRowMatchingAttributes(this.page, row);

      expect(wasFound).toBe(false);
    }).toPass();
  },
);

Then(
  /^the questions (?<filter>status|category|cognitive difficulty) filter should be visible$/u,
  async function(this: GoatItWorld, filter: string): Promise<void> {
    const testId = `questions-table-${filter.replaceAll(" ", "-")}-filter`;
    const filterSelect = this.page.getByTestId(testId);

    await expect(filterSelect).toBeVisible();
  },
);

Then(
  /^the questions (?<filter>status|category|cognitive difficulty) filter should not be visible$/u,
  async function(this: GoatItWorld, filter: string): Promise<void> {
    const testId = `questions-table-${filter.replaceAll(" ", "-")}-filter`;
    const filterSelect = this.page.getByTestId(testId);

    await expect(filterSelect).toBeHidden();
  },
);

Then(
  /^the questions filters badge should display "(?<count>[^"]+)"$/u,
  async function(this: GoatItWorld, count: string): Promise<void> {
    const badge = this.page.getByTestId("table-filters-section-badge");

    await expect(badge).toBeVisible();
    await expect(badge).toContainText(count);
  },
);

Then(
  /^the questions empty state should indicate active filters$/u,
  async function(this: GoatItWorld): Promise<void> {
    const emptyState = this.page.getByTestId("questions-table-empty-state");

    await expect(emptyState).toBeVisible();
    await expect(emptyState).toContainText("No results found");
  },
);