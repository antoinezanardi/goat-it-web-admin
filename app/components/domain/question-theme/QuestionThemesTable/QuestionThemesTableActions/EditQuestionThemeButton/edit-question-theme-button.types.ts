type EditQuestionThemeButtonProperties = {
  questionThemeId: string;
  questionThemeSlug: string;
};

type EditQuestionThemeButtonEmits = {
  startEdit: [id: string];
};

export type {
  EditQuestionThemeButtonProperties,
  EditQuestionThemeButtonEmits,
};