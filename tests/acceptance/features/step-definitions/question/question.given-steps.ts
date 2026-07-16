import { Given } from "@cucumber/cucumber";
import type { DataTable } from "@cucumber/cucumber";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";
import { validateDataTableAndGetFirstRow, validateDataTableAndGetRows } from "#acceptance/features/support/helpers/datatable.helpers.ts";
import { QUESTION_FORM_ROW_SCHEMA } from "#acceptance/features/step-definitions/question/datatables/question.datatables.schemas.ts";
import { createQuestionViaUi } from "#acceptance/features/step-definitions/question/helpers/question.given-steps.helpers.ts";

Given(
  /^a question exists with the following attributes:$/u,
  async function(this: GoatItWorld, dataTable: DataTable): Promise<void> {
    const row = validateDataTableAndGetFirstRow(dataTable, QUESTION_FORM_ROW_SCHEMA);

    await createQuestionViaUi(this.page, row);
  },
);

Given(
  /^multiple questions exist with the following attributes:$/u,
  { timeout: 30_000 },
  async function(this: GoatItWorld, dataTable: DataTable): Promise<void> {
    const rows = validateDataTableAndGetRows(dataTable, QUESTION_FORM_ROW_SCHEMA);

    for (const row of rows) {
      await createQuestionViaUi(this.page, row);
    }
  },
);