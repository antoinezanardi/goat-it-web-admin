import { describe, expect, it } from "vitest";

import type { QuestionCreationDtoShell } from "#shared/types/question.types";
import { QUESTION_DEFAULT_AUTHOR } from "~/composables/domain/question/constants/question-author.constants";
import { createQuestionCreationDtoShell } from "~/composables/domain/question/helpers/shell/question.shell.helpers";

describe(createQuestionCreationDtoShell, () => {
  it.each<{ field: "statement" | "answer" | "context" }>([
    { field: "statement" },
    { field: "answer" },
    { field: "context" },
  ])("should return a localized text shell when content field is $field.", ({ field }) => {
    const shell: QuestionCreationDtoShell = createQuestionCreationDtoShell();

    expect(shell.content[field]).toStrictEqual({ en: undefined, fr: undefined, es: undefined, de: undefined, it: undefined, pt: undefined });
  });

  it.each<{ field: "cognitiveDifficulty" | "category" }>([
    { field: "cognitiveDifficulty" },
    { field: "category" },
  ])("should return undefined when field is $field.", ({ field }) => {
    const shell: QuestionCreationDtoShell = createQuestionCreationDtoShell();

    expect(shell[field]).toBeUndefined();
  });

  it.each<{ field: "themes" | "sourceUrls" }>([
    { field: "themes" },
    { field: "sourceUrls" },
  ])("should return an empty array when field is $field.", ({ field }) => {
    const shell: QuestionCreationDtoShell = createQuestionCreationDtoShell();

    expect(shell[field]).toStrictEqual([]);
  });

  it("should return the default author from constants when shell is created.", () => {
    const shell: QuestionCreationDtoShell = createQuestionCreationDtoShell();

    expect(shell.author).toStrictEqual(QUESTION_DEFAULT_AUTHOR);
  });
});