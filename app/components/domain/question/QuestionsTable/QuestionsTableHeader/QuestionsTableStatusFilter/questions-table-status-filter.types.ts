import type { QuestionStatus } from "@goat-it/schemas/question";

type QuestionsTableStatusFilterProps = {
  modelValue: QuestionStatus | undefined;
};

type QuestionsTableStatusFilterEmits = {
  "update:modelValue": [value: QuestionStatus | undefined];
};

export type {
  QuestionsTableStatusFilterProps,
  QuestionsTableStatusFilterEmits,
};