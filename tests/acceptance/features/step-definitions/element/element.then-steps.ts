import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";
import { ROLE_REGEX } from "#acceptance/features/step-definitions/element/element.steps.constants.ts";
import { assertIsLocatorRole } from "#acceptance/features/step-definitions/element/helpers/element.steps.helpers.ts";

Then(
  new RegExp(`^the (?<role>${ROLE_REGEX}) with(?<exact> exact)? name "(?<name>[^"]*)" should be visible$`, "u"),
  async function(this: GoatItWorld, role: string, exact: string | undefined, name: string): Promise<void> {
    assertIsLocatorRole(role);
    const locator = this.page.getByRole(role, { name, exact: exact !== undefined });

    await expect(locator).toBeVisible();
  },
);

Then(
  new RegExp(`^the (?<role>${ROLE_REGEX}) with(?<exact> exact)? name "(?<name>[^"]*)" should be hidden$`, "u"),
  async function(this: GoatItWorld, role: string, exact: string | undefined, name: string): Promise<void> {
    assertIsLocatorRole(role);
    const locator = this.page.getByRole(role, { name, exact: exact !== undefined });

    await expect(locator).toBeHidden();
  },
);

Then(
  new RegExp(`^the (?<role>${ROLE_REGEX}) with(?<exact> exact)? name "(?<name>[^"]*)" should be disabled$`, "u"),
  async function(this: GoatItWorld, role: string, exact: string | undefined, name: string): Promise<void> {
    assertIsLocatorRole(role);
    const locator = this.page.getByRole(role, { name, exact: exact !== undefined });

    await expect(locator).toBeDisabled();
  },
);

Then(
  new RegExp(`^the (?<role>${ROLE_REGEX}) with(?<exact> exact)? name "(?<name>[^"]*)" should be enabled$`, "u"),
  async function(this: GoatItWorld, role: string, exact: string | undefined, name: string): Promise<void> {
    assertIsLocatorRole(role);
    const locator = this.page.getByRole(role, { name, exact: exact !== undefined });

    await expect(locator).toBeEnabled();
  },
);