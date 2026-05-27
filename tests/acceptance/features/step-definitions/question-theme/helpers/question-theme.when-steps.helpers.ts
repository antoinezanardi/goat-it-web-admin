import { expect } from "@playwright/test";
import type { Locator } from "@playwright/test";

import type { QuestionThemeFormRow } from "#acceptance/features/step-definitions/question-theme/datatables/question-theme.datatables.schemas.ts";

async function fillQuestionThemeForm(dialog: Locator, row: QuestionThemeFormRow): Promise<void> {
  if (row.label !== undefined) {
    await dialog.getByRole("textbox", { name: "Label*" }).fill(row.label);
  }
  if (row.slug !== undefined) {
    await dialog.getByRole("textbox", { name: "Slug*" }).fill(row.slug);
  }
  if (row.color !== undefined) {
    await dialog.getByRole("textbox", { name: "Color" }).fill(row.color);
  }
  if (row.description !== undefined) {
    await dialog.getByRole("textbox", { name: "Description*" }).fill(row.description);
  }
  if (row.aliases !== undefined) {
    const aliasesInput = dialog.getByRole("textbox", { name: "Aliases*" });

    await expect(aliasesInput).toBeVisible();
    await aliasesInput.fill(row.aliases);
    await aliasesInput.press("Enter");
  }
}

async function fillQuestionThemeFormByTestId(dialog: Locator, row: QuestionThemeFormRow): Promise<void> {
  if (row.label !== undefined) {
    await dialog.getByTestId("question-theme-form-label-field").getByRole("textbox").fill(row.label);
  }
  if (row.slug !== undefined) {
    await dialog.getByTestId("question-theme-form-slug-field").getByRole("textbox").fill(row.slug);
  }
  if (row.color !== undefined) {
    await dialog.getByTestId("question-theme-form-color-field").getByRole("textbox").fill(row.color);
  }
  if (row.description !== undefined) {
    await dialog.getByTestId("question-theme-form-description-field").getByRole("textbox").fill(row.description);
  }
  if (row.aliases !== undefined) {
    const aliasesInput = dialog.getByTestId("question-theme-form-aliases-field").getByRole("textbox");

    await expect(aliasesInput).toBeVisible();
    await aliasesInput.fill(row.aliases);
    await aliasesInput.press("Enter");
  }
}

export { fillQuestionThemeForm, fillQuestionThemeFormByTestId };