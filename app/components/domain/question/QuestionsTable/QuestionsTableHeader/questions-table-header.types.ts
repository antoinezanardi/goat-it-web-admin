import type { QuestionCategory, QuestionCognitiveDifficulty, QuestionStatus } from "@goat-it/schemas/question";

type QuestionsTableFilters = {
  status: QuestionStatus | undefined;
  category: QuestionCategory | undefined;
  cognitiveDifficulty: QuestionCognitiveDifficulty | undefined;
};

type QuestionsTableHeaderProps = {
  searchTerm: string;
  filteredCount: number;
  activeFilterCount: number;
  isLoading: boolean;
  filters: QuestionsTableFilters;
};

type QuestionsTableHeaderEmits = {
  "startCreate": [];
  "update:searchTerm": [value: string];
  "update:filter": [filters: Partial<QuestionsTableFilters>];
  "clearFilters": [];
};

export type {
  QuestionsTableFilters,
  QuestionsTableHeaderProps,
  QuestionsTableHeaderEmits,
};