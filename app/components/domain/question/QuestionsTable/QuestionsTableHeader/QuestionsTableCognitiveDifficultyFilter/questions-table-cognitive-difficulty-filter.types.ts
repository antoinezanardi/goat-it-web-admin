import type { QuestionCognitiveDifficulty } from "@goat-it/schemas/question";

type QuestionsTableCognitiveDifficultyFilterProps = {
  modelValue: QuestionCognitiveDifficulty | undefined;
};

type QuestionsTableCognitiveDifficultyFilterEmits = {
  "update:modelValue": [value: QuestionCognitiveDifficulty | undefined];
};

export type {
  QuestionsTableCognitiveDifficultyFilterProps,
  QuestionsTableCognitiveDifficultyFilterEmits,
};