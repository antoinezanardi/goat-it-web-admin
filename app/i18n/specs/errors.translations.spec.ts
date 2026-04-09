import { crush } from "radashi";
import { describe, it, expect } from "vitest";

import frErrors from "~/i18n/locales/fr/errors.json";
import enErrors from "~/i18n/locales/en/errors.json";

describe("errors.json translations", () => {
  it("should have the same keys in english as in french when context is errors.", () => {
    const crushedFrErrorsKeys = Object.keys(crush(frErrors)).toSorted();
    const crushedEnErrorsKeys = Object.keys(crush(enErrors)).toSorted();

    expect(crushedEnErrorsKeys).toStrictEqual(crushedFrErrorsKeys);
  });
});