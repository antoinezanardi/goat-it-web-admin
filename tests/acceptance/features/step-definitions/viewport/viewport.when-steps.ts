import { When } from "@cucumber/cucumber";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";
import {
  DESKTOP_VIEWPORT,
  MOBILE_VIEWPORT,
} from "#acceptance/features/step-definitions/accessibility/accessibility.steps.constants.ts";

When(
  /^the user resizes the viewport to (?<mode>desktop|mobile)$/u,
  async function(this: GoatItWorld, mode: "desktop" | "mobile"): Promise<void> {
    const viewport = mode === "desktop" ? DESKTOP_VIEWPORT : MOBILE_VIEWPORT;

    await this.page.setViewportSize(viewport);
  },
);