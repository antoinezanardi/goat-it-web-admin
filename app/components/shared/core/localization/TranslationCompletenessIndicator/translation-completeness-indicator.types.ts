import type { Locale, LocalizedText, LocalizedTexts } from "@goat-it/schemas/shared/locale";

type TranslationCompletenessIndicatorProps = {
  requiredFields: (Partial<LocalizedText> | Partial<LocalizedTexts> | undefined)[];
  applicableLocales?: Locale[];
};

export type { TranslationCompletenessIndicatorProps };