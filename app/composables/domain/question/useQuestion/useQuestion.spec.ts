import type { QuestionCategory, QuestionCognitiveDifficulty } from "@goat-it/schemas/question";
import { describe, expect, it } from "vitest";

import type { QuestionCategoryUiMetadata, QuestionCognitiveDifficultyUiMetadata } from "~/composables/domain/question/types/question-ui-metadata.types.ts";
import { useQuestion } from "~/composables/domain/question/useQuestion/useQuestion";

describe(useQuestion, () => {
  describe("getDifficultyUiMetadata", () => {
    it.each<{
      difficulty: QuestionCognitiveDifficulty;
      expectedMetadata: QuestionCognitiveDifficultyUiMetadata;
    }>([
      {
        difficulty: "easy",
        expectedMetadata: {
          icon: "i-lucide-brain",
          color: "success",
          labelKey: "questions.difficulty.easy",
        },
      },
      {
        difficulty: "medium",
        expectedMetadata: {
          icon: "i-lucide-brain-cog",
          color: "warning",
          labelKey: "questions.difficulty.medium",
        },
      },
      {
        difficulty: "hard",
        expectedMetadata: {
          icon: "i-lucide-brain-circuit",
          color: "error",
          labelKey: "questions.difficulty.hard",
        },
      },
    ])("should return correct UI metadata when difficulty is $difficulty.", ({
      difficulty,
      expectedMetadata,
    }) => {
      const { getDifficultyUiMetadata } = useQuestion();

      const metadata = getDifficultyUiMetadata(difficulty);

      expect(metadata).toStrictEqual(expectedMetadata);
    });
  });

  describe("getCategoryUiMetadata", () => {
    it.each<{
      category: QuestionCategory;
      expectedMetadata: QuestionCategoryUiMetadata;
    }>([
      {
        category: "trivia",
        expectedMetadata: {
          icon: "i-lucide-lightbulb",
          color: "secondary",
          labelKey: "questions.category.trivia",
        },
      },
      {
        category: "lexicon",
        expectedMetadata: {
          icon: "i-lucide-book-open",
          color: "primary",
          labelKey: "questions.category.lexicon",
        },
      },
      {
        category: "riddle",
        expectedMetadata: {
          icon: "i-lucide-puzzle",
          color: "warning",
          labelKey: "questions.category.riddle",
        },
      },
      {
        category: "explanation",
        expectedMetadata: {
          icon: "i-lucide-message-circle",
          color: "info",
          labelKey: "questions.category.explanation",
        },
      },
    ])("should return correct UI metadata when category is $category.", ({
      category,
      expectedMetadata,
    }) => {
      const { getCategoryUiMetadata } = useQuestion();

      const metadata = getCategoryUiMetadata(category);

      expect(metadata).toStrictEqual(expectedMetadata);
    });
  });
});