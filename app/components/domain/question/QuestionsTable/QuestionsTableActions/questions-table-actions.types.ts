import type { Question } from "#shared/types/question.types";

type QuestionsTableActionsProperties = {
  question: Pick<Question, "id" | "status">;
};

type QuestionsTableActionsEmits = {
  startEdit: [id: string];
};

export type { QuestionsTableActionsProperties, QuestionsTableActionsEmits };