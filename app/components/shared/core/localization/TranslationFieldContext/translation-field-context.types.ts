import type { LocalizedText, LocalizedTexts } from "@goat-it/schemas/shared/locale";

type TranslationFieldContextBaseProps = {
  label: string;
};

type TranslationFieldContextProps = TranslationFieldContextBaseProps & (
  | { localizedText: Partial<LocalizedText>; localizedTexts?: never } |
  { localizedText?: never; localizedTexts: Partial<LocalizedTexts> }
);

export type { TranslationFieldContextProps };