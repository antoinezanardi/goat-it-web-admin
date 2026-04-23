import { When } from "@cucumber/cucumber";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";
import type { LocatorRole } from "#acceptance/features/support/types/playwright.types.ts";
import {
  clickOnRoleWithText,
  hoverOnRoleWithText,
} from "#acceptance/features/step-definitions/element/helpers/element.when-steps.helpers.ts";

const ROLE_REGEX = "button|img|heading|navigation|link|region|paragraph|tab|alertdialog|dialog|progressbar";

When(
  new RegExp(`^the user clicks on the (?<role>${ROLE_REGEX}) with(?<exact> exact)? name "(?<name>[^"]*)"$`, "u"),
  async function(this: GoatItWorld, role: string, exact: string | undefined, name: string): Promise<void> {
    await clickOnRoleWithText(this, role as LocatorRole, name, exact !== undefined);
  },
);

When(
  new RegExp(`^the user hovers the (?<role>${ROLE_REGEX}) with(?<exact> exact)? name "(?<name>[^"]*)"$`, "u"),
  async function(this: GoatItWorld, role: string, exact: string | undefined, name: string): Promise<void> {
    await hoverOnRoleWithText(this, role as LocatorRole, name, exact !== undefined);
  },
);

When(
  new RegExp(`^the user scrolls to the (?<role>${ROLE_REGEX}) with(?<exact> exact)? name "(?<name>[^"]*)"$`, "u"),
  async function(this: GoatItWorld, role: string, exact: string | undefined, name: string): Promise<void> {
    const locator = this.page.getByRole(role as LocatorRole, { name, exact: exact !== undefined });

    await locator.scrollIntoViewIfNeeded();
  },
);