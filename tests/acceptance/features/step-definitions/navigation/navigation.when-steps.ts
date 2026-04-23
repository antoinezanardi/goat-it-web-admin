import { When } from "@cucumber/cucumber";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";
import { waitForPageLoadStates } from "#acceptance/features/step-definitions/navigation/helpers/navigation.given-steps.helpers.ts";

When(/^the user reloads the page$/u, async function(this: GoatItWorld): Promise<void> {
  await this.page.reload();
  await waitForPageLoadStates(this);
});