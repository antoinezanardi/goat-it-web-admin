import type { LocalizedText, LocalizedTexts } from "@goat-it/schemas/shared/locale";

type TranslationCompletenessPopoverContentProperties = {
  requiredFields: (Partial<LocalizedText> | Partial<LocalizedTexts>)[];
};

export type { TranslationCompletenessPopoverContentProperties };