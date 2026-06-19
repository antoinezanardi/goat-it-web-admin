import type { QuestionThemeAssignmentCreationDto, QuestionThemeAssignmentModificationDto } from "@goat-it/schemas/question";

import type { QuestionFormMode } from "~/components/domain/question/QuestionFormModal/QuestionForm/question-form.types";

type QuestionThemeSelectorProps = {
  modelValue: QuestionThemeAssignmentCreationDto[];
  availableThemes: QuestionTheme[];
  disabled?: boolean;
  mode?: QuestionFormMode;
  isSubmitting?: boolean;
};

type QuestionThemeSelectorEmits = {
  "update:modelValue": [value: QuestionThemeAssignmentCreationDto[]];
  "assignThemeInEditMode": [dto: QuestionThemeAssignmentCreationDto];
  "removeThemeInEditMode": [themeId: string];
  "modifyThemeInEditMode": [themeId: string, dto: QuestionThemeAssignmentModificationDto];
};

export type {
  QuestionThemeSelectorProps,
  QuestionThemeSelectorEmits,
};