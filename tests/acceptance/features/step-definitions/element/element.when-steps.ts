import { When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";
import type { LocatorRole } from "#acceptance/features/support/types/playwright.types.ts";
import { ROLE_ALTERNATION_PATTERN } from "#acceptance/features/step-definitions/element/element.steps.constants.ts";
import {
  clickOnRoleWithText,
  hoverOnRoleWithText,
  scrollToRoleWithText,
} from "#acceptance/features/step-definitions/element/helpers/element.when-steps.helpers.ts";

When(
  new RegExp(`^the user clicks on the (?<role>${ROLE_ALTERNATION_PATTERN}) with(?<exact> exact)? name "(?<name>[^"]*)"$`, "u"),
  async function(this: GoatItWorld, role: LocatorRole, exact: string | undefined, name: string): Promise<void> {
    await clickOnRoleWithText(this, role, name, exact !== undefined);
  },
);

When(
  /^the user clicks on the element with testid "(?<testid>[^"]*)"$/u,
  async function(this: GoatItWorld, testid: string): Promise<void> {
    const locator = this.page.getByTestId(testid);

    await expect(locator).toBeVisible();
    await locator.click();
  },
);

When(
  new RegExp(`^the user hovers the (?<role>${ROLE_ALTERNATION_PATTERN}) with(?<exact> exact)? name "(?<name>[^"]*)"$`, "u"),
  async function(this: GoatItWorld, role: LocatorRole, exact: string | undefined, name: string): Promise<void> {
    await hoverOnRoleWithText(this, role, name, exact !== undefined);
  },
);

When(
  new RegExp(`^the user scrolls to the (?<role>${ROLE_ALTERNATION_PATTERN}) with(?<exact> exact)? name "(?<name>[^"]*)"$`, "u"),
  async function(this: GoatItWorld, role: LocatorRole, exact: string | undefined, name: string): Promise<void> {
    await scrollToRoleWithText(this, role, name, exact !== undefined);
  },
);