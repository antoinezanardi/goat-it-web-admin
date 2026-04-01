import { crush } from "radashi";
import { describe, it, expect } from "vitest";

import frCommon from "~/i18n/locales/fr/common.json";
import enCommon from "~/i18n/locales/en/common.json";

describe("common.json translations", () => {
  it("should have the same keys in english as in french when context is common.", () => {
    const crushedFrCommonKeys = Object.keys(crush(frCommon)).toSorted();
    const crushedEnCommonKeys = Object.keys(crush(enCommon)).toSorted();

    expect(crushedEnCommonKeys).toStrictEqual(crushedFrCommonKeys);
  });
});