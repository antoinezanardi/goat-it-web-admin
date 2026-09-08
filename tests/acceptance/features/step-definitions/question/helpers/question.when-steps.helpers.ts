import { expect } from "@playwright/test";
import type { Locator } from "@playwright/test";

import { getQuestionApplicableLocalesSelect } from "#acceptance/features/support/helpers/question.helpers.ts";
import type { QuestionFormRow } from "#acceptance/features/step-definitions/question/datatables/question.datatables.schemas.ts";

async function fillCategory(dialog: Locator, category: string): Promise<void> {
  const categorySelect = dialog.getByTestId("question-category-selector-input");

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

async function fillApplicableLocales(dialog: Locator, locales: string): Promise<void> {
  const localeNames = locales.split(",").map(name => name.trim()).filter(name => name.length > 0);

  if (localeNames.length === 0) {
    return;
  }

  const select = getQuestionApplicableLocalesSelect(dialog);

  await expect(select).toBeVisible();
  await select.click();

  const listbox = dialog.page().getByRole("listbox");

  await expect(listbox).toBeVisible();

  // Acceptable as Playwright interactions must be sequential and the listbox DOM changes after each selection
  // oxlint-disable-next-line eslint/no-await-in-loop
  for (const [index, localeName] of localeNames.entries()) {
    const option = listbox.getByRole("option", { name: localeName, exact: true });

    await expect(option).toBeVisible();
    await option.click();

    if (index < localeNames.length - 1) {
      await expect(listbox).toBeVisible();
    }
  }

  await select.press("Escape");
  await expect(listbox).toBeHidden();
}

// Acceptable as filling all question form fields requires sequential if-blocks that naturally exceed the line limit
// oxlint-disable-next-line eslint/max-lines-per-function
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
  if (row.applicableLocales !== undefined) {
    await fillApplicableLocales(dialog, row.applicableLocales);
  }
}

export { fillQuestionForm };