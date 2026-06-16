import type { QuestionCategory, QuestionCognitiveDifficulty } from "@goat-it/schemas/question";

import { QUESTION_CATEGORY_UI_METADATA } from "~/composables/domain/question/constants/question-category.constants";
import { QUESTION_COGNITIVE_DIFFICULTY_UI_METADATA } from "~/composables/domain/question/constants/question-cognitive-difficulty.constants";
import type { QuestionCategoryUiMetadata, QuestionCognitiveDifficultyUiMetadata } from "~/composables/domain/question/types/question-ui-metadata.types";

function getQuestionCognitiveDifficultyUiMetadata(difficulty: QuestionCognitiveDifficulty): QuestionCognitiveDifficultyUiMetadata {
  return QUESTION_COGNITIVE_DIFFICULTY_UI_METADATA[difficulty];
}

function getQuestionCategoryUiMetadata(category: QuestionCategory): QuestionCategoryUiMetadata {
  return QUESTION_CATEGORY_UI_METADATA[category];
}

export {
  getQuestionCognitiveDifficultyUiMetadata,
  getQuestionCategoryUiMetadata,
};