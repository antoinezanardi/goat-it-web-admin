import type { LocalizedText } from "@goat-it/schemas/shared/locale";
import type { GlobalFilterOptions } from "@tanstack/vue-table";

type QuestionThemesTableEmits = {
  startCreate: [];
  startEdit: [id: string];
};

type QuestionThemesTableRow = {
  id: QuestionTheme["id"];
  slug: QuestionTheme["slug"];
  color: QuestionTheme["color"];
  label: Partial<LocalizedText>;
  description: Partial<LocalizedText>;
  aliases?: string[];
  status: QuestionTheme["status"];
  questionTheme: QuestionTheme;
};

type QuestionThemesTableGlobalFilterOptions = Omit<GlobalFilterOptions<QuestionThemesTableRow>, "onGlobalFilterChange">;

export type {
  QuestionThemesTableEmits,
  QuestionThemesTableGlobalFilterOptions,
  QuestionThemesTableRow,
};