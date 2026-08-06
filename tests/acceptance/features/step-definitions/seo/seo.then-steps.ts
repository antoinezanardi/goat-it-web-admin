import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { url } from "@nuxt/test-utils/e2e";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";

Then(
  /^the page should have a meta robots tag with content "noindex, nofollow"$/u,
  async function(this: GoatItWorld): Promise<void> {
    const metaRobots = this.page.locator("meta[name=\"robots\"]");

    await expect(metaRobots).toHaveAttribute("content", "noindex, nofollow");
  },
);

Then(
  /^the robots.txt file should block all crawlers$/u,
  async function(this: GoatItWorld): Promise<void> {
    const response = await this.page.request.get(url("/robots.txt"));
    const body = await response.text();

    expect(body).toContain("User-agent: *");
    expect(body).toContain("Disallow: /");
  },
);