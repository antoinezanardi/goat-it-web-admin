import type { LocalizedText, LocalizedTexts } from "@goat-it/schemas/shared/locale";

type TranslationsOverviewProperties = {
  localizedText?: Partial<LocalizedText>;
  localizedTexts?: Partial<LocalizedTexts>;
};

export type { TranslationsOverviewProperties };