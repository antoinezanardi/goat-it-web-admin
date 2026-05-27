import { describe, it, expect } from "vitest";

import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";

import type { QuestionTheme } from "#shared/types/question-theme.types";
import { getThemeLocalizedLabel } from "~/composables/domain/question-theme/helpers/question-theme.helpers";

describe("Question Theme Helpers", () => {
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