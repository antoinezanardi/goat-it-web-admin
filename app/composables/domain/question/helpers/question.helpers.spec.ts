import type { QuestionCategory, QuestionCognitiveDifficulty } from "@goat-it/schemas/question";
import { describe, it, expect } from "vitest";

import { QUESTION_CATEGORY_UI_METADATA } from "@/composables/domain/question/constants/question-category.constants";
import { QUESTION_COGNITIVE_DIFFICULTY_UI_METADATA } from "@/composables/domain/question/constants/question-cognitive-difficulty.constants";
import { getQuestionCategoryUiMetadata, getQuestionCognitiveDifficultyUiMetadata } from "@/composables/domain/question/helpers/question.helpers";
import type { QuestionCategoryUiMetadata, QuestionCognitiveDifficultyUiMetadata } from "@/composables/domain/question/types/question-ui-metadata.types";

describe(getQuestionCognitiveDifficultyUiMetadata, () => {
  describe(getQuestionCognitiveDifficultyUiMetadata, () => {
    it.each<{ difficulty: QuestionCognitiveDifficulty; expected: QuestionCognitiveDifficultyUiMetadata }>([
      {
        difficulty: "easy",
        expected: QUESTION_COGNITIVE_DIFFICULTY_UI_METADATA.easy,
      },
      {
        difficulty: "medium",
        expected: QUESTION_COGNITIVE_DIFFICULTY_UI_METADATA.medium,
      },
      {
        difficulty: "hard",
        expected: QUESTION_COGNITIVE_DIFFICULTY_UI_METADATA.hard,
      },
    ])("should return $difficulty difficulty ui metadata when difficulty is $difficulty.", ({
      difficulty,
      expected,
    }) => {
      expect(getQuestionCognitiveDifficultyUiMetadata(difficulty)).toStrictEqual(expected);
    });
  });

  describe(getQuestionCategoryUiMetadata, () => {
    it.each<{ category: QuestionCategory; expected: QuestionCategoryUiMetadata }>([
      {
        category: "trivia",
        expected: QUESTION_CATEGORY_UI_METADATA.trivia,
      },
      {
        category: "lexicon",
        expected: QUESTION_CATEGORY_UI_METADATA.lexicon,
      },
      {
        category: "riddle",
        expected: QUESTION_CATEGORY_UI_METADATA.riddle,
      },
      {
        category: "explanation",
        expected: QUESTION_CATEGORY_UI_METADATA.explanation,
      },
    ])("should return $category category ui metadata when category is $category.", ({
      category,
      expected,
    }) => {
      expect(getQuestionCategoryUiMetadata(category)).toStrictEqual(expected);
    });
  });
});