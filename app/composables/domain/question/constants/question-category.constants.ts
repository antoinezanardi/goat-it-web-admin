import type { QuestionCategory } from "@goat-it/schemas/question";

import type { QuestionCategoryUiMetadata } from "~/composables/domain/question/types/question-ui-metadata.types.ts";

const QUESTION_CATEGORY_UI_METADATA: Record<QuestionCategory, QuestionCategoryUiMetadata> = {
  trivia: {
    icon: "i-lucide-lightbulb",
    color: "secondary",
    labelKey: "questions.category.trivia",
  },
  lexicon: {
    icon: "i-lucide-book-open",
    color: "primary",
    labelKey: "questions.category.lexicon",
  },
  riddle: {
    icon: "i-lucide-puzzle",
    color: "warning",
    labelKey: "questions.category.riddle",
  },
  explanation: {
    icon: "i-lucide-message-circle",
    color: "info",
    labelKey: "questions.category.explanation",
  },
} as const;

export { QUESTION_CATEGORY_UI_METADATA };