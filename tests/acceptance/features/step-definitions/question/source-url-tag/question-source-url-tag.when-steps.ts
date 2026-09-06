import { When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";
import { resolveVisibleDialog } from "#acceptance/features/support/helpers/dialog.helpers.ts";

When(
  /^the user clicks on the source URL tag with domain "(?<domain>[^"]*)" in the question form$/u,
  async function(this: GoatItWorld, domain: string): Promise<void> {
    const dialog = await resolveVisibleDialog(this.page);

    const sourceUrlsContainer = dialog.getByTestId("question-source-urls-input");
    const tagLink = sourceUrlsContainer.getByRole("link", { name: domain });

    await expect(tagLink).toBeVisible();

    const [openedTabPage] = await Promise.all([
      this.context.waitForEvent("page"),
      tagLink.click(),
    ]);

    await openedTabPage.waitForLoadState();
    this.openedTabPage = openedTabPage;
  },
);

When(
  /^the user removes the source URL tag with domain "(?<domain>[^"]*)" from the question form$/u,
  async function(this: GoatItWorld, domain: string): Promise<void> {
    const dialog = await resolveVisibleDialog(this.page);

    const sourceUrlsContainer = dialog.getByTestId("question-source-urls-input");
    const tagLink = sourceUrlsContainer.getByRole("link", { name: domain });
    const href = await tagLink.getAttribute("href");
    const deleteButton = sourceUrlsContainer.getByTestId(`remove-tag-${href}`);

    await expect(deleteButton).toBeVisible();
    await deleteButton.click();
  },
);