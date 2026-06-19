type EditQuestionThemeButtonProps = {
  questionThemeId: string;
  questionThemeSlug: string;
};

type EditQuestionThemeButtonEmits = {
  startEdit: [id: string];
};

export type {
  EditQuestionThemeButtonProps,
  EditQuestionThemeButtonEmits,
};