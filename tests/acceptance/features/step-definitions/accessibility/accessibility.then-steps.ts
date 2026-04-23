import { AxeBuilder } from "@axe-core/playwright";
import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";

const DESKTOP_VIEWPORT = { width: 1920, height: 800 };

const MOBILE_VIEWPORT = { width: 375, height: 667 };

const AXE_TAGS = [
  "wcag2a",
  "wcag2aa",
  "wcag21a",
  "wcag21aa",
  "wcag22aa",
  "best-practice",
  "ACT",
];

const JSON_STRINGIFY_INDENT = 2;

Then(
  /^the page should not contain accessibility issues in (?<mode>desktop|mobile) mode$/u,
  async function(this: GoatItWorld, mode: string): Promise<void> {
    const viewport = mode === "desktop" ? DESKTOP_VIEWPORT : MOBILE_VIEWPORT;

    await this.page.setViewportSize(viewport);
    const results = await new AxeBuilder({ page: this.page })
      .withTags(AXE_TAGS)
      .analyze();

    if (results.violations.length > 0) {
      console.error(`Accessibility violations:\n${JSON.stringify(results.violations, undefined, JSON_STRINGIFY_INDENT)}`);
    }
    expect(results.violations).toHaveLength(0);
  },
);