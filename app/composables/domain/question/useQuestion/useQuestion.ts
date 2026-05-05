import type { QuestionCategory, QuestionCognitiveDifficulty } from "@goat-it/schemas/question";

import { QUESTION_CATEGORY_UI_METADATA } from "~/composables/domain/question/constants/question-category.constants";
import { QUESTION_DIFFICULTY_UI_METADATA } from "~/composables/domain/question/constants/question-difficulty.constants";
import type { QuestionCategoryUiMetadata } from "~/composables/domain/question/types/question-category-ui-metadata.types";
import type { QuestionDifficultyUiMetadata } from "~/composables/domain/question/types/question-difficulty-ui-metadata.types";

type UseQuestion = {
  getDifficultyUiMetadata: (difficulty: QuestionCognitiveDifficulty) => QuestionDifficultyUiMetadata;
  getCategoryUiMetadata: (category: QuestionCategory) => QuestionCategoryUiMetadata;
};

function useQuestion(): UseQuestion {
  function getDifficultyUiMetadata(difficulty: QuestionCognitiveDifficulty): QuestionDifficultyUiMetadata {
    return QUESTION_DIFFICULTY_UI_METADATA[difficulty];
  }

  function getCategoryUiMetadata(category: QuestionCategory): QuestionCategoryUiMetadata {
    return QUESTION_CATEGORY_UI_METADATA[category];
  }

  return { getDifficultyUiMetadata, getCategoryUiMetadata };
}

export type { UseQuestion };

export { useQuestion };