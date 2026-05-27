import { faker } from "@faker-js/faker";
import { QUESTION_CATEGORIES, QUESTION_COGNITIVE_DIFFICULTIES, QUESTION_STATUSES } from "@goat-it/schemas/question";

import { createFakeQuestionAuthor } from "~~/tests/unit/utils/faketories/questions/entity/question-author/question-author.entity.faketory";
import { createFakeQuestionContent } from "~~/tests/unit/utils/faketories/questions/entity/question-content/question-content.entity.faketory";
import { createFakeQuestionThemeAssignment } from "~~/tests/unit/utils/faketories/questions/entity/question-theme-assignment/question-theme-assignment.entity.faketory";

import type { Question } from "#shared/types/question.types";

function createFakeQuestion(question: Partial<Question> = {}): Question {
  return {
    id: faker.database.mongodbObjectId(),
    category: faker.helpers.arrayElement(QUESTION_CATEGORIES),
    themes: [createFakeQuestionThemeAssignment({ isPrimary: true })],
    content: createFakeQuestionContent(),
    cognitiveDifficulty: faker.helpers.arrayElement(QUESTION_COGNITIVE_DIFFICULTIES),
    author: createFakeQuestionAuthor(),
    status: faker.helpers.arrayElement(QUESTION_STATUSES),
    sourceUrls: [faker.internet.url()],
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
    ...question,
  };
}

export {
  createFakeQuestion,
};