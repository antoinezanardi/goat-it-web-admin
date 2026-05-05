import type { QuestionCognitiveDifficulty } from "@goat-it/schemas/question";

import type { QuestionDifficultyUiMetadata } from "~/composables/domain/question/types/question-difficulty-ui-metadata.types";

type QuestionDifficultySelectorItem = {
  value: QuestionCognitiveDifficulty;
} & QuestionDifficultyUiMetadata;

type QuestionDifficultySelectorProperties = {
  modelValue?: QuestionCognitiveDifficulty;
};

type QuestionDifficultySelectorEmits = {
  "update:modelValue": [value: QuestionCognitiveDifficulty];
};

export type {
  QuestionDifficultySelectorItem,
  QuestionDifficultySelectorProperties,
  QuestionDifficultySelectorEmits,
};