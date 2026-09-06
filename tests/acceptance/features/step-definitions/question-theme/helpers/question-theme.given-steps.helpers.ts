import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";

import { clickButtonByName } from "#acceptance/features/support/helpers/button.helpers.ts";
import { resolveVisibleDialog, submitDialog } from "#acceptance/features/support/helpers/dialog.helpers.ts";
import type { QuestionThemeFormRow } from "#acceptance/features/step-definitions/question-theme/datatables/question-theme.datatables.schemas.ts";
import { fillQuestionThemeForm } from "#acceptance/features/step-definitions/question-theme/helpers/question-theme.when-steps.helpers.ts";

async function archiveQuestionThemeViaUi(page: Page, slug: string): Promise<void> {
  const archiveButton = page.getByRole("button", { name: `Archive question theme with slug ${slug}`, exact: true });

  await expect(archiveButton).toBeVisible();
  await archiveButton.click();

  const dialog = await resolveVisibleDialog(page);

  const heading = dialog.getByRole("heading", { name: "Archive this theme?", exact: true });

  await expect(heading).toBeVisible();

  const confirmButton = dialog.getByRole("button", { name: "Confirm" });

  await expect(confirmButton).toBeVisible();
  await confirmButton.click();
  await expect(dialog).toBeHidden();
}

async function createQuestionThemeViaUi(page: Page, row: QuestionThemeFormRow): Promise<void> {
  await clickButtonByName(page, "Create a new theme");

  const dialog = await resolveVisibleDialog(page);
  await fillQuestionThemeForm(dialog, row);

  await submitDialog(dialog, dialog.getByRole("button", { name: "Create" }));

  if (row.status === "archived") {
    if (row.slug === undefined) {
      throw new Error("Cannot archive a question theme without a slug");
    }
    await archiveQuestionThemeViaUi(page, row.slug);
  }
}

export { archiveQuestionThemeViaUi, createQuestionThemeViaUi };