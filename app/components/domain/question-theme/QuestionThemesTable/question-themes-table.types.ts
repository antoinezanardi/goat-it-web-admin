import type { GlobalFilterOptions } from "@tanstack/vue-table";

type QuestionThemesTableEmits = {
  startCreate: [];
  startEdit: [id: string];
};

type QuestionThemesTableGlobalFilterOptions = Omit<GlobalFilterOptions<QuestionTheme>, "onGlobalFilterChange">;

export type {
  QuestionThemesTableEmits,
  QuestionThemesTableGlobalFilterOptions,
};