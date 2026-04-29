import type { LocalizedTexts } from "@goat-it/schemas/shared/locale";

type QuestionThemeAliasesListProperties = {
  aliases?: string[];
  localizedTexts?: Partial<LocalizedTexts>;
};

export type {
  QuestionThemeAliasesListProperties,
};