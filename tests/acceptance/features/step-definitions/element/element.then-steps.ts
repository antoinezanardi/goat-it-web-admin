import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";
import type { LocatorRole } from "#acceptance/features/support/types/playwright.types.ts";

const ROLE_REGEX = "button|img|heading|navigation|link|region|paragraph|tab|alertdialog|dialog|progressbar";

Then(
  new RegExp(`^the (?<role>${ROLE_REGEX}) with(?<exact> exact)? name "(?<name>[^"]*)" should be visible$`, "u"),
  async function(this: GoatItWorld, role: string, exact: string | undefined, name: string): Promise<void> {
    const locator = this.page.getByRole(role as LocatorRole, { name, exact: exact !== undefined });

    await expect(locator).toBeVisible();
  },
);

Then(
  new RegExp(`^the (?<role>${ROLE_REGEX}) with(?<exact> exact)? name "(?<name>[^"]*)" should be hidden$`, "u"),
  async function(this: GoatItWorld, role: string, exact: string | undefined, name: string): Promise<void> {
    const locator = this.page.getByRole(role as LocatorRole, { name, exact: exact !== undefined });

    await expect(locator).toBeHidden();
  },
);

Then(
  new RegExp(`^the (?<role>${ROLE_REGEX}) with(?<exact> exact)? name "(?<name>[^"]*)" should be disabled$`, "u"),
  async function(this: GoatItWorld, role: string, exact: string | undefined, name: string): Promise<void> {
    const locator = this.page.getByRole(role as LocatorRole, { name, exact: exact !== undefined });

    await expect(locator).toBeDisabled();
  },
);

Then(
  new RegExp(`^the (?<role>${ROLE_REGEX}) with(?<exact> exact)? name "(?<name>[^"]*)" should be enabled$`, "u"),
  async function(this: GoatItWorld, role: string, exact: string | undefined, name: string): Promise<void> {
    const locator = this.page.getByRole(role as LocatorRole, { name, exact: exact !== undefined });

    await expect(locator).toBeEnabled();
  },
);