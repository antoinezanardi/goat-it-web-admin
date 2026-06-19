type EditQuestionButtonProps = {
  questionId: string;
};

type EditQuestionButtonEmits = {
  startEdit: [id: string];
};

export type {
  EditQuestionButtonProps,
  EditQuestionButtonEmits,
};