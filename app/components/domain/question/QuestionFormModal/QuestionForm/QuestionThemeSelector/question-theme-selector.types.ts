import type { QuestionThemeAssignmentCreationDto } from "@goat-it/schemas/question";

type QuestionThemeSelectorProperties = {
  modelValue: QuestionThemeAssignmentCreationDto[];
  availableThemes: QuestionTheme[];
};

type QuestionThemeSelectorEmits = {
  "update:modelValue": [value: QuestionThemeAssignmentCreationDto[]];
};

export type {
  QuestionThemeSelectorProperties,
  QuestionThemeSelectorEmits,
};