import { expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";

import type { QuestionThemeFormRow } from "#acceptance/features/step-definitions/question-theme/datatables/question-theme.datatables.schemas.ts";

async function fillQuestionThemeForm(page: Page, dialog: Locator, row: QuestionThemeFormRow): Promise<void> {
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
    await page.keyboard.press("Enter");
  }
}

export { fillQuestionThemeForm };