import { AxeBuilder } from "@axe-core/playwright";
import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";
import {
  AXE_TAGS,
  DESKTOP_VIEWPORT,
  MOBILE_VIEWPORT,
} from "#acceptance/features/step-definitions/accessibility/accessibility.steps.constants.ts";
import { prettyStringify } from "#acceptance/features/support/helpers/format.helpers.ts";

Then(
  /^the page should not contain accessibility issues in (?<mode>desktop|mobile) mode$/u,
  async function(this: GoatItWorld, mode: "desktop" | "mobile"): Promise<void> {
    const viewport = mode === "desktop" ? DESKTOP_VIEWPORT : MOBILE_VIEWPORT;

    await this.page.setViewportSize(viewport);
    await this.page.waitForLoadState("networkidle");
    const results = await new AxeBuilder({ page: this.page })
      .setLegacyMode()
      .withTags([...AXE_TAGS])
      .analyze();

    if (results.violations.length > 0) {
      console.error(`Accessibility violations:\n${prettyStringify(results.violations)}`);
    }
    expect(results.violations).toHaveLength(0);
  },
);