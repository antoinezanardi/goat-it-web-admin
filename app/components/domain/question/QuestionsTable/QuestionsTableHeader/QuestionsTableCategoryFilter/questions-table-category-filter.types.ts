import type { QuestionCategory } from "@goat-it/schemas/question";

type QuestionsTableCategoryFilterProperties = {
  modelValue: QuestionCategory | undefined;
};

type QuestionsTableCategoryFilterEmits = {
  "update:modelValue": [value: QuestionCategory | undefined];
};

export type {
  QuestionsTableCategoryFilterProperties as QuestionsTableCategoryFilterProps,
  QuestionsTableCategoryFilterEmits,
};