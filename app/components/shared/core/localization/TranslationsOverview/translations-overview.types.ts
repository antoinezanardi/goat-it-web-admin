import type { LocalizedText, LocalizedTexts } from "@goat-it/schemas/shared/locale";

type TranslationsOverviewProperties = {
  localizedText?: Partial<LocalizedText>;
  localizedTexts?: Partial<LocalizedTexts>;
  hideHeader?: boolean;
};

export type { TranslationsOverviewProperties };