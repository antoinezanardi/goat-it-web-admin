import type { QuestionCognitiveDifficulty } from "@goat-it/schemas/question";

import type { QuestionCognitiveDifficultyUiMetadata } from "~/composables/domain/question/types/question-ui-metadata.types";

type QuestionDifficultySelectorItem = {
  value: QuestionCognitiveDifficulty;
} & QuestionCognitiveDifficultyUiMetadata;

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