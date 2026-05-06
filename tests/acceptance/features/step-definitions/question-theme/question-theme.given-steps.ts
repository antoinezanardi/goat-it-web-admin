import { Given } from "@cucumber/cucumber";
import type { DataTable } from "@cucumber/cucumber";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";
import { validateDataTableAndGetFirstRow, validateDataTableAndGetRows } from "#acceptance/features/support/helpers/datatable.helpers.ts";
import { QUESTION_THEME_FORM_ROW_SCHEMA } from "#acceptance/features/step-definitions/question-theme/datatables/question-theme.datatables.schemas.ts";
import { createQuestionThemeViaUi } from "#acceptance/features/step-definitions/question-theme/helpers/question-theme.given-steps.helpers.ts";

Given(
  /^a question theme exists with the following attributes:$/u,
  async function(this: GoatItWorld, dataTable: DataTable): Promise<void> {
    const row = validateDataTableAndGetFirstRow(dataTable, QUESTION_THEME_FORM_ROW_SCHEMA);

    await createQuestionThemeViaUi(this.page, row);
  },
);

Given(
  /^multiple question themes exist with the following attributes:$/u,
  async function(this: GoatItWorld, dataTable: DataTable): Promise<void> {
    const rows = validateDataTableAndGetRows(dataTable, QUESTION_THEME_FORM_ROW_SCHEMA);

    for (const row of rows) {
      await createQuestionThemeViaUi(this.page, row);
    }
  },
);