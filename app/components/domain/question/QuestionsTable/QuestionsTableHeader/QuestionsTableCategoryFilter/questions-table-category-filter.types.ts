import type { QuestionCategory } from "@goat-it/schemas/question";

type QuestionsTableCategoryFilterProps = {
  modelValue: QuestionCategory | undefined;
};

type QuestionsTableCategoryFilterEmits = {
  "update:modelValue": [value: QuestionCategory | undefined];
};

export type {
  QuestionsTableCategoryFilterProps,
  QuestionsTableCategoryFilterEmits,
};