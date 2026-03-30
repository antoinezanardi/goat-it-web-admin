import type { LocalizedText } from "@goat-it/schemas/shared/locale";

type QuestionThemesTableEmits = {
  startCreate: [];
};

type QuestionThemesTableRow = {
  id: QuestionTheme["id"];
  slug: QuestionTheme["slug"];
  label: Partial<LocalizedText>;
  description: Partial<LocalizedText>;
  aliases?: string[];
  status: QuestionTheme["status"];
};

export type {
  QuestionThemesTableEmits,
  QuestionThemesTableRow,
};