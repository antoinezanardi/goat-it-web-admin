import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";

Then(
  /^the source URL tag with domain "(?<domain>[^"]*)" should be visible in the question form$/u,
  async function(this: GoatItWorld, domain: string): Promise<void> {
    const dialog = this.page.getByRole("dialog");
    const sourceUrlsContainer = dialog.getByTestId("question-source-urls-input");
    const tagLink = sourceUrlsContainer.getByRole("link", { name: domain });

    await expect(tagLink).toBeVisible();
  },
);

Then(
  /^the source URL tag with domain "(?<domain>[^"]*)" should be hidden in the question form$/u,
  async function(this: GoatItWorld, domain: string): Promise<void> {
    const dialog = this.page.getByRole("dialog");
    const sourceUrlsContainer = dialog.getByTestId("question-source-urls-input");
    const tagLink = sourceUrlsContainer.getByRole("link", { name: domain });

    await expect(tagLink).toBeHidden();
  },
);

Then(
  /^a new tab should have been opened with URL "(?<expectedUrl>[^"]*)"$/u,
  function(this: GoatItWorld, expectedUrl: string): void {
    if (!this.openedTabPage) {
      throw new Error("Expected a new tab to have been opened, but none was found.");
    }
    expect(this.openedTabPage.url()).toBe(expectedUrl);
  },
);