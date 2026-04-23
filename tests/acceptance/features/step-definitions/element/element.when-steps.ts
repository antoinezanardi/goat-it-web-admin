import { When } from "@cucumber/cucumber";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";
import { ROLE_REGEX } from "#acceptance/features/step-definitions/element/element.steps.constants.ts";
import { assertIsLocatorRole } from "#acceptance/features/step-definitions/element/helpers/element.steps.helpers.ts";
import {
  clickOnRoleWithText,
  hoverOnRoleWithText,
} from "#acceptance/features/step-definitions/element/helpers/element.when-steps.helpers.ts";

When(
  new RegExp(`^the user clicks on the (?<role>${ROLE_REGEX}) with(?<exact> exact)? name "(?<name>[^"]*)"$`, "u"),
  async function(this: GoatItWorld, role: string, exact: string | undefined, name: string): Promise<void> {
    assertIsLocatorRole(role);
    await clickOnRoleWithText(this, role, name, exact !== undefined);
  },
);

When(
  new RegExp(`^the user hovers the (?<role>${ROLE_REGEX}) with(?<exact> exact)? name "(?<name>[^"]*)"$`, "u"),
  async function(this: GoatItWorld, role: string, exact: string | undefined, name: string): Promise<void> {
    assertIsLocatorRole(role);
    await hoverOnRoleWithText(this, role, name, exact !== undefined);
  },
);

When(
  new RegExp(`^the user scrolls to the (?<role>${ROLE_REGEX}) with(?<exact> exact)? name "(?<name>[^"]*)"$`, "u"),
  async function(this: GoatItWorld, role: string, exact: string | undefined, name: string): Promise<void> {
    assertIsLocatorRole(role);
    const locator = this.page.getByRole(role, { name, exact: exact !== undefined });

    await locator.scrollIntoViewIfNeeded();
  },
);