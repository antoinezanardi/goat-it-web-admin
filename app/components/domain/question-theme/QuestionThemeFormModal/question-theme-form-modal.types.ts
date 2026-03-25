import type { QuestionThemeCreationDto } from "@goat-it/schemas/question-theme";

type QuestionThemeFormModalEmits = {
  submitCreation: [data: QuestionThemeCreationDto];
};

export type {
  QuestionThemeFormModalEmits,
};