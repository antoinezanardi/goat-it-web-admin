import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { DataTable } from "#acceptance/features/support/types/cucumber.types.ts";

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
  /^the questions (?<filter>status|category|cognitive difficulty|theme) filter should be visible$/u,
  async function(this: GoatItWorld, filter: string): Promise<void> {
    const testId = `questions-table-${filter.replaceAll(" ", "-")}-filter`;
    const filterSelect = this.page.getByTestId(testId);

    await expect(filterSelect).toBeVisible();
  },
);

Then(
  /^the questions (?<filter>status|category|cognitive difficulty|theme) filter should not be visible$/u,
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

Then(
  /^the theme filter dropdown should contain an option with the text "(?<option>[^"]+)"$/u,
  async function(this: GoatItWorld, option: string): Promise<void> {
    const listbox = this.page.getByRole("listbox");

    await expect(listbox).toBeVisible();
    await expect(listbox.getByRole("option", { name: option })).toBeVisible();
  },
);

Then(
  /^the theme filter dropdown should not contain an option with the text "(?<option>[^"]+)"$/u,
  async function(this: GoatItWorld, option: string): Promise<void> {
    const listbox = this.page.getByRole("listbox");

    await expect(listbox).toBeVisible();
    await expect(listbox.getByRole("option", { name: option })).not.toBeVisible();
  },
);

Then(
  /^the user should not be able to select the "(?<theme>[^"]+)" theme filter$/u,
  async function(this: GoatItWorld, theme: string): Promise<void> {
    const filterSelect = this.page.getByTestId("questions-table-theme-filter");

    await expect(filterSelect).toBeVisible();

    const selectButton = filterSelect.getByRole("button");

    await selectButton.click();

    const listbox = this.page.getByRole("listbox");

    await expect(listbox).toBeVisible();
    await expect(listbox.getByRole("option", { name: theme })).toHaveCount(0);
    await this.page.keyboard.press("Escape");
    await expect(listbox).toBeHidden();
  },
);