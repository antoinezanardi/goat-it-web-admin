import type { QuestionCognitiveDifficulty } from "@goat-it/schemas/question";

import type { QuestionDifficultyUiMetadata } from "~/composables/domain/question/types/question-difficulty-ui-metadata.types";

const QUESTION_DIFFICULTY_UI_METADATA: Record<QuestionCognitiveDifficulty, QuestionDifficultyUiMetadata> = {
  easy: { icon: "i-lucide-brain", color: "success", labelKey: "questions.difficulty.easy" },
  medium: { icon: "i-lucide-brain-cog", color: "warning", labelKey: "questions.difficulty.medium" },
  hard: { icon: "i-lucide-brain-circuit", color: "error", labelKey: "questions.difficulty.hard" },
} as const;

export { QUESTION_DIFFICULTY_UI_METADATA };