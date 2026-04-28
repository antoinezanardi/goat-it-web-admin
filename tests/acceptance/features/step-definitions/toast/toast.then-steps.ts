import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";

Then(
  /^the(?<exact> exact)? toast with text "(?<text>[^"]*)" should be visible$/u,
  async function(this: GoatItWorld, exact: string | undefined, text: string): Promise<void> {
    const toast = this.page.getByText(text, { exact: exact !== undefined });

    await expect(toast).toBeVisible();
  },
);