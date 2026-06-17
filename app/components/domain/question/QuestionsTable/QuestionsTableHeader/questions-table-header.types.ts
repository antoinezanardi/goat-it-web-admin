import type { QuestionCategory, QuestionCognitiveDifficulty, QuestionStatus } from "@goat-it/schemas/question";

type QuestionsTableFilters = {
  status: QuestionStatus | undefined;
  category: QuestionCategory | undefined;
  cognitiveDifficulty: QuestionCognitiveDifficulty | undefined;
};

type QuestionsTableHeaderProperties = {
  searchTerm: string;
  activeFilterCount: number;
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
  QuestionsTableHeaderProperties as QuestionsTableHeaderProps,
  QuestionsTableHeaderEmits,
};