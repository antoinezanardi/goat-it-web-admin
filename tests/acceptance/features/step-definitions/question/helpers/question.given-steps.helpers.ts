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

  const successToast = page.getByText("Question created successfully", { exact: true });

  await expect(successToast).toBeVisible();
}

export { createQuestionViaUi };