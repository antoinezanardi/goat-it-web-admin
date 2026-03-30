import type { QuestionThemeCreationDto } from "@goat-it/schemas/question-theme";

type QuestionThemeFormModalProperties = {
  isCreating?: boolean;
};

type QuestionThemeFormModalEmits = {
  submitCreation: [data: QuestionThemeCreationDto];
};

export type {
  QuestionThemeFormModalProperties,
  QuestionThemeFormModalEmits,
};