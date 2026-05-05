import type { Question } from "#shared/types/question.types";

type QuestionsTableActionsProperties = {
  question: Pick<Question, "id" | "status">;
};

export type { QuestionsTableActionsProperties };