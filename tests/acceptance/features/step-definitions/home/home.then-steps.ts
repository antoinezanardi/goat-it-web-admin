import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";

Then(
  /^the question by category stat should display no data$/u,
  async function(this: GoatItWorld): Promise<void> {
    const locator = this.page.getByTestId("stats-card-by-category").getByText("No data available", { exact: true });

    await expect(locator).toBeVisible();
  },
);

Then(
  /^the question by difficulty stat should display no data$/u,
  async function(this: GoatItWorld): Promise<void> {
    const locator = this.page.getByTestId("stats-card-by-difficulty").getByText("No data available", { exact: true });

    await expect(locator).toBeVisible();
  },
);

Then(
  /^the question by status stat should display no data$/u,
  async function(this: GoatItWorld): Promise<void> {
    const locator = this.page.getByTestId("stats-card-by-status").getByText("No data available", { exact: true });

    await expect(locator).toBeVisible();
  },
);

Then(
  /^the question by author role stat should display no data$/u,
  async function(this: GoatItWorld): Promise<void> {
    const locator = this.page.getByTestId("stats-card-by-author-role").getByText("No data available", { exact: true });

    await expect(locator).toBeVisible();
  },
);

Then(
  /^the question by rejection type stat should display no data$/u,
  async function(this: GoatItWorld): Promise<void> {
    const locator = this.page.getByTestId("stats-card-by-rejection-type").getByText("No data available", { exact: true });

    await expect(locator).toBeVisible();
  },
);

Then(
  /^the question theme by question count stat should display no data$/u,
  async function(this: GoatItWorld): Promise<void> {
    const locator = this.page.getByTestId("stats-card-by-question-count").getByText("No data available", { exact: true });

    await expect(locator).toBeVisible();
  },
);

Then(
  /^the question theme by status stat should display no data$/u,
  async function(this: GoatItWorld): Promise<void> {
    const locator = this.page.getByTestId("stats-card-theme-by-status").getByText("No data available", { exact: true });

    await expect(locator).toBeVisible();
  },
);