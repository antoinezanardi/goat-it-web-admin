import type { LocalizedText, LocalizedTexts } from "@goat-it/schemas/shared/locale";

type TranslationCompletenessPopoverContentProps = {
  requiredFields: (Partial<LocalizedText> | Partial<LocalizedTexts>)[];
};

export type { TranslationCompletenessPopoverContentProps };