import type { QuestionThemeStatus } from "@goat-it/schemas/question-theme";

type QuestionThemesTableFilters = {
  status: QuestionThemeStatus | undefined;
};

type QuestionThemesTableHeaderProps = {
  searchTerm: string;
  filteredCount: number;
  activeFilterCount: number;
  isLoading: boolean;
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
  QuestionThemesTableHeaderProps,
  QuestionThemesTableHeaderEmits,
};