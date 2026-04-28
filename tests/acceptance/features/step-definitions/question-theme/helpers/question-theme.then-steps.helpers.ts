import type { Page } from "@playwright/test";

async function findTableRowMatchingAttributes(page: Page, row: Record<string, string | undefined>): Promise<boolean> {
  const table = page.getByRole("table");
  const rows = table.getByRole("row");
  const rowCount = await rows.count();

  for (let index = 0; index < rowCount; index++) {
    const currentRow = rows.nth(index);
    const cells = currentRow.getByRole("cell");
    const cellTexts: string[] = [];
    // oxlint-disable-next-line eslint/no-await-in-loop -- Playwright locators require sequential evaluation
    const cellCount = await cells.count();

    for (let cellIndex = 0; cellIndex < cellCount; cellIndex++) {
      // oxlint-disable-next-line eslint/no-await-in-loop, unicorn/prefer-dom-node-text-content -- Playwright locators require sequential evaluation; innerText() returns string (not nullable)
      const text = await cells.nth(cellIndex).innerText();

      cellTexts.push(text.trim());
    }

    const rowText = cellTexts.join(" ");
    const doAllMatch = Object.entries(row).every(([, value]) => {
      if (value === undefined) {
        return true;
      }
      return rowText.includes(value);
    });

    if (doAllMatch) {
      return true;
    }
  }
  return false;
}

export { findTableRowMatchingAttributes };