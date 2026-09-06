import { When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";
import { resolveVisibleDialog } from "#acceptance/features/support/helpers/dialog.helpers.ts";

When(
  /^the user clicks on the close button in the modal header$/u,
  async function(this: GoatItWorld): Promise<void> {
    const dialog = await resolveVisibleDialog(this.page);

    const closeButton = dialog.getByRole("button", { name: "Close" }).first();

    await expect(closeButton).toBeVisible();
    await closeButton.click();
  },
);

When(
  /^the user clicks on the close button in the modal footer$/u,
  async function(this: GoatItWorld): Promise<void> {
    const dialog = await resolveVisibleDialog(this.page);

    const closeButton = dialog.getByTestId("default-modal-footer-close-button");

    await expect(closeButton).toBeVisible();
    await closeButton.click();
  },
);

When(
  /^the user clicks on the overlay outside of the modal$/u,
  async function(this: GoatItWorld): Promise<void> {
    await resolveVisibleDialog(this.page);

    await this.page.locator("body").click({ position: { x: 10, y: 10 } });
  },
);