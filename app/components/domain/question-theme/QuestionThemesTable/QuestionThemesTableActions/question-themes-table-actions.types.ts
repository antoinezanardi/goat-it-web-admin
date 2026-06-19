type QuestionThemesTableActionsProps = {
  questionTheme: Pick<QuestionTheme, "id" | "slug" | "status">;
};

type QuestionThemesTableActionsEmits = {
  startEdit: [id: string];
};

export type {
  QuestionThemesTableActionsProps,
  QuestionThemesTableActionsEmits,
};