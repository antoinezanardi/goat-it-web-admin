import type { QuestionCreationDto, QuestionModificationDto } from "@goat-it/schemas/question";

import type { QuestionFormMode } from "~/components/domain/question/QuestionFormModal/QuestionForm/question-form.types";

type QuestionFormModalProperties = {
  mode?: QuestionFormMode;
  question?: Question;
  isSubmitting?: boolean;
};

type QuestionFormModalEmits = {
  submitCreation: [data: QuestionCreationDto];
  submitModification: [data: QuestionModificationDto];
};

export type {
  QuestionFormModalProperties,
  QuestionFormModalEmits,
};