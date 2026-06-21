import type { QuestionThemeAssignmentCreationDto } from "@goat-it/schemas/question";

type QuestionThemeSelectorAssignmentProps = {
  assignment: QuestionThemeAssignmentCreationDto;
  theme: QuestionTheme | undefined;
  isPrimaryDisabled: boolean;
  isRemoveDisabled: boolean;
  isRemoveVisible: boolean;
  isHintDisabled: boolean;
};

type QuestionThemeSelectorAssignmentEmits = {
  setPrimary: [];
  toggleHint: [];
  remove: [];
};

export type { QuestionThemeSelectorAssignmentEmits, QuestionThemeSelectorAssignmentProps };