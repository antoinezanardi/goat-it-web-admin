import type { Locale, LocalizedText, LocalizedTexts } from "@goat-it/schemas/shared/locale";

type TranslationCompletenessPopoverContentProps = {
  requiredFields: (Partial<LocalizedText> | Partial<LocalizedTexts> | undefined)[];
  applicableLocales?: Locale[];
};

export type { TranslationCompletenessPopoverContentProps };