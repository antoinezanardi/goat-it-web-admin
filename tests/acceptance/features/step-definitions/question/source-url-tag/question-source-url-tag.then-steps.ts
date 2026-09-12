import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";
import { resolveVisibleDialog } from "#acceptance/features/support/helpers/dialog.helpers.ts";

Then(
  /^the source URL tag with domain "(?<domain>[^"]*)" should be visible in the question form$/u,
  async function(this: GoatItWorld, domain: string): Promise<void> {
    const dialog = await resolveVisibleDialog(this.page);
    const sourceUrlsContainer = dialog.getByTestId("question-source-urls-input");
    const tagLink = sourceUrlsContainer.getByRole("link", { name: domain });

    await expect(tagLink).toBeVisible();
  },
);

Then(
  /^the source URL tag with domain "(?<domain>[^"]*)" should be hidden in the question form$/u,
  async function(this: GoatItWorld, domain: string): Promise<void> {
    const dialog = await resolveVisibleDialog(this.page);
    const sourceUrlsContainer = dialog.getByTestId("question-source-urls-input");
    const tagLink = sourceUrlsContainer.getByRole("link", { name: domain });

    await expect(tagLink).toBeHidden();
  },
);