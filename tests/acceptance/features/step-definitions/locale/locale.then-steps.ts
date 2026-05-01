import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";

Then(
  /^the locale "(?<locale>[^"]+)" should be marked as complete in the translation status$/u,
  async function(this: GoatItWorld, locale: string): Promise<void> {
    const badge = this.page.getByTestId(`locale-status-${locale}`);

    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(/text-success/u);
  },
);

Then(
  /^the locale "(?<locale>[^"]+)" should be marked as incomplete in the translation status$/u,
  async function(this: GoatItWorld, locale: string): Promise<void> {
    const badge = this.page.getByTestId(`locale-status-${locale}`);

    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(/text-error/u);
  },
);