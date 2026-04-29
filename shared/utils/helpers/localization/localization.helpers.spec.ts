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
  });
});