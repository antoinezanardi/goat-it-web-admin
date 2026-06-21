import type { LocalizedText, LocalizedTexts } from "@goat-it/schemas/shared/locale";

type TranslationCompletenessIndicatorProps = {
  requiredFields: (Partial<LocalizedText> | Partial<LocalizedTexts>)[];
};

export type { TranslationCompletenessIndicatorProps };