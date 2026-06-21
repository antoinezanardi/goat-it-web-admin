import type { QuestionCategory } from "@goat-it/schemas/question";

import type { QuestionCategoryUiMetadata } from "~/composables/domain/question/types/question-ui-metadata.types.ts";

type QuestionCategorySelectorItem = {
  value: QuestionCategory;
  label: string;
  icon: QuestionCategoryUiMetadata["icon"];
};

type QuestionCategorySelectorProps = {
  modelValue?: QuestionCategory;
};

type QuestionCategorySelectorEmits = {
  "update:modelValue": [value: QuestionCategory];
};

export type {
  QuestionCategorySelectorItem,
  QuestionCategorySelectorProps,
  QuestionCategorySelectorEmits,
};