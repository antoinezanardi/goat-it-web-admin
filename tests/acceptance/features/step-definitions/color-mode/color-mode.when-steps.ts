import { When } from "@cucumber/cucumber";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";

When(
  "the user switches to dark mode",
  async function(this: GoatItWorld): Promise<void> {
    const colorModeSwitch = this.page.getByRole("switch", { name: "Switch to dark mode" });

    await colorModeSwitch.click();
  },
);