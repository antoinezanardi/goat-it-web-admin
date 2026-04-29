import type { LocalizedText, LocalizedTexts } from "@goat-it/schemas/shared/locale";

type TranslationCompletenessPopoverContentProperties = {
  requiredFields: (LocalizedText | LocalizedTexts)[];
};

export type { TranslationCompletenessPopoverContentProperties };