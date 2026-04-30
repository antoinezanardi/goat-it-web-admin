import type { LocalizedText, LocalizedTexts } from "@goat-it/schemas/shared/locale";

type TranslationCompletenessIndicatorProperties = {
  requiredFields: (Partial<LocalizedText> | Partial<LocalizedTexts>)[];
};

export type { TranslationCompletenessIndicatorProperties };