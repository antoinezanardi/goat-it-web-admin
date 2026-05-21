type EditQuestionButtonProperties = {
  questionId: string;
};

type EditQuestionButtonEmits = {
  startEdit: [id: string];
};

export type {
  EditQuestionButtonProperties,
  EditQuestionButtonEmits,
};