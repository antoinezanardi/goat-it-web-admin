import type { AdminQuestionDto, QuestionCreationDto, QuestionThemeAssignmentCreationDto } from "@goat-it/schemas/question";

import type { Shell } from "#shared/types/object.types";
import type { QuestionTheme } from "#shared/types/question-theme.types";

type AdminQuestionThemeAssignmentDto = AdminQuestionDto["themes"][number];

type AdminQuestionContentDto = AdminQuestionDto["content"];

type AdminQuestionAuthorDto = AdminQuestionDto["author"];

type AdminQuestionRejectionDto = NonNullable<AdminQuestionDto["rejection"]>;

type QuestionContent = AdminQuestionContentDto;

type QuestionAuthor = AdminQuestionAuthorDto;

type QuestionRejection = AdminQuestionRejectionDto;

type QuestionThemeAssignment = Omit<AdminQuestionThemeAssignmentDto, "theme"> & {
  theme: QuestionTheme;
};

type Question = Omit<AdminQuestionDto, "createdAt" | "updatedAt" | "themes"> & {
  themes: QuestionThemeAssignment[];
  createdAt: Date;
  updatedAt: Date;
};

type QuestionCreationDtoShell = Shell<QuestionCreationDto> & {
  themes: QuestionThemeAssignmentCreationDto[];
  sourceUrls: string[];
};

export type {
  AdminQuestionThemeAssignmentDto,
  AdminQuestionContentDto,
  AdminQuestionAuthorDto,
  AdminQuestionRejectionDto,
  Question,
  QuestionContent,
  QuestionAuthor,
  QuestionRejection,
  QuestionThemeAssignment,
  QuestionCreationDtoShell,
};