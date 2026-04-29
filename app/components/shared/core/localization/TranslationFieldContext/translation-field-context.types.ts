import type { LocalizedText, LocalizedTexts } from "@goat-it/schemas/shared/locale";

type TranslationFieldContextProperties = {
  localizedText?: Partial<LocalizedText>;
  localizedTexts?: Partial<LocalizedTexts>;
  label: string;
};

export type { TranslationFieldContextProperties };