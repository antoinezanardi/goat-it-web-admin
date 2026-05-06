import { expect } from "@playwright/test";
import type { Locator } from "@playwright/test";

import type { QuestionFormRow } from "#acceptance/features/step-definitions/question/datatables/question.datatables.schemas.ts";

async function fillCategory(dialog: Locator, category: string): Promise<void> {
  const categorySelect = dialog.getByRole("combobox");

  await expect(categorySelect).toBeVisible();
  await categorySelect.click();

  const option = dialog.getByRole("option", { name: category });

  await expect(option).toBeVisible();
  await option.click();
}

async function fillThemes(dialog: Locator, themes: string): Promise<void> {
  const themeNames = themes.split(",").map(name => name.trim());

  for (const themeName of themeNames) {
    const themeSelect = dialog.getByTestId("question-theme-selector-select");

    // Acceptable as each theme must be selected sequentially through the UI
    // oxlint-disable-next-line eslint/no-await-in-loop
    await expect(themeSelect).toBeVisible();
    // Acceptable as each theme must be selected sequentially through the UI
    // oxlint-disable-next-line eslint/no-await-in-loop
    await themeSelect.click();

    const option = dialog.getByRole("option", { name: themeName });

    // Acceptable as each theme must be selected sequentially through the UI
    // oxlint-disable-next-line eslint/no-await-in-loop
    await expect(option).toBeVisible();
    // Acceptable as each theme must be selected sequentially through the UI
    // oxlint-disable-next-line eslint/no-await-in-loop
    await option.click();
  }
}

async function fillQuestionForm(dialog: Locator, row: QuestionFormRow): Promise<void> {
  if (row.statement !== undefined) {
    await dialog.getByRole("textbox", { name: "Statement*" }).fill(row.statement);
  }
  if (row.answer !== undefined) {
    await dialog.getByRole("textbox", { name: "Answer*" }).fill(row.answer);
  }
  if (row.context !== undefined) {
    await dialog.getByRole("textbox", { name: "Context" }).fill(row.context);
  }
  if (row.difficulty !== undefined) {
    const difficultyButton = dialog.getByRole("radio", { name: row.difficulty });

    await expect(difficultyButton).toBeVisible();
    await difficultyButton.click();
  }
  if (row.category !== undefined) {
    await fillCategory(dialog, row.category);
  }
  if (row.themes !== undefined) {
    await fillThemes(dialog, row.themes);
  }
  if (row.sourceUrls !== undefined) {
    const sourceInput = dialog.getByRole("textbox", { name: "Sources*" });

    await expect(sourceInput).toBeVisible();
    await sourceInput.fill(row.sourceUrls);
    await sourceInput.press("Enter");
  }
}

export { fillQuestionForm };