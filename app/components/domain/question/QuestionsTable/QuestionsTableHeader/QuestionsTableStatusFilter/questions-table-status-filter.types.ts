import type { QuestionStatus } from "@goat-it/schemas/question";

type QuestionsTableStatusFilterProperties = {
  modelValue: QuestionStatus | undefined;
};

type QuestionsTableStatusFilterEmits = {
  "update:modelValue": [value: QuestionStatus | undefined];
};

export type {
  QuestionsTableStatusFilterProperties as QuestionsTableStatusFilterProps,
  QuestionsTableStatusFilterEmits,
};