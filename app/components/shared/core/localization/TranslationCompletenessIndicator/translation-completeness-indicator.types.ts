import type { LocalizedText, LocalizedTexts } from "@goat-it/schemas/shared/locale";

type TranslationCompletenessIndicatorProperties = {
  requiredFields: (LocalizedText | LocalizedTexts)[];
};

export type { TranslationCompletenessIndicatorProperties };