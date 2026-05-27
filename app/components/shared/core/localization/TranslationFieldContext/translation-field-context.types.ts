import type { LocalizedText, LocalizedTexts } from "@goat-it/schemas/shared/locale";

type TranslationFieldContextBaseProperties = {
  label: string;
};

type TranslationFieldContextProperties = TranslationFieldContextBaseProperties & (
  | { localizedText: Partial<LocalizedText>; localizedTexts?: never } |
  { localizedText?: never; localizedTexts: Partial<LocalizedTexts> }
);

export type { TranslationFieldContextProperties };