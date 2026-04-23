import { expect } from "@playwright/test";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";
import type { LocatorRole } from "#acceptance/features/support/types/playwright.types.ts";

async function clickOnRoleWithText(world: GoatItWorld, role: LocatorRole, name: string, isExact: boolean): Promise<void> {
  const locator = world.page.getByRole(role, { name, exact: isExact });

  await expect(locator).toBeVisible();
  await locator.click();
}

async function hoverOnRoleWithText(world: GoatItWorld, role: LocatorRole, name: string, isExact: boolean): Promise<void> {
  const locator = world.page.getByRole(role, { name, exact: isExact });

  await expect(locator).toBeVisible();
  await locator.hover();
}

export {
  clickOnRoleWithText,
  hoverOnRoleWithText,
};