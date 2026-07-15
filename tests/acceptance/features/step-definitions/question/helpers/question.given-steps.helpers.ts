import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";

import type { QuestionFormRow } from "#acceptance/features/step-definitions/question/datatables/question.datatables.schemas.ts";
import { fillQuestionForm } from "#acceptance/features/step-definitions/question/helpers/question.when-steps.helpers.ts";

async function createQuestionViaUi(page: Page, row: QuestionFormRow): Promise<void> {
  const createButton = page.getByRole("button", { name: "Create a new question" });

  await expect(createButton).toBeVisible();
  await createButton.click();

  const dialog = page.getByRole("dialog");

  await expect(dialog).toBeVisible();
  await fillQuestionForm(dialog, row);

  const submitButton = dialog.getByRole("button", { name: "Create" });

  await expect(submitButton).toBeEnabled();
  await submitButton.click();
  await expect(dialog).toBeHidden();

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

  const dialog = page.getByRole("dialog");

  await expect(dialog).toBeVisible();

  const confirmButton = dialog.getByRole("button", { name: "Confirm" });

  await expect(confirmButton).toBeVisible();
  await confirmButton.click();
  await expect(dialog).toBeHidden();
}

export { archiveQuestionViaUi, createQuestionViaUi };