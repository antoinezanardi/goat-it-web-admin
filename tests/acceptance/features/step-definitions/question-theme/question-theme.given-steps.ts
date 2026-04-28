import { Given } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { DataTable } from "@cucumber/cucumber";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";
import { validateDataTableAndGetFirstRow } from "#acceptance/features/support/helpers/datatable.helpers.ts";
import { QUESTION_THEME_FORM_ROW_SCHEMA } from "#acceptance/features/step-definitions/question-theme/datatables/question-theme.datatables.schemas.ts";
import { fillQuestionThemeForm } from "#acceptance/features/step-definitions/question-theme/helpers/question-theme.when-steps.helpers.ts";

Given(
  /^a question theme exists with the following attributes:$/u,
  async function(this: GoatItWorld, dataTable: DataTable): Promise<void> {
    const row = validateDataTableAndGetFirstRow(dataTable, QUESTION_THEME_FORM_ROW_SCHEMA);
    const createButton = this.page.getByRole("button", { name: "Create a new theme" });

    await expect(createButton).toBeVisible();
    await createButton.click();

    const dialog = this.page.getByRole("dialog");

    await expect(dialog).toBeVisible();
    await fillQuestionThemeForm(this.page, dialog, row);

    const submitButton = dialog.getByRole("button", { name: "Create" });

    await expect(submitButton).toBeEnabled();
    await submitButton.click();
    await expect(dialog).toBeHidden();
  },
);