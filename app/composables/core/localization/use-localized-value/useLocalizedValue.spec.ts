import type { LocalizedText } from "@goat-it/schemas/shared/locale";
import { beforeEach, describe, expect, it } from "vitest";
import { createFakeLocalizedText } from "@goat-it/schemas/testing/shared";

import type { useLocalizedValue as UseLocalizedValueType } from "~/composables/core/localization/use-localized-value/useLocalizedValue";
import type { UseLocalizedValue } from "~/composables/core/localization/use-localized-value/use-localized-value.types";

let useLocalizedValue: typeof UseLocalizedValueType;

describe("useLocalizedValue", () => {
  beforeEach(async() => {
    ({ useLocalizedValue } = await import("~/composables/core/localization/use-localized-value/useLocalizedValue"));
  });

  describe("isCurrentLocaleMissing", () => {
    it("should return true when current locale value is undefined.", () => {
      const localizedText = createFakeLocalizedText({ en: undefined });

      const { isCurrentLocaleMissing }: UseLocalizedValue = useLocalizedValue(localizedText);

      expect(isCurrentLocaleMissing.value).toBeTruthy();
    });

    it("should return true when current locale value is empty string.", () => {
      const localizedText = createFakeLocalizedText({ en: "" });

      const { isCurrentLocaleMissing }: UseLocalizedValue = useLocalizedValue(localizedText);

      expect(isCurrentLocaleMissing.value).toBeTruthy();
    });

    it("should return true when current locale value is whitespace only.", () => {
      const localizedText = createFakeLocalizedText({ en: "   " });

      const { isCurrentLocaleMissing }: UseLocalizedValue = useLocalizedValue(localizedText);

      expect(isCurrentLocaleMissing.value).toBeTruthy();
    });

    it("should return false when current locale has content.", () => {
      const localizedText = createFakeLocalizedText({ en: "Hello" });

      const { isCurrentLocaleMissing }: UseLocalizedValue = useLocalizedValue(localizedText);

      expect(isCurrentLocaleMissing.value).toBeFalsy();
    });
  });

  describe("currentLocaleDisplayValue", () => {
    it("should return trimmed string when current locale value is available.", () => {
      const localizedText = createFakeLocalizedText({ en: "  Hello  " });

      const { currentLocaleDisplayValue }: UseLocalizedValue = useLocalizedValue(localizedText);

      expect(currentLocaleDisplayValue.value).toBe("Hello");
    });

    it("should return undefined when current locale value is missing.", () => {
      const localizedText = createFakeLocalizedText({ en: undefined });

      const { currentLocaleDisplayValue }: UseLocalizedValue = useLocalizedValue(localizedText);

      expect(currentLocaleDisplayValue.value).toBeUndefined();
    });

    it("should return undefined when current locale value is empty string.", () => {
      const localizedText = createFakeLocalizedText({ en: "" });

      const { currentLocaleDisplayValue }: UseLocalizedValue = useLocalizedValue(localizedText);

      expect(currentLocaleDisplayValue.value).toBeUndefined();
    });
  });

  describe("Reactivity", () => {
    it("should return display value for initial locale when locale is set to en.", () => {
      const localizedText = createFakeLocalizedText({ en: "English", fr: "Français" });

      const { currentLocaleDisplayValue }: UseLocalizedValue = useLocalizedValue(localizedText);

      expect(currentLocaleDisplayValue.value).toBe("English");
    });

    it("should return not missing for initial locale when locale is set to en.", () => {
      const localizedText = createFakeLocalizedText({ en: "English", fr: "Français" });

      const { isCurrentLocaleMissing }: UseLocalizedValue = useLocalizedValue(localizedText);

      expect(isCurrentLocaleMissing.value).toBeFalsy();
    });

    it("should return display value for new locale when locale changes to fr.", () => {
      const localizedText = createFakeLocalizedText({ en: "English", fr: "Français" });
      const { locale } = useI18n();

      const { currentLocaleDisplayValue }: UseLocalizedValue = useLocalizedValue(localizedText);

      locale.value = "fr";

      expect(currentLocaleDisplayValue.value).toBe("Français");
    });

    it("should return not missing for new locale when locale changes to fr.", () => {
      const localizedText = createFakeLocalizedText({ en: "English", fr: "Français" });
      const { locale } = useI18n();

      const { isCurrentLocaleMissing }: UseLocalizedValue = useLocalizedValue(localizedText);

      locale.value = "fr";

      expect(isCurrentLocaleMissing.value).toBeFalsy();
    });

    it("should return display value for en when partial localized text has en locale.", () => {
      const localizedText: Partial<LocalizedText> = { en: "English" };

      const { currentLocaleDisplayValue }: UseLocalizedValue = useLocalizedValue(localizedText);

      expect(currentLocaleDisplayValue.value).toBe("English");
    });

    it("should return not missing for en when partial localized text has en locale.", () => {
      const localizedText: Partial<LocalizedText> = { en: "English" };

      const { isCurrentLocaleMissing }: UseLocalizedValue = useLocalizedValue(localizedText);

      expect(isCurrentLocaleMissing.value).toBeFalsy();
    });

    it("should return undefined display value when locale changes to missing fr locale.", () => {
      const localizedText: Partial<LocalizedText> = { en: "English" };

      const { currentLocaleDisplayValue }: UseLocalizedValue = useLocalizedValue(localizedText);

      const { locale } = useI18n();
      locale.value = "fr";

      expect(currentLocaleDisplayValue.value).toBeUndefined();
    });

    it("should return missing when locale changes to missing fr locale.", () => {
      const localizedText: Partial<LocalizedText> = { en: "English" };

      const { isCurrentLocaleMissing }: UseLocalizedValue = useLocalizedValue(localizedText);

      const { locale } = useI18n();
      locale.value = "fr";

      expect(isCurrentLocaleMissing.value).toBeTruthy();
    });

    it("should return initial display value when ref input has initial value.", () => {
      const localizedTextReference = ref<Partial<LocalizedText>>({ en: "Initial" });

      const { currentLocaleDisplayValue }: UseLocalizedValue = useLocalizedValue(localizedTextReference);

      expect(currentLocaleDisplayValue.value).toBe("Initial");
    });

    it("should return updated display value when ref input changes.", () => {
      const localizedTextReference = ref<Partial<LocalizedText>>({ en: "Initial" });

      const { currentLocaleDisplayValue }: UseLocalizedValue = useLocalizedValue(localizedTextReference);

      localizedTextReference.value = { en: "Updated" };

      expect(currentLocaleDisplayValue.value).toBe("Updated");
    });
  });
});