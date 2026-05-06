import type { QuestionCreationDto, QuestionModificationDto } from "@goat-it/schemas/question";

import type { Question } from "#shared/types/question.types";
import type { QuestionTheme } from "#shared/types/question-theme.types";

type QuestionFormMode = "create" | "edit";

type QuestionFormProperties = {
  mode?: QuestionFormMode;
  question?: Question;
  availableThemes: QuestionTheme[];
};

type QuestionFormEmits = {
  submitCreation: [data: QuestionCreationDto];
  submitModification: [data: QuestionModificationDto];
};

export type {
  QuestionFormMode,
  QuestionFormProperties,
  QuestionFormEmits,
};