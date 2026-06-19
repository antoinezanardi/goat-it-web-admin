import type { QuestionThemeCreationDto, QuestionThemeModificationDto } from "@goat-it/schemas/question-theme";

import type { QuestionThemeFormMode } from "~/components/domain/question-theme/QuestionThemeFormModal/QuestionThemeForm/question-theme-form.types";

type QuestionThemeFormModalProps = {
  mode?: QuestionThemeFormMode;
  questionTheme?: QuestionTheme;
  isSubmitting?: boolean;
  existingSlugs: string[];
};

type QuestionThemeFormModalEmits = {
  submitCreation: [data: QuestionThemeCreationDto];
  submitModification: [data: QuestionThemeModificationDto];
};

export type {
  QuestionThemeFormModalProps,
  QuestionThemeFormModalEmits,
};