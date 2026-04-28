import { Then } from "@cucumber/cucumber";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";
import { waitForPageUrl } from "#acceptance/features/step-definitions/navigation/helpers/navigation.given-steps.helpers.ts";

Then(/^the user should be on (?<page>.+) page$/u, async function(this: GoatItWorld, page: string): Promise<void> {
  const pageName = page === "home" ? "" : page;

  await waitForPageUrl(this, `/${pageName}`);
});