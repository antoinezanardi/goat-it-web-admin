import { crush } from "radashi";
import { describe, it, expect } from "vitest";

import frValidation from "~/i18n/locales/fr/validation.json";
import enValidation from "~/i18n/locales/en/validation.json";

describe("validation.json translations", () => {
  it("should have the same keys in english as in french when context is validation.", () => {
    const crushedFrKeys = Object.keys(crush(frValidation)).toSorted();
    const crushedEnKeys = Object.keys(crush(enValidation)).toSorted();

    expect(crushedEnKeys).toStrictEqual(crushedFrKeys);
  });
});