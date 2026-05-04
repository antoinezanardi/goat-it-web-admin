import { faker } from "@faker-js/faker";
import type { QuestionModificationDto } from "@goat-it/schemas/question";
import { QUESTION_CATEGORIES, QUESTION_COGNITIVE_DIFFICULTIES } from "@goat-it/schemas/question";

function createFakeQuestionModificationDto(questionModificationDto: Partial<QuestionModificationDto> = {}): QuestionModificationDto {
  return {
    category: faker.helpers.arrayElement(QUESTION_CATEGORIES),
    cognitiveDifficulty: faker.helpers.arrayElement(QUESTION_COGNITIVE_DIFFICULTIES),
    sourceUrls: [faker.internet.url()],
    ...questionModificationDto,
  };
}

export {
  createFakeQuestionModificationDto,
};