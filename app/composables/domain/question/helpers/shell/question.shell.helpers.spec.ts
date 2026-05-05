import { describe, expect, it } from "vitest";

import type { QuestionCreationDtoShell } from "#shared/types/question.types";

import { QUESTION_DEFAULT_AUTHOR } from "~/composables/domain/question/constants/question-author.constants";
import { createQuestionCreationDtoShell } from "~/composables/domain/question/helpers/shell/question.shell.helpers";

describe(createQuestionCreationDtoShell, () => {
  it("should return a shell with all content fields as localized text shells.", () => {
    const shell: QuestionCreationDtoShell = createQuestionCreationDtoShell();

    expect(shell.content.statement).toStrictEqual({ en: undefined, fr: undefined, es: undefined, de: undefined, it: undefined, pt: undefined });
    expect(shell.content.answer).toStrictEqual({ en: undefined, fr: undefined, es: undefined, de: undefined, it: undefined, pt: undefined });
    expect(shell.content.context).toStrictEqual({ en: undefined, fr: undefined, es: undefined, de: undefined, it: undefined, pt: undefined });
  });

  it("should return a shell with undefined scalar fields.", () => {
    const shell: QuestionCreationDtoShell = createQuestionCreationDtoShell();

    expect(shell.cognitiveDifficulty).toBeUndefined();
    expect(shell.category).toBeUndefined();
  });

  it("should return a shell with empty themes array.", () => {
    const shell: QuestionCreationDtoShell = createQuestionCreationDtoShell();

    expect(shell.themes).toStrictEqual([]);
  });

  it("should return a shell with empty sourceUrls array.", () => {
    const shell: QuestionCreationDtoShell = createQuestionCreationDtoShell();

    expect(shell.sourceUrls).toStrictEqual([]);
  });

  it("should return a shell with default author from constants.", () => {
    const shell: QuestionCreationDtoShell = createQuestionCreationDtoShell();

    expect(shell.author).toStrictEqual(QUESTION_DEFAULT_AUTHOR);
  });
});