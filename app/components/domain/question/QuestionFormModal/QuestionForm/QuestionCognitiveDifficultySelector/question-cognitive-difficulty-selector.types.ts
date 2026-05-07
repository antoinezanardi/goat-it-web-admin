import type { QuestionCognitiveDifficulty } from "@goat-it/schemas/question";

import type { QuestionCognitiveDifficultyUiMetadata } from "~/composables/domain/question/types/question-ui-metadata.types";

type QuestionCognitiveDifficultySelectorItem = {
  value: QuestionCognitiveDifficulty;
} & QuestionCognitiveDifficultyUiMetadata;

type QuestionCognitiveDifficultySelectorProperties = {
  modelValue?: QuestionCognitiveDifficulty;
};

type QuestionCognitiveDifficultySelectorEmits = {
  "update:modelValue": [value: QuestionCognitiveDifficulty];
};

export type {
  QuestionCognitiveDifficultySelectorItem,
  QuestionCognitiveDifficultySelectorProperties,
  QuestionCognitiveDifficultySelectorEmits,
};