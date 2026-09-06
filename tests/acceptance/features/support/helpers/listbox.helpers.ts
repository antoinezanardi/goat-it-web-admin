import { expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";

async function selectOptionFromListbox(trigger: Locator, page: Page, optionName: string): Promise<void> {
  await trigger.click();

  const listbox = page.getByRole("listbox");

  await expect(listbox).toBeVisible();
  await listbox.getByRole("option", { name: optionName }).click();
  await expect(listbox).toBeHidden();
}

export { selectOptionFromListbox };