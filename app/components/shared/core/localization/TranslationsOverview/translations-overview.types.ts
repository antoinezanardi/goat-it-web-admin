import type { LocalizedText, LocalizedTexts } from "@goat-it/schemas/shared/locale";

type TranslationsOverviewBaseProperties = {
  hideHeader?: boolean;
};

type TranslationsOverviewProperties = TranslationsOverviewBaseProperties & (
  | { localizedText: Partial<LocalizedText>; localizedTexts?: never } |
  { localizedText?: never; localizedTexts: Partial<LocalizedTexts> } |
  { localizedText?: never; localizedTexts?: never }
);

export type { TranslationsOverviewProperties };