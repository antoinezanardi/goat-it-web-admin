import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";
import type { LocatorRole } from "#acceptance/features/support/types/playwright.types.ts";
import { ROLE_ALTERNATION_PATTERN } from "#acceptance/features/step-definitions/element/element.steps.constants.ts";

Then(
  new RegExp(`^the (?<role>${ROLE_ALTERNATION_PATTERN}) with(?<exact> exact)? name "(?<name>[^"]*)" should be visible$`, "u"),
  async function(this: GoatItWorld, role: LocatorRole, exact: string | undefined, name: string): Promise<void> {
    const locator = this.page.getByRole(role, { name, exact: exact !== undefined });

    await expect(locator).toBeVisible();
  },
);

Then(
  new RegExp(`^the (?<role>${ROLE_ALTERNATION_PATTERN}) with(?<exact> exact)? name "(?<name>[^"]*)" should be hidden$`, "u"),
  async function(this: GoatItWorld, role: LocatorRole, exact: string | undefined, name: string): Promise<void> {
    const locator = this.page.getByRole(role, { name, exact: exact !== undefined });

    await expect(locator).toBeHidden();
  },
);

Then(
  new RegExp(`^the (?<role>${ROLE_ALTERNATION_PATTERN}) with(?<exact> exact)? name "(?<name>[^"]*)" should be disabled$`, "u"),
  async function(this: GoatItWorld, role: LocatorRole, exact: string | undefined, name: string): Promise<void> {
    const locator = this.page.getByRole(role, { name, exact: exact !== undefined });

    await expect(locator).toBeDisabled();
  },
);

Then(
  new RegExp(`^the (?<role>${ROLE_ALTERNATION_PATTERN}) with(?<exact> exact)? name "(?<name>[^"]*)" should be enabled$`, "u"),
  async function(this: GoatItWorld, role: LocatorRole, exact: string | undefined, name: string): Promise<void> {
    const locator = this.page.getByRole(role, { name, exact: exact !== undefined });

    await expect(locator).toBeEnabled();
  },
);

Then(
  /^the element with testid "(?<testid>[^"]+)" should be visible$/u,
  async function(this: GoatItWorld, testid: string): Promise<void> {
    const locator = this.page.getByTestId(testid);

    await expect(locator).toBeVisible();
  },
);

Then(
  /^the element with testid "(?<testid>[^"]+)" should not be visible$/u,
  async function(this: GoatItWorld, testid: string): Promise<void> {
    const locator = this.page.getByTestId(testid);

    await expect(locator).toBeHidden();
  },
);

Then(
  /^the element with testid "(?<testid>[^"]+)" should contain text "(?<text>[^"]+)"$/u,
  async function(this: GoatItWorld, testid: string, text: string): Promise<void> {
    const locator = this.page.getByTestId(testid);

    await expect(locator).toContainText(text);
  },
);