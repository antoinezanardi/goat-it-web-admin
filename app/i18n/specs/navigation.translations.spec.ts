import { crush } from "radashi";
import { describe, it, expect } from "vitest";

import frNavigation from "~/i18n/locales/fr/navigation.json";
import enNavigation from "~/i18n/locales/en/navigation.json";

describe("navigation.json translations", () => {
  it("should have the same keys in english as in french when context is navigation.", () => {
    const crushedFrNavigationKeys = Object.keys(crush(frNavigation)).toSorted();
    const crushedEnNavigationKeys = Object.keys(crush(enNavigation)).toSorted();

    expect(crushedEnNavigationKeys).toStrictEqual<string[]>(crushedFrNavigationKeys);
  });
});