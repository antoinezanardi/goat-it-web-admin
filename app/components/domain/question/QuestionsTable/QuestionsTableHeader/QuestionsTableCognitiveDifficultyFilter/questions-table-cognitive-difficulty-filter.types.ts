import type { QuestionCognitiveDifficulty } from "@goat-it/schemas/question";

type QuestionsTableCognitiveDifficultyFilterProperties = {
  modelValue: QuestionCognitiveDifficulty | undefined;
};

type QuestionsTableCognitiveDifficultyFilterEmits = {
  "update:modelValue": [value: QuestionCognitiveDifficulty | undefined];
};

export type {
  QuestionsTableCognitiveDifficultyFilterProperties as QuestionsTableCognitiveDifficultyFilterProps,
  QuestionsTableCognitiveDifficultyFilterEmits,
};