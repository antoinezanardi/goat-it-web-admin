import { When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { DataTable } from "@cucumber/cucumber";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";
import { clickButtonByName } from "#acceptance/features/support/helpers/button.helpers.ts";
import { validateDataTableAndGetFirstRow } from "#acceptance/features/support/helpers/datatable.helpers.ts";
import { resolveVisibleDialog, submitDialog } from "#acceptance/features/support/helpers/dialog.helpers.ts";
import { selectOptionFromListbox } from "#acceptance/features/support/helpers/listbox.helpers.ts";
import { QUESTION_THEME_FORM_ROW_SCHEMA } from "#acceptance/features/step-definitions/question-theme/datatables/question-theme.datatables.schemas.ts";
import { fillQuestionThemeForm, fillQuestionThemeFormByTestId } from "#acceptance/features/step-definitions/question-theme/helpers/question-theme.when-steps.helpers.ts";

When(
  /^the user fills the question theme form with the following attributes:$/u,
  async function(this: GoatItWorld, dataTable: DataTable): Promise<void> {
    const row = validateDataTableAndGetFirstRow(dataTable, QUESTION_THEME_FORM_ROW_SCHEMA);
    const dialog = await resolveVisibleDialog(this.page);
    await fillQuestionThemeForm(dialog, row);
  },
);

When(
  /^the user fills and submits the question theme edit form with the following attributes:$/u,
  async function(this: GoatItWorld, dataTable: DataTable): Promise<void> {
    const row = validateDataTableAndGetFirstRow(dataTable, QUESTION_THEME_FORM_ROW_SCHEMA);
    const dialog = await resolveVisibleDialog(this.page);
    await fillQuestionThemeFormByTestId(dialog, row);

    await submitDialog(dialog, dialog.getByTestId("default-modal-footer-primary-button"));
  },
);

When(
  /^the user (?:expands|collapses) the question themes filters$/u,
  async function(this: GoatItWorld): Promise<void> {
    await clickButtonByName(this.page, "Filters");
  },
);

When(
  /^the user filters question themes by status "(?<status>[^"]*)"$/u,
  async function(this: GoatItWorld, status: string): Promise<void> {
    const filterSelect = this.page.getByTestId("question-themes-table-status-filter");

    await expect(filterSelect).toBeVisible();

    await selectOptionFromListbox(filterSelect.getByRole("button"), this.page, status);
  },
);

When(
  /^the user clears the question themes filters$/u,
  async function(this: GoatItWorld): Promise<void> {
    await clickButtonByName(this.page, "Clear all");
  },
);