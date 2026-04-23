import type { LocatorRole } from "#acceptance/features/support/types/playwright.types.ts";

const VALID_LOCATOR_ROLES: ReadonlySet<string> = new Set([
  "button",
  "img",
  "heading",
  "navigation",
  "link",
  "region",
  "paragraph",
  "tab",
  "alertdialog",
  "dialog",
  "progressbar",
]);

function assertIsLocatorRole(role: string): asserts role is LocatorRole {
  if (!VALID_LOCATOR_ROLES.has(role)) {
    throw new Error(`Invalid locator role: "${role}". Expected one of: ${[...VALID_LOCATOR_ROLES].join(", ")}`);
  }
}

export { assertIsLocatorRole };