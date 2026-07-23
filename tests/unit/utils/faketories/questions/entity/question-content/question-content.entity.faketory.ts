import { faker } from "@faker-js/faker";
import { createFakeLocalizedText, createFakeLocalizedTexts } from "@goat-it/schemas/testing/shared";

import type { QuestionContent } from "#shared/types/question.types";

function createFakeQuestionContent(questionContent: Partial<QuestionContent> = {}): QuestionContent {
  return {
    statement: createFakeLocalizedText(),
    answer: createFakeLocalizedText(),
    context: faker.helpers.maybe(() => createFakeLocalizedText()),
    trivia: faker.helpers.maybe(() => createFakeLocalizedTexts()),
    ...questionContent,
  };
}

export {
  createFakeQuestionContent,
};