import { faker } from "@faker-js/faker";
import { QUESTION_THEME_STATUSES } from "@goat-it/schemas/question-theme";
import { createFakeLocalizedText, createFakeLocalizedTexts } from "@goat-it/schemas/testing/shared";

function createFakeQuestionTheme(questionTheme: Partial<QuestionTheme> = {}): QuestionTheme {
  return {
    id: faker.database.mongodbObjectId(),
    slug: faker.lorem.slug(),
    color: faker.color.rgb({ casing: "upper" }),
    label: createFakeLocalizedText(),
    aliases: createFakeLocalizedTexts(),
    description: createFakeLocalizedText(),
    status: faker.helpers.arrayElement(QUESTION_THEME_STATUSES),
    updatedAt: faker.date.anytime(),
    createdAt: faker.date.anytime(),
    ...questionTheme,
  };
}

export {
  createFakeQuestionTheme,
};