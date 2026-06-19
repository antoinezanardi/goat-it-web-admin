import type { Question } from "#shared/types/question.types";

type QuestionsTableActionsProps = {
  question: Pick<Question, "id" | "status">;
};

type QuestionsTableActionsEmits = {
  startEdit: [id: string];
};

export type { QuestionsTableActionsProps, QuestionsTableActionsEmits };