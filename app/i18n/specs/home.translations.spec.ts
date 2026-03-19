import { crush } from "radashi";
import { describe, it, expect } from "vitest";

import frHome from "~/i18n/locales/fr/home.json";
import enHome from "~/i18n/locales/en/home.json";

describe("home.json translations", () => {
  it("should have the same keys in english as in french when context is home.", () => {
    const crushedFrHomeKeys = Object.keys(crush(frHome)).toSorted();
    const crushedEnHomeKeys = Object.keys(crush(enHome)).toSorted();

    expect(crushedEnHomeKeys).toStrictEqual<string[]>(crushedFrHomeKeys);
  });
});