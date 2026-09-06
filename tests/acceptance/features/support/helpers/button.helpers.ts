import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";

async function clickButtonByName(page: Page, name: string): Promise<void> {
  const button = page.getByRole("button", { name });

  await expect(button).toBeVisible();
  await button.click();
}

export { clickButtonByName };