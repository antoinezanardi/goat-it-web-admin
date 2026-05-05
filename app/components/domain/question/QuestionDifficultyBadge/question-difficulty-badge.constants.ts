import type { QuestionCognitiveDifficulty } from "@goat-it/schemas/question";

const QUESTION_DIFFICULTY_ICON_MAP = {
  easy: "i-lucide-brain",
  medium: "i-lucide-brain-cog",
  hard: "i-lucide-brain-circuit",
} as const satisfies Record<QuestionCognitiveDifficulty, string>;

const QUESTION_DIFFICULTY_COLOR_MAP = {
  easy: "success",
  medium: "warning",
  hard: "error",
} as const satisfies Record<QuestionCognitiveDifficulty, string>;

export {
  QUESTION_DIFFICULTY_ICON_MAP,
  QUESTION_DIFFICULTY_COLOR_MAP,
};