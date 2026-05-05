import type { QuestionCategory } from "@goat-it/schemas/question";

const QUESTION_CATEGORY_ICON_MAP = {
  trivia: "i-lucide-lightbulb",
  lexicon: "i-lucide-book-open",
  riddle: "i-lucide-puzzle",
  explanation: "i-lucide-message-circle",
} as const satisfies Record<QuestionCategory, string>;

const QUESTION_CATEGORY_COLOR_MAP = {
  trivia: "secondary",
  lexicon: "primary",
  riddle: "warning",
  explanation: "info",
} as const satisfies Record<QuestionCategory, string>;

export {
  QUESTION_CATEGORY_ICON_MAP,
  QUESTION_CATEGORY_COLOR_MAP,
};