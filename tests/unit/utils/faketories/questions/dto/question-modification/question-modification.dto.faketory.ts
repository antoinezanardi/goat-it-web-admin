import { faker } from "@faker-js/faker";
import type { QuestionModificationDto } from "@goat-it/schemas/question";

function createFakeQuestionModificationDto(questionModificationDto: Partial<QuestionModificationDto> = {}): QuestionModificationDto {
  return {
    category: faker.helpers.arrayElement(["trivia", "lexicon", "riddle", "explanation"]),
    cognitiveDifficulty: faker.helpers.arrayElement(["easy", "medium", "hard"]),
    sourceUrls: [faker.internet.url()],
    ...questionModificationDto,
  };
}

export {
  createFakeQuestionModificationDto,
};