import { When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { DataTable } from "@cucumber/cucumber";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";
import { validateDataTableAndGetFirstRow } from "#acceptance/features/support/helpers/datatable.helpers.ts";
import { QUESTION_THEME_FORM_ROW_SCHEMA } from "#acceptance/features/step-definitions/question-theme/datatables/question-theme.datatables.schemas.ts";
import { fillQuestionThemeForm } from "#acceptance/features/step-definitions/question-theme/helpers/question-theme.when-steps.helpers.ts";

When(
  /^the user fills the question theme form with the following attributes:$/u,
  async function(this: GoatItWorld, dataTable: DataTable): Promise<void> {
    const row = validateDataTableAndGetFirstRow(dataTable, QUESTION_THEME_FORM_ROW_SCHEMA);
    const dialog = this.page.getByRole("dialog");

    await expect(dialog).toBeVisible();
    await fillQuestionThemeForm(dialog, row);
  },
);