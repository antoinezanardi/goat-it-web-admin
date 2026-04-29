import type { LocalizedText, LocalizedTexts } from "@goat-it/schemas/shared/locale";
import { describe, expect, it } from "vitest";

import { isLocalizedValueMissing, getLocalizedDisplayValue, getLocalizedTextsDisplayValue } from "#shared/utils/helpers/localization/localization.helpers";

describe("Localization Helpers", () => {
  describe(isLocalizedValueMissing, () => {
    it("should return true when locale value is undefined.", () => {
      const field: Partial<LocalizedText> = { en: undefined, fr: "Bonjour" };

      expect(isLocalizedValueMissing(field, "en")).toBe(true);
    });

    it("should return true when locale value is empty string.", () => {
      const field: Partial<LocalizedText> = { en: "", fr: "Bonjour" };

      expect(isLocalizedValueMissing(field, "en")).toBe(true);
    });

    it("should return true when locale value is whitespace only.", () => {
      const field: Partial<LocalizedText> = { en: "   ", fr: "Bonjour" };

      expect(isLocalizedValueMissing(field, "en")).toBe(true);
    });

    it("should return false when locale value has content.", () => {
      const field: Partial<LocalizedText> = { en: "Hello", fr: "Bonjour" };

      expect(isLocalizedValueMissing(field, "en")).toBe(false);
    });

    it("should return true when locale value is an empty array.", () => {
      const field: Partial<LocalizedTexts> = { en: [], fr: ["Bonjour"] };

      expect(isLocalizedValueMissing(field, "en")).toBe(true);
    });

    it("should return true when locale value is an array of whitespace-only strings.", () => {
      const field: Partial<LocalizedTexts> = { en: ["  ", "\t"], fr: ["Bonjour"] };

      expect(isLocalizedValueMissing(field, "en")).toBe(true);
    });

    it("should return false when locale value is an array with content.", () => {
      const field: Partial<LocalizedTexts> = { en: ["Hello", "World"], fr: ["Bonjour"] };

      expect(isLocalizedValueMissing(field, "en")).toBe(false);
    });
  });

  describe(getLocalizedDisplayValue, () => {
    it("should return trimmed value when locale has content.", () => {
      const field: Partial<LocalizedText> = { en: "  Hello  " };

      expect(getLocalizedDisplayValue(field, "en")).toBe("Hello");
    });

    it("should return undefined when locale value is missing.", () => {
      const field: Partial<LocalizedText> = { en: "" };

      expect(getLocalizedDisplayValue(field, "en")).toBeUndefined();
    });
  });

  describe(getLocalizedTextsDisplayValue, () => {
    it("should return comma-separated string when locale has values.", () => {
      const field: Partial<LocalizedTexts> = { en: ["physics", "chemistry", "biology"] };

      expect(getLocalizedTextsDisplayValue(field, "en")).toBe("physics, chemistry, biology");
    });

    it("should return undefined when locale array is empty.", () => {
      const field: Partial<LocalizedTexts> = { en: [] };

      expect(getLocalizedTextsDisplayValue(field, "en")).toBeUndefined();
    });

    it("should return undefined when locale value is undefined.", () => {
      const field: Partial<LocalizedTexts> = { en: undefined };

      expect(getLocalizedTextsDisplayValue(field, "en")).toBeUndefined();
    });

    it("should return undefined when locale array contains only whitespace strings.", () => {
      const field: Partial<LocalizedTexts> = { en: ["  ", "\t", "\n"] };

      expect(getLocalizedTextsDisplayValue(field, "en")).toBeUndefined();
    });

    it("should return trimmed comma-separated string when locale has values with whitespace.", () => {
      const field: Partial<LocalizedTexts> = { en: ["  physics  ", " chemistry ", "biology"] };

      expect(getLocalizedTextsDisplayValue(field, "en")).toBe("physics, chemistry, biology");
    });

    it("should filter out empty strings after trimming when locale has mixed values.", () => {
      const field: Partial<LocalizedTexts> = { en: ["physics", "  ", "biology"] };

      expect(getLocalizedTextsDisplayValue(field, "en")).toBe("physics, biology");
    });
  });
});