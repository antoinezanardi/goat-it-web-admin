import { describe, it, expect } from "vitest";

import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";

import type { QuestionTheme } from "#shared/types/question-theme.types";
import { QUESTION_THEME_UNKNOWN_ICON } from "@/composables/domain/question-theme/constants/question-theme.constants";
import { getThemeIcon, getThemeLocalizedLabel } from "@/composables/domain/question-theme/helpers/question-theme.helpers";

describe(getThemeIcon, () => {
  describe(getThemeIcon, () => {
    it.each<{ slug: string; expectedIcon: string }>([
      { slug: "history-civilizations", expectedIcon: "i-lucide-landmark" },
      { slug: "geography-travels", expectedIcon: "i-lucide-globe" },
      { slug: "animals", expectedIcon: "i-lucide-paw-print" },
      { slug: "nature-environment", expectedIcon: "i-lucide-tree-pine" },
      { slug: "space-astronomy", expectedIcon: "i-lucide-rocket" },
      { slug: "society-daily-life", expectedIcon: "i-lucide-users" },
      { slug: "body-health", expectedIcon: "i-lucide-heart-pulse" },
      { slug: "gastronomy", expectedIcon: "i-lucide-chef-hat" },
      { slug: "miscellaneous-facts", expectedIcon: "i-lucide-newspaper" },
      { slug: "music", expectedIcon: "i-lucide-music" },
      { slug: "cinema-series", expectedIcon: "i-lucide-clapperboard" },
      { slug: "leisure-games", expectedIcon: "i-lucide-dice-5" },
      { slug: "sports-exploits", expectedIcon: "i-lucide-trophy" },
      { slug: "books-fine-arts", expectedIcon: "i-lucide-book-open" },
      { slug: "sciences-innovations", expectedIcon: "i-lucide-flask-conical" },
      { slug: "language-words", expectedIcon: "i-lucide-message-circle" },
      { slug: "beliefs-myths", expectedIcon: "i-lucide-sparkles" },
    ])("should return icon $expectedIcon when the slug is $slug.", ({ slug, expectedIcon }) => {
      expect(getThemeIcon(slug)).toBe(expectedIcon);
    });

    it("should return the unknown icon when the slug is not in the map.", () => {
      expect(getThemeIcon("unknown-slug")).toBe(QUESTION_THEME_UNKNOWN_ICON);
    });
  });

  describe(getThemeLocalizedLabel, () => {
    it.each<{
      description: string;
      theme: QuestionTheme | undefined;
      expectedLabel: string;
    }>([
      {
        description: "theme is undefined",
        theme: undefined,
        expectedLabel: "N/A",
      },
      {
        description: "theme label does not have a value for the given locale",
        theme: createFakeQuestionTheme({
          label: {
            en: "",
            fr: "",
            es: "",
            de: "",
            it: "",
            pt: "",
          },
        }),
        expectedLabel: "N/A",
      },
    ])("should return missing translation when $description.", ({
      theme,
      expectedLabel,
    }) => {
      expect(getThemeLocalizedLabel(theme, "en", "N/A")).toBe(expectedLabel);
    });

    it("should return localized label when theme has a label for the given locale.", () => {
      const theme = createFakeQuestionTheme({
        label: {
          en: "History",
          fr: "Histoire",
          es: "",
          de: "",
          it: "",
          pt: "",
        },
      });

      expect(getThemeLocalizedLabel(theme, "en", "N/A")).toBe("History");
    });
  });
});