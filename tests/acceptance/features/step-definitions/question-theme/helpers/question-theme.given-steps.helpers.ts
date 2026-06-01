import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";

import type { QuestionThemeFormRow } from "#acceptance/features/step-definitions/question-theme/datatables/question-theme.datatables.schemas.ts";
import { fillQuestionThemeForm } from "#acceptance/features/step-definitions/question-theme/helpers/question-theme.when-steps.helpers.ts";

async function archiveQuestionThemeViaUi(page: Page, slug: string): Promise<void> {
  const archiveButton = page.getByRole("button", { name: `Archive question theme with slug ${slug}`, exact: true });

  await expect(archiveButton).toBeVisible();
  await archiveButton.click();

  const dialog = page.getByRole("dialog");

  await expect(dialog).toBeVisible();

  const heading = dialog.getByRole("heading", { name: "Archive this theme?", exact: true });

  await expect(heading).toBeVisible();

  const confirmButton = dialog.getByRole("button", { name: "Confirm" });

  await expect(confirmButton).toBeVisible();
  await confirmButton.click();
  await expect(dialog).toBeHidden();
}

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

  if (row.status === "archived") {
    if (row.slug === undefined) {
      throw new Error("Cannot archive a question theme without a slug");
    }
    await archiveQuestionThemeViaUi(page, row.slug);
  }
}

export { archiveQuestionThemeViaUi, createQuestionThemeViaUi };