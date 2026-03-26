import type { AdminQuestionThemeDto, QuestionThemeCreationDto } from "@goat-it/schemas/question-theme";

import type { Shell } from "#shared/types/object.types";

type QuestionTheme = Omit<AdminQuestionThemeDto, "createdAt" | "updatedAt"> & {
  createdAt: Date;
  updatedAt: Date;
};

type QuestionThemeCreationDtoShell = Shell<QuestionThemeCreationDto>;

export type {
  QuestionTheme,
  QuestionThemeCreationDtoShell,
};