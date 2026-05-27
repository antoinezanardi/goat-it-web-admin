import type { QuestionCreationDtoShell } from "#shared/types/question.types";
import { QUESTION_DEFAULT_AUTHOR } from "~/composables/domain/question/constants/question-author.constants";
import { createLocalizedTextShell, createLocalizedTextsShell } from "~/composables/core/localization/helpers/shell/localization.shell.helpers";

function createQuestionCreationDtoShell(): QuestionCreationDtoShell {
  return {
    content: {
      statement: createLocalizedTextShell(),
      answer: createLocalizedTextShell(),
      context: createLocalizedTextShell(),
      trivia: createLocalizedTextsShell(),
    },
    cognitiveDifficulty: undefined,
    category: undefined,
    themes: [],
    sourceUrls: [],
    author: { ...QUESTION_DEFAULT_AUTHOR },
  };
}

export { createQuestionCreationDtoShell };