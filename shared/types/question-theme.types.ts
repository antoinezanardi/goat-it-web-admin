import type { AdminQuestionThemeDto } from "@goat-it/schemas/question-theme";

type QuestionTheme = Omit<AdminQuestionThemeDto, "createdAt" | "updatedAt"> & {
  createdAt: Date;
  updatedAt: Date;
};

export type {
  QuestionTheme,
};