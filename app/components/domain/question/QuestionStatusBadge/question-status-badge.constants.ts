import type { QuestionStatus } from "@goat-it/schemas/question";

const QUESTION_STATUS_COLOR_MAP = {
  active: "success",
  pending: "info",
  archived: "error",
  rejected: "error",
} as const satisfies Record<QuestionStatus, string>;

export { QUESTION_STATUS_COLOR_MAP };