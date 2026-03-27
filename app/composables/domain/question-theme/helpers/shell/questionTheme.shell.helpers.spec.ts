import { describe, expect, it } from "vitest";

import type { QuestionThemeCreationDtoShell } from "#shared/types/question-theme.types";
import { createQuestionThemeCreationDtoShell } from "~/composables/domain/question-theme/helpers/shell/question-theme.shell.helpers";

describe(createQuestionThemeCreationDtoShell, () => {
  it("should return a shell with all fields set to undefined when called.", () => {
    const result = createQuestionThemeCreationDtoShell();

    expect(result).toStrictEqual<QuestionThemeCreationDtoShell>({
      slug: undefined,
      color: undefined,
      label: {
        en: undefined,
        fr: undefined,
        es: undefined,
        de: undefined,
        it: undefined,
        pt: undefined,
      },
      description: {
        en: undefined,
        fr: undefined,
        es: undefined,
        de: undefined,
        it: undefined,
        pt: undefined,
      },
      aliases: {
        en: undefined,
        fr: undefined,
        es: undefined,
        de: undefined,
        it: undefined,
        pt: undefined,
      },
    });
  });
});