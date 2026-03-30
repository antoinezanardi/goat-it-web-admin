import type { QuestionThemeCreationDto } from "@goat-it/schemas/question-theme";

type QuestionThemeFormEmits = {
  submitCreation: [data: QuestionThemeCreationDto];
};

export type {
  QuestionThemeFormEmits,
};