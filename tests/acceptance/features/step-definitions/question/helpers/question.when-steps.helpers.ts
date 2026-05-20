import { expect } from "@playwright/test";
import type { Locator } from "@playwright/test";

import type { QuestionFormRow } from "#acceptance/features/step-definitions/question/datatables/question.datatables.schemas.ts";

async function fillCategory(dialog: Locator, category: string): Promise<void> {
  const categorySelect = dialog.getByTestId("question-category-selector");

  await expect(categorySelect).toBeVisible();
  await categorySelect.click();

  const listbox = dialog.page().getByRole("listbox");

  await expect(listbox).toBeVisible();

  const option = listbox.getByRole("option", { name: category });

  await expect(option).toBeVisible();
  await option.click();
}

async function fillThemes(dialog: Locator, themes: string): Promise<void> {
  const themeNames = themes.split(",").map(name => name.trim());

  for (const themeName of themeNames) {
    const themeSelect = dialog.getByTestId("question-theme-selector-select");

    await expect(themeSelect).toBeVisible();
    await themeSelect.click();

    const listbox = dialog.page().getByRole("listbox");

    await expect(listbox).toBeVisible();

    const option = listbox.getByRole("option", { name: themeName });

    await expect(option).toBeVisible();
    await option.click();
    await expect(listbox).toBeHidden();
  }
}

async function fillTrivia(dialog: Locator, trivia: string): Promise<void> {
  const triviaInput = dialog.getByRole("textbox", { name: "Trivia" });

  await expect(triviaInput).toBeVisible();

  const facts = trivia.split(",").map(fact => fact.trim()).filter(fact => fact.length > 0);

  for (const fact of facts) {
    await triviaInput.fill(fact);
    await triviaInput.press("Enter");
  }
}

async function fillSourceUrls(dialog: Locator, sourceUrls: string): Promise<void> {
  const sourceInput = dialog.getByRole("textbox", { name: "Sources*" });

  await expect(sourceInput).toBeVisible();

  const urls = sourceUrls.split(",").map(url => url.trim()).filter(url => url.length > 0);

  for (const url of urls) {
    await sourceInput.fill(url);
    await sourceInput.press("Enter");
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
  if (row.trivia !== undefined) {
    await fillTrivia(dialog, row.trivia);
  }
  if (row.difficulty !== undefined) {
    const difficultyButton = dialog.getByTestId(`question-difficulty-selector-${row.difficulty}`);

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
    await fillSourceUrls(dialog, row.sourceUrls);
  }
}

export { fillQuestionForm };