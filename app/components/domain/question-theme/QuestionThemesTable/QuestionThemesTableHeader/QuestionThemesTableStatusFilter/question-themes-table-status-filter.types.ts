import type { QuestionThemeStatus } from "@goat-it/schemas/question-theme";

type QuestionThemesTableStatusFilterProperties = {
  modelValue: QuestionThemeStatus | undefined;
};

type QuestionThemesTableStatusFilterEmits = {
  "update:modelValue": [value: QuestionThemeStatus | undefined];
};

export type {
  QuestionThemesTableStatusFilterProperties as QuestionThemesTableStatusFilterProps,
  QuestionThemesTableStatusFilterEmits,
};