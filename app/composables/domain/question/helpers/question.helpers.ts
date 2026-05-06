import type { QuestionCategory, QuestionCognitiveDifficulty } from "@goat-it/schemas/question";

import { QUESTION_CATEGORY_UI_METADATA } from "~/composables/domain/question/constants/question-category.constants";
import { QUESTION_DIFFICULTY_UI_METADATA } from "~/composables/domain/question/constants/question-cognitive-difficulty.constants.ts";
import type { QuestionCategoryUiMetadata, QuestionCognitiveDifficultyUiMetadata } from "~/composables/domain/question/types/question-ui-metadata.types";

function getDifficultyUiMetadata(difficulty: QuestionCognitiveDifficulty): QuestionCognitiveDifficultyUiMetadata {
  return QUESTION_DIFFICULTY_UI_METADATA[difficulty];
}

function getCategoryUiMetadata(category: QuestionCategory): QuestionCategoryUiMetadata {
  return QUESTION_CATEGORY_UI_METADATA[category];
}

export { getDifficultyUiMetadata, getCategoryUiMetadata };