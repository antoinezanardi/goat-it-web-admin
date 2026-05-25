import type { QuestionThemeAssignmentCreationDto } from "@goat-it/schemas/question";

type QuestionThemeSelectorItemProperties = {
  assignment: QuestionThemeAssignmentCreationDto;
  theme: QuestionTheme | undefined;
  isPrimaryDisabled: boolean;
  isRemoveDisabled: boolean;
  isRemoveVisible: boolean;
  isHintDisabled: boolean;
};

type QuestionThemeSelectorItemEmits = {
  setPrimary: [];
  toggleHint: [];
  remove: [];
};

export type { QuestionThemeSelectorItemEmits, QuestionThemeSelectorItemProperties };