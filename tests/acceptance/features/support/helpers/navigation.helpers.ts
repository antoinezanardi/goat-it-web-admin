import type { Page } from "@playwright/test";

async function waitForPageLoadStates(page: Page): Promise<void> {
  await page.waitForLoadState("load");
}

async function waitForPageUrl(page: Page, pageUrl: string): Promise<void> {
  await page.waitForURL(currentUrl => new URL(currentUrl).pathname === pageUrl);
}

export {
  waitForPageLoadStates,
  waitForPageUrl,
};