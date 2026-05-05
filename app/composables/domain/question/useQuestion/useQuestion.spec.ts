import { describe, expect, it } from "vitest";

import { useQuestion } from "~/composables/domain/question/useQuestion/useQuestion";

describe(useQuestion, () => {
  describe("getDifficultyUiMetadata", () => {
    it("should return correct UI metadata for easy difficulty.", () => {
      const { getDifficultyUiMetadata } = useQuestion();

      const metadata = getDifficultyUiMetadata("easy");

      expect(metadata).toStrictEqual({ icon: "i-lucide-brain", color: "success", labelKey: "questions.difficulty.easy" });
    });

    it("should return correct UI metadata for medium difficulty.", () => {
      const { getDifficultyUiMetadata } = useQuestion();

      const metadata = getDifficultyUiMetadata("medium");

      expect(metadata).toStrictEqual({ icon: "i-lucide-brain-cog", color: "warning", labelKey: "questions.difficulty.medium" });
    });

    it("should return correct UI metadata for hard difficulty.", () => {
      const { getDifficultyUiMetadata } = useQuestion();

      const metadata = getDifficultyUiMetadata("hard");

      expect(metadata).toStrictEqual({ icon: "i-lucide-brain-circuit", color: "error", labelKey: "questions.difficulty.hard" });
    });
  });

  describe("getCategoryUiMetadata", () => {
    it("should return correct UI metadata for trivia category.", () => {
      const { getCategoryUiMetadata } = useQuestion();

      const metadata = getCategoryUiMetadata("trivia");

      expect(metadata).toStrictEqual({ icon: "i-lucide-lightbulb", color: "secondary", labelKey: "questions.category.trivia" });
    });

    it("should return correct UI metadata for lexicon category.", () => {
      const { getCategoryUiMetadata } = useQuestion();

      const metadata = getCategoryUiMetadata("lexicon");

      expect(metadata).toStrictEqual({ icon: "i-lucide-book-open", color: "primary", labelKey: "questions.category.lexicon" });
    });

    it("should return correct UI metadata for riddle category.", () => {
      const { getCategoryUiMetadata } = useQuestion();

      const metadata = getCategoryUiMetadata("riddle");

      expect(metadata).toStrictEqual({ icon: "i-lucide-puzzle", color: "warning", labelKey: "questions.category.riddle" });
    });

    it("should return correct UI metadata for explanation category.", () => {
      const { getCategoryUiMetadata } = useQuestion();

      const metadata = getCategoryUiMetadata("explanation");

      expect(metadata).toStrictEqual({ icon: "i-lucide-message-circle", color: "info", labelKey: "questions.category.explanation" });
    });
  });
});