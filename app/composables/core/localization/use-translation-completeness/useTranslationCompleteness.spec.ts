import { beforeEach, describe, expect, it } from "vitest";

import { createFakeLocalizedText } from "~~/tests/unit/utils/faketories/shared/locale/locale.faketory";

import type { useTranslationCompleteness as UseTranslationCompletenessType } from "~/composables/core/localization/use-translation-completeness/useTranslationCompleteness";
import type { UseTranslationCompleteness } from "~/composables/core/localization/use-translation-completeness/use-translation-completeness.types";

let useTranslationCompleteness: typeof UseTranslationCompletenessType;

describe("useTranslationCompleteness", () => {
  beforeEach(async() => {
    ({ useTranslationCompleteness } = await import("~/composables/core/localization/use-translation-completeness/useTranslationCompleteness"));
  });

  describe("completedCount", () => {
    it("should return 6 when all locales have non-empty values in all fields.", () => {
      const fullField = createFakeLocalizedText({ en: "Hello", fr: "Bonjour", es: "Hola", de: "Hallo", it: "Ciao", pt: "Olá" });

      const { completedCount }: UseTranslationCompleteness = useTranslationCompleteness([fullField]);

      expect(completedCount.value).toBe(6);
    });

    it("should return 0 when all locales are empty in all fields.", () => {
      const emptyField = createFakeLocalizedText({ en: "", fr: "", es: "", de: "", it: "", pt: "" });

      const { completedCount }: UseTranslationCompleteness = useTranslationCompleteness([emptyField]);

      expect(completedCount.value).toBe(0);
    });

    it("should return 3 when only 3 locales are filled.", () => {
      const partialField = createFakeLocalizedText({ en: "Hello", fr: "Bonjour", es: "Hola", de: "", it: "", pt: "" });

      const { completedCount }: UseTranslationCompleteness = useTranslationCompleteness([partialField]);

      expect(completedCount.value).toBe(3);
    });

    it("should return 5 when one locale has an empty required field across multiple fields.", () => {
      const field1 = createFakeLocalizedText({ en: "Hello", fr: "Bonjour", es: "Hola", de: "Hallo", it: "Ciao", pt: "Olá" });
      const field2 = createFakeLocalizedText({ en: "World", fr: "", es: "Mundo", de: "Welt", it: "Mondo", pt: "Mundo" });

      const { completedCount }: UseTranslationCompleteness = useTranslationCompleteness([field1, field2]);

      expect(completedCount.value).toBe(5);
    });

    it("should return 0 when all locales contain only whitespace.", () => {
      const whitespaceField = createFakeLocalizedText({ en: "   ", fr: "  ", es: " ", de: "\t", it: "\n", pt: "  " });

      const { completedCount }: UseTranslationCompleteness = useTranslationCompleteness([whitespaceField]);

      expect(completedCount.value).toBe(0);
    });
  });

  describe("totalCount", () => {
    it("should return 6 when fields are empty.", () => {
      const emptyField = createFakeLocalizedText({ en: "", fr: "", es: "", de: "", it: "", pt: "" });

      const { totalCount }: UseTranslationCompleteness = useTranslationCompleteness([emptyField]);

      expect(totalCount).toBe(6);
    });
  });

  describe("localeStatuses", () => {
    it("should return a boolean map with true for filled locales and false for empty ones when field is partially translated.", () => {
      const field = createFakeLocalizedText({ en: "Hello", fr: "", es: "Hola", de: "", it: "Ciao", pt: "" });

      const { localeStatuses }: UseTranslationCompleteness = useTranslationCompleteness([field]);

      expect(localeStatuses.value).toStrictEqual({
        en: true,
        fr: false,
        es: true,
        de: false,
        it: true,
        pt: false,
      });
    });
  });

  describe("isFullyTranslated", () => {
    it("should return true when all locales are filled.", () => {
      const fullField = createFakeLocalizedText({ en: "Hello", fr: "Bonjour", es: "Hola", de: "Hallo", it: "Ciao", pt: "Olá" });

      const { isFullyTranslated }: UseTranslationCompleteness = useTranslationCompleteness([fullField]);

      expect(isFullyTranslated.value).toBeTruthy();
    });

    it("should return false when some locales are empty.", () => {
      const partialField = createFakeLocalizedText({ en: "Hello", fr: "", es: "Hola", de: "", it: "", pt: "" });

      const { isFullyTranslated }: UseTranslationCompleteness = useTranslationCompleteness([partialField]);

      expect(isFullyTranslated.value).toBeFalsy();
    });
  });

  describe("isLocaleComplete", () => {
    it("should return true when locale has a non-empty value in all fields.", () => {
      const fullField = createFakeLocalizedText({ en: "Hello", fr: "Bonjour", es: "Hola", de: "Hallo", it: "Ciao", pt: "Olá" });

      const { isLocaleComplete }: UseTranslationCompleteness = useTranslationCompleteness([fullField]);

      expect(isLocaleComplete("en")).toBeTruthy();
    });

    it("should return false when locale has an empty value.", () => {
      const partialField = createFakeLocalizedText({ en: "Hello", fr: "", es: "Hola", de: "", it: "", pt: "" });

      const { isLocaleComplete }: UseTranslationCompleteness = useTranslationCompleteness([partialField]);

      expect(isLocaleComplete("fr")).toBeFalsy();
    });
  });

  describe("Reactivity", () => {
    it("should return 0 completed count when ref initially contains empty fields.", () => {
      const emptyField = createFakeLocalizedText({ en: "", fr: "", es: "", de: "", it: "", pt: "" });
      const fieldsReference = ref([emptyField]);

      const { completedCount }: UseTranslationCompleteness = useTranslationCompleteness(fieldsReference);

      expect(completedCount.value).toBe(0);
    });

    it("should return false for isFullyTranslated when ref initially contains empty fields.", () => {
      const emptyField = createFakeLocalizedText({ en: "", fr: "", es: "", de: "", it: "", pt: "" });
      const fieldsReference = ref([emptyField]);

      const { isFullyTranslated }: UseTranslationCompleteness = useTranslationCompleteness(fieldsReference);

      expect(isFullyTranslated.value).toBeFalsy();
    });

    it("should return 6 completed count when ref is updated to full fields.", () => {
      const emptyField = createFakeLocalizedText({ en: "", fr: "", es: "", de: "", it: "", pt: "" });
      const fieldsReference = ref([emptyField]);

      const { completedCount }: UseTranslationCompleteness = useTranslationCompleteness(fieldsReference);

      const fullField = createFakeLocalizedText({ en: "Hello", fr: "Bonjour", es: "Hola", de: "Hallo", it: "Ciao", pt: "Olá" });
      fieldsReference.value = [fullField];

      expect(completedCount.value).toBe(6);
    });

    it("should return true for isFullyTranslated when ref is updated to full fields.", () => {
      const emptyField = createFakeLocalizedText({ en: "", fr: "", es: "", de: "", it: "", pt: "" });
      const fieldsReference = ref([emptyField]);

      const { isFullyTranslated }: UseTranslationCompleteness = useTranslationCompleteness(fieldsReference);

      const fullField = createFakeLocalizedText({ en: "Hello", fr: "Bonjour", es: "Hola", de: "Hallo", it: "Ciao", pt: "Olá" });
      fieldsReference.value = [fullField];

      expect(isFullyTranslated.value).toBeTruthy();
    });
  });
});