import { When } from "@cucumber/cucumber";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";

When(
  /^the user presses the "(?<key>[^"]*)" key$/u,
  async function(this: GoatItWorld, key: string): Promise<void> {
    const osAgnosticKey = process.platform === "darwin" ? key : key.replaceAll("Meta", "Control");

    await this.page.keyboard.press(osAgnosticKey);
  },
);