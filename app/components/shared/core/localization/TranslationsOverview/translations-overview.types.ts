import type { LocalizedText, LocalizedTexts } from "@goat-it/schemas/shared/locale";

type TranslationsOverviewBaseProps = {
  hideHeader?: boolean;
};

type TranslationsOverviewProps = TranslationsOverviewBaseProps & (
  | { localizedText: Partial<LocalizedText>; localizedTexts?: never } |
  { localizedText?: never; localizedTexts: Partial<LocalizedTexts> } |
  { localizedText?: never; localizedTexts?: never }
);

export type { TranslationsOverviewProps };