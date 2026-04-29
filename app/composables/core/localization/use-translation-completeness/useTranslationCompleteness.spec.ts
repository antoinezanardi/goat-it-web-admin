import type { LocalizedText } from "@goat-it/schemas/shared/locale";
import { beforeEach, describe, expect, it } from "vitest";

import type { useTranslationCompleteness as UseTranslationCompletenessType } from "~/composables/core/localization/use-translation-completeness/useTranslationCompleteness";
import type { TranslationCompleteness } from "~/composables/core/localization/use-translation-completeness/use-translation-completeness.types";

let useTranslationCompleteness: typeof UseTranslationCompletenessType;

describe("useTranslationCompleteness", () => {
  beforeEach(async() => {
    ({ useTranslationCompleteness } = await import("~/composables/core/localization/use-translation-completeness/useTranslationCompleteness"));
  });

  describe("completedCount", () => {
    it("should return 6 when all locales have non-empty values in all fields.", () => {
      const fullField = { en: "Hello", fr: "Bonjour", es: "Hola", de: "Hallo", it: "Ciao", pt: "Olá" } as LocalizedText;

      const { completedCount }: TranslationCompleteness = useTranslationCompleteness([fullField]);

      expect(completedCount.value).toBe(6);
    });

    it("should return 0 when all locales are empty in all fields.", () => {
      const emptyField = { en: "", fr: "", es: "", de: "", it: "", pt: "" } as LocalizedText;

      const { completedCount }: TranslationCompleteness = useTranslationCompleteness([emptyField]);

      expect(completedCount.value).toBe(0);
    });

    it("should return 3 when only 3 locales are filled.", () => {
      const partialField = { en: "Hello", fr: "Bonjour", es: "Hola", de: "", it: "", pt: "" } as LocalizedText;

      const { completedCount }: TranslationCompleteness = useTranslationCompleteness([partialField]);

      expect(completedCount.value).toBe(3);
    });

    it("should return 5 when one locale has an empty required field across multiple fields.", () => {
      const field1 = { en: "Hello", fr: "Bonjour", es: "Hola", de: "Hallo", it: "Ciao", pt: "Olá" } as LocalizedText;
      const field2 = { en: "World", fr: "", es: "Mundo", de: "Welt", it: "Mondo", pt: "Mundo" } as LocalizedText;

      const { completedCount }: TranslationCompleteness = useTranslationCompleteness([field1, field2]);

      expect(completedCount.value).toBe(5);
    });

    it("should return 0 when all locales contain only whitespace.", () => {
      const whitespaceField = { en: "   ", fr: "  ", es: " ", de: "\t", it: "\n", pt: "  " } as LocalizedText;

      const { completedCount }: TranslationCompleteness = useTranslationCompleteness([whitespaceField]);

      expect(completedCount.value).toBe(0);
    });
  });

  describe("totalCount", () => {
    it("should return 6 when fields are empty.", () => {
      const emptyField = { en: "", fr: "", es: "", de: "", it: "", pt: "" } as LocalizedText;

      const { totalCount }: TranslationCompleteness = useTranslationCompleteness([emptyField]);

      expect(totalCount).toBe(6);
    });
  });

  describe("localeStatuses", () => {
    it("should return a boolean map with true for filled locales and false for empty ones when field is partially translated.", () => {
      const field = { en: "Hello", fr: "", es: "Hola", de: "", it: "Ciao", pt: "" } as LocalizedText;

      const { localeStatuses }: TranslationCompleteness = useTranslationCompleteness([field]);

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
      const fullField = { en: "Hello", fr: "Bonjour", es: "Hola", de: "Hallo", it: "Ciao", pt: "Olá" } as LocalizedText;

      const { isFullyTranslated }: TranslationCompleteness = useTranslationCompleteness([fullField]);

      expect(isFullyTranslated.value).toBeTruthy();
    });

    it("should return false when some locales are empty.", () => {
      const partialField = { en: "Hello", fr: "", es: "Hola", de: "", it: "", pt: "" } as LocalizedText;

      const { isFullyTranslated }: TranslationCompleteness = useTranslationCompleteness([partialField]);

      expect(isFullyTranslated.value).toBeFalsy();
    });
  });

  describe("Reactivity", () => {
    it("should return 0 completed count when ref initially contains empty fields.", () => {
      const emptyField = { en: "", fr: "", es: "", de: "", it: "", pt: "" } as LocalizedText;
      const fieldsReference = ref<LocalizedText[]>([emptyField]);

      const { completedCount }: TranslationCompleteness = useTranslationCompleteness(fieldsReference);

      expect(completedCount.value).toBe(0);
    });

    it("should return false for isFullyTranslated when ref initially contains empty fields.", () => {
      const emptyField = { en: "", fr: "", es: "", de: "", it: "", pt: "" } as LocalizedText;
      const fieldsReference = ref<LocalizedText[]>([emptyField]);

      const { isFullyTranslated }: TranslationCompleteness = useTranslationCompleteness(fieldsReference);

      expect(isFullyTranslated.value).toBeFalsy();
    });

    it("should return 6 completed count when ref is updated to full fields.", () => {
      const emptyField = { en: "", fr: "", es: "", de: "", it: "", pt: "" } as LocalizedText;
      const fieldsReference = ref<LocalizedText[]>([emptyField]);

      const { completedCount }: TranslationCompleteness = useTranslationCompleteness(fieldsReference);

      const fullField = { en: "Hello", fr: "Bonjour", es: "Hola", de: "Hallo", it: "Ciao", pt: "Olá" } as LocalizedText;
      fieldsReference.value = [fullField];

      expect(completedCount.value).toBe(6);
    });

    it("should return true for isFullyTranslated when ref is updated to full fields.", () => {
      const emptyField = { en: "", fr: "", es: "", de: "", it: "", pt: "" } as LocalizedText;
      const fieldsReference = ref<LocalizedText[]>([emptyField]);

      const { isFullyTranslated }: TranslationCompleteness = useTranslationCompleteness(fieldsReference);

      const fullField = { en: "Hello", fr: "Bonjour", es: "Hola", de: "Hallo", it: "Ciao", pt: "Olá" } as LocalizedText;
      fieldsReference.value = [fullField];

      expect(isFullyTranslated.value).toBeTruthy();
    });
  });
});