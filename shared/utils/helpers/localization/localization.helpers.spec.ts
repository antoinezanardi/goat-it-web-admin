import { describe, expect, it } from "vitest";

import { createFakeLocalizedText, createFakeLocalizedTexts } from "~~/tests/unit/utils/faketories/shared/locale/locale.faketory";

import { isLocalizedValueMissing, getLocalizedDisplayValue, getLocalizedTextsDisplayValue } from "#shared/utils/helpers/localization/localization.helpers";

describe("Localization Helpers", () => {
  describe(isLocalizedValueMissing, () => {
    it.each<{ description: string; field: ReturnType<typeof createFakeLocalizedText> | ReturnType<typeof createFakeLocalizedTexts>; expected: boolean }>([
      { description: "locale value is undefined", field: createFakeLocalizedText({ en: undefined, fr: "Bonjour" }), expected: true },
      { description: "locale value is empty string", field: createFakeLocalizedText({ en: "", fr: "Bonjour" }), expected: true },
      { description: "locale value is whitespace only", field: createFakeLocalizedText({ en: "   ", fr: "Bonjour" }), expected: true },
      { description: "locale value is an empty array", field: createFakeLocalizedTexts({ en: [], fr: ["Bonjour"] }), expected: true },
      { description: "locale value is an array of whitespace-only strings", field: createFakeLocalizedTexts({ en: ["  ", "\t"], fr: ["Bonjour"] }), expected: true },
    ])("should return true when $description.", ({ field, expected }) => {
      expect(isLocalizedValueMissing(field, "en")).toBe(expected);
    });

    it.each<{ description: string; field: ReturnType<typeof createFakeLocalizedText> | ReturnType<typeof createFakeLocalizedTexts>; expected: boolean }>([
      { description: "locale value has content", field: createFakeLocalizedText({ en: "Hello", fr: "Bonjour" }), expected: false },
      { description: "locale value is an array with content", field: createFakeLocalizedTexts({ en: ["Hello", "World"], fr: ["Bonjour"] }), expected: false },
    ])("should return false when $description.", ({ field, expected }) => {
      expect(isLocalizedValueMissing(field, "en")).toBe(expected);
    });
  });

  describe(getLocalizedDisplayValue, () => {
    it("should return trimmed value when locale has content.", () => {
      const field = createFakeLocalizedText({ en: "  Hello  " });

      expect(getLocalizedDisplayValue(field, "en")).toBe("Hello");
    });

    it("should return undefined when locale value is missing.", () => {
      const field = createFakeLocalizedText({ en: "" });

      expect(getLocalizedDisplayValue(field, "en")).toBeUndefined();
    });

    it("should return undefined when locale value is whitespace only.", () => {
      const field = createFakeLocalizedText({ en: "   " });

      expect(getLocalizedDisplayValue(field, "en")).toBeUndefined();
    });
  });

  describe(getLocalizedTextsDisplayValue, () => {
    it.each<{ description: string; field: ReturnType<typeof createFakeLocalizedTexts>; expected: string }>([
      { description: "locale has values", field: createFakeLocalizedTexts({ en: ["physics", "chemistry", "biology"] }), expected: "physics, chemistry, biology" },
      {
        description: "locale has values with whitespace",
        field: createFakeLocalizedTexts({ en: ["  physics  ", " chemistry ", "biology"] }),
        expected: "physics, chemistry, biology",
      },
      { description: "locale has mixed values", field: createFakeLocalizedTexts({ en: ["physics", "  ", "biology"] }), expected: "physics, biology" },
    ])("should return $expected when $description.", ({ field, expected }) => {
      expect(getLocalizedTextsDisplayValue(field, "en")).toBe(expected);
    });

    it.each<{ description: string; field: ReturnType<typeof createFakeLocalizedTexts> }>([
      { description: "locale array is empty", field: createFakeLocalizedTexts({ en: [] }) },
      { description: "locale value is undefined", field: createFakeLocalizedTexts({ en: undefined }) },
      { description: "locale array contains only whitespace strings", field: createFakeLocalizedTexts({ en: ["  ", "\t", "\n"] }) },
    ])("should return undefined when $description.", ({ field }) => {
      expect(getLocalizedTextsDisplayValue(field, "en")).toBeUndefined();
    });
  });
});