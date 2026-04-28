import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";

import type { QuestionThemeFormRow } from "#acceptance/features/step-definitions/question-theme/datatables/question-theme.datatables.schemas.ts";
import { fillQuestionThemeForm } from "#acceptance/features/step-definitions/question-theme/helpers/question-theme.when-steps.helpers.ts";

/**
 * Creates a single question theme through the UI by opening the creation dialog,
 * filling the form, and submitting it. Waits for the dialog to close before returning.
 * Only used in acceptance tests.
 *
 * @param page - The Playwright page instance.
 * @param row - The question theme attributes to fill in the form.
 */
async function createQuestionThemeViaUi(page: Page, row: QuestionThemeFormRow): Promise<void> {
  const createButton = page.getByRole("button", { name: "Create a new theme" });

  await expect(createButton).toBeVisible();
  await createButton.click();

  const dialog = page.getByRole("dialog");

  await expect(dialog).toBeVisible();
  await fillQuestionThemeForm(dialog, row);

  const submitButton = dialog.getByRole("button", { name: "Create" });

  await expect(submitButton).toBeEnabled();
  await submitButton.click();
  await expect(dialog).toBeHidden();
}

export { createQuestionThemeViaUi };