import type { QuestionCognitiveDifficulty } from "@goat-it/schemas/question";

import type { QuestionCognitiveDifficultyUiMetadata } from "~/composables/domain/question/types/question-ui-metadata.types.ts";

const QUESTION_COGNITIVE_DIFFICULTY_UI_METADATA: Record<QuestionCognitiveDifficulty, QuestionCognitiveDifficultyUiMetadata> = {
  easy: {
    icon: "i-lucide-brain",
    color: "success",
    labelKey: "questions.difficulty.easy",
  },
  medium: {
    icon: "i-lucide-brain-cog",
    color: "warning",
    labelKey: "questions.difficulty.medium",
  },
  hard: {
    icon: "i-lucide-brain-circuit",
    color: "error",
    labelKey: "questions.difficulty.hard",
  },
} as const;

export { QUESTION_COGNITIVE_DIFFICULTY_UI_METADATA };