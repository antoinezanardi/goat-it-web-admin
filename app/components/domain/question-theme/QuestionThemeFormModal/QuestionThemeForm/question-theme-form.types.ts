import type { QuestionThemeCreationDto } from "@goat-it/schemas/question-theme";

type QuestionThemeFormProperties = {
  existingSlugs: string[];
};

type QuestionThemeFormEmits = {
  submitCreation: [data: QuestionThemeCreationDto];
};

export type {
  QuestionThemeFormProperties,
  QuestionThemeFormEmits,
};