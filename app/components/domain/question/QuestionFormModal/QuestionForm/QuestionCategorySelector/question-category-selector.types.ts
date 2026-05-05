import type { QuestionCategory } from "@goat-it/schemas/question";

import type { QuestionCategoryUiMetadata } from "~/composables/domain/question/types/question-category-ui-metadata.types";

type QuestionCategorySelectorItem = {
  value: QuestionCategory;
  label: string;
} & QuestionCategoryUiMetadata;

type QuestionCategorySelectorProperties = {
  modelValue?: QuestionCategory;
};

type QuestionCategorySelectorEmits = {
  "update:modelValue": [value: QuestionCategory];
};

export type {
  QuestionCategorySelectorItem,
  QuestionCategorySelectorProperties,
  QuestionCategorySelectorEmits,
};