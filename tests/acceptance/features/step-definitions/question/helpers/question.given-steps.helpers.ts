import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";

import { clickButtonByName } from "#acceptance/features/support/helpers/button.helpers.ts";
import { resolveVisibleDialog, submitDialog } from "#acceptance/features/support/helpers/dialog.helpers.ts";
import type { QuestionFormRow } from "#acceptance/features/step-definitions/question/datatables/question.datatables.schemas.ts";
import { fillQuestionForm } from "#acceptance/features/step-definitions/question/helpers/question.when-steps.helpers.ts";

async function createQuestionViaUi(page: Page, row: QuestionFormRow): Promise<void> {
  await clickButtonByName(page, "Create a new question");

  const dialog = await resolveVisibleDialog(page);
  await fillQuestionForm(dialog, row);

  await submitDialog(dialog, dialog.getByRole("button", { name: "Create" }));

  if (row.status === "archived") {
    if (row.statement === undefined) {
      throw new Error("Cannot archive a question without a statement");
    }
    await archiveQuestionViaUi(page, row.statement);
  }
}

async function archiveQuestionViaUi(page: Page, statement: string): Promise<void> {
  const table = page.getByRole("table");
  const row = table.getByRole("row").filter({ has: page.getByText(statement, { exact: true }) });
  const archiveButton = row.getByRole("button", { name: "Archive the question" });

  await expect(archiveButton).toBeVisible();
  await archiveButton.click();

  const dialog = await resolveVisibleDialog(page);

  const confirmButton = dialog.getByRole("button", { name: "Confirm" });

  await expect(confirmButton).toBeVisible();
  await confirmButton.click();
  await expect(dialog).toBeHidden();
}

export { archiveQuestionViaUi, createQuestionViaUi };