import type { QuestionThemeCreationDto, QuestionThemeModificationDto } from "@goat-it/schemas/question-theme";

type QuestionThemeFormMode = "create" | "edit";

type QuestionThemeFormProps = {
  mode?: QuestionThemeFormMode;
  questionTheme?: QuestionTheme;
  existingSlugs: string[];
};

type QuestionThemeFormEmits = {
  submitCreation: [data: QuestionThemeCreationDto];
  submitModification: [data: QuestionThemeModificationDto];
};

export type {
  QuestionThemeFormMode,
  QuestionThemeFormProps,
  QuestionThemeFormEmits,
};