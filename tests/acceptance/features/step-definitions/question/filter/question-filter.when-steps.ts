import { When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { GoatItWorld } from "#acceptance/features/support/types/world.types.ts";
import { clickButtonByName } from "#acceptance/features/support/helpers/button.helpers.ts";
import { selectOptionFromListbox } from "#acceptance/features/support/helpers/listbox.helpers.ts";

When(
  /^the user (?:expands|collapses) the questions filters$/u,
  async function(this: GoatItWorld): Promise<void> {
    await clickButtonByName(this.page, "Filters");
  },
);

When(
  /^the user filters questions by status "(?<status>[^"]+)"$/u,
  async function(this: GoatItWorld, status: string): Promise<void> {
    const filterSelect = this.page.getByTestId("questions-table-status-filter");

    await expect(filterSelect).toBeVisible();

    await selectOptionFromListbox(filterSelect.getByRole("button"), this.page, status);
  },
);

When(
  /^the user filters questions by category "(?<category>[^"]+)"$/u,
  async function(this: GoatItWorld, category: string): Promise<void> {
    const filterSelect = this.page.getByTestId("questions-table-category-filter");

    await expect(filterSelect).toBeVisible();

    await selectOptionFromListbox(filterSelect.getByRole("button"), this.page, category);
  },
);

When(
  /^the user filters questions by cognitive difficulty "(?<difficulty>[^"]+)"$/u,
  async function(this: GoatItWorld, difficulty: string): Promise<void> {
    const filterSelect = this.page.getByTestId("questions-table-cognitive-difficulty-filter");

    await expect(filterSelect).toBeVisible();

    await selectOptionFromListbox(filterSelect.getByRole("button"), this.page, difficulty);
  },
);

When(
  /^the user clears the questions filters$/u,
  async function(this: GoatItWorld): Promise<void> {
    await clickButtonByName(this.page, "Clear all");
  },
);

When(
  /^the user filters questions by theme "(?<theme>[^"]+)"$/u,
  async function(this: GoatItWorld, theme: string): Promise<void> {
    const filterSelect = this.page.getByTestId("questions-table-theme-filter");

    await expect(filterSelect).toBeVisible();

    const selectButton = filterSelect.getByRole("button");

    await selectButton.click();

    const listbox = this.page.getByRole("listbox");

    await expect(listbox).toBeVisible();
    await listbox.getByRole("option", { name: theme }).click();
    await this.page.keyboard.press("Escape");
    await expect(listbox).toBeHidden();
  },
);

When(
  /^the user searches for "(?<search>[^"]+)" in the theme filter$/u,
  async function(this: GoatItWorld, search: string): Promise<void> {
    const filterSelect = this.page.getByTestId("questions-table-theme-filter");

    await expect(filterSelect).toBeVisible();

    const selectButton = filterSelect.getByRole("button");

    await selectButton.click();

    const listbox = this.page.getByRole("listbox");

    await expect(listbox).toBeVisible();

    const searchInput = listbox.locator("input, [role=combobox]").first();

    await searchInput.fill(search);
  },
);

When(
  /^the user removes the "(?<theme>[^"]+)" theme filter$/u,
  async function(this: GoatItWorld, theme: string): Promise<void> {
    const filterSelect = this.page.getByTestId("questions-table-theme-filter");

    await expect(filterSelect).toBeVisible();

    const selectButton = filterSelect.getByRole("button");

    await selectButton.click();

    const listbox = this.page.getByRole("listbox");

    await expect(listbox).toBeVisible();
    await listbox.getByRole("option", { name: theme }).click();
    await this.page.keyboard.press("Escape");
    await expect(listbox).toBeHidden();
  },
);