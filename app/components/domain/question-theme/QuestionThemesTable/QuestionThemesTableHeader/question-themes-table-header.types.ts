import type { QuestionThemeStatus } from "@goat-it/schemas/question-theme";

type QuestionThemesTableFilters = {
  status: QuestionThemeStatus | undefined;
};

type QuestionThemesTableHeaderProperties = {
  searchTerm: string;
  activeFilterCount: number;
  filters: QuestionThemesTableFilters;
};

type QuestionThemesTableHeaderEmits = {
  "startCreate": [];
  "update:searchTerm": [value: string];
  "update:filter": [filters: Partial<QuestionThemesTableFilters>];
  "clearFilters": [];
};

export type {
  QuestionThemesTableFilters,
  QuestionThemesTableHeaderProperties as QuestionThemesTableHeaderProps,
  QuestionThemesTableHeaderEmits,
};