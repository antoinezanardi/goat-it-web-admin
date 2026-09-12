import { expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";

async function resolveVisibleDialog(page: Page): Promise<Locator> {
  const dialog = page.getByRole("dialog").first();

  await expect(dialog).toBeVisible();

  return dialog;
}

async function submitDialog(dialog: Locator, buttonLocator: Locator): Promise<void> {
  await expect(buttonLocator).toBeEnabled();
  await buttonLocator.click();
  await expect(dialog).toBeHidden();
}

export { resolveVisibleDialog, submitDialog };