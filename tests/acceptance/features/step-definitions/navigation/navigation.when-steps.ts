import { When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";

When(
  /^the user clicks on the navigation link with name "(?<name>[^"]*)"$/u,
  async function(this: GoatItWorld, name: string): Promise<void> {
    const link = this.page.getByRole("link", { name, exact: true });
    await expect(link).toBeVisible();
    await link.click();
  },
);

When(
  /^the user navigates back$/u,
  async function(this: GoatItWorld): Promise<void> {
    await this.page.goBack();
  },
);