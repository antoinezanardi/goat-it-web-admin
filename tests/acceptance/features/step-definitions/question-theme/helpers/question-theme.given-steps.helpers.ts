import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";

import { clickButtonByName } from "#acceptance/features/support/helpers/button.helpers.ts";
import { resolveVisibleDialog, submitDialog } from "#acceptance/features/support/helpers/dialog.helpers.ts";
import { selectOptionFromListbox } from "#acceptance/features/support/helpers/listbox.helpers.ts";
import type { QuestionThemeFormRow } from "#acceptance/features/step-definitions/question-theme/datatables/question-theme.datatables.schemas.ts";
import { fillQuestionThemeForm, fillQuestionThemeFormByTestId } from "#acceptance/features/step-definitions/question-theme/helpers/question-theme.when-steps.helpers.ts";
import { QUESTION_THEME_TRANSLATION_LOCALES } from "#acceptance/features/step-definitions/question-theme/question-theme.steps.constants.ts";

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

async function addQuestionThemeTranslationViaUi(page: Page, slug: string, localeName: string, suffix: string): Promise<void> {
  await selectOptionFromListbox(page.getByTestId("locale-select"), page, localeName);

  const editButton = page.getByTestId(`edit-button-${slug}`);

  await expect(editButton).toBeVisible();
  await editButton.click();

  const dialog = await resolveVisibleDialog(page);

  await fillQuestionThemeFormByTestId(dialog, {
    label: `Label ${suffix}`,
    slug: undefined,
    color: undefined,
    description: `Description ${suffix}`,
    aliases: `alias-${suffix}`,
  });

  await submitDialog(dialog, dialog.getByTestId("default-modal-footer-primary-button"));
}

async function createFullyTranslatedQuestionThemeViaUi(page: Page, row: QuestionThemeFormRow): Promise<void> {
  await createQuestionThemeViaUi(page, row);

  if (row.slug === undefined) {
    throw new Error("Cannot translate a question theme without a slug");
  }
  const { slug } = row;

  for (const { localeName, suffix } of QUESTION_THEME_TRANSLATION_LOCALES) {
    // Acceptable as each locale must be translated sequentially through the UI
    // oxlint-disable-next-line eslint/no-await-in-loop
    await addQuestionThemeTranslationViaUi(page, slug, localeName, suffix);
  }

  await selectOptionFromListbox(page.getByTestId("locale-select"), page, "English");
}

export { archiveQuestionThemeViaUi, createFullyTranslatedQuestionThemeViaUi, createQuestionThemeViaUi };