type QuestionThemesTableActionsProperties = {
  questionTheme: Pick<QuestionTheme, "id" | "slug" | "status">;
};

type QuestionThemesTableActionsEmits = {
  startEdit: [id: string];
};

export type {
  QuestionThemesTableActionsProperties,
  QuestionThemesTableActionsEmits,
};