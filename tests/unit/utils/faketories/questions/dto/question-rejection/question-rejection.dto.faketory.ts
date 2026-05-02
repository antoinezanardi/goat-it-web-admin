import { faker } from "@faker-js/faker";
import { QUESTION_REJECTION_TYPES } from "@goat-it/schemas/question";

import type { AdminQuestionRejectionDto } from "#shared/types/question.types";

function createFakeAdminQuestionRejectionDto(adminQuestionRejectionDto: Partial<AdminQuestionRejectionDto> = {}): AdminQuestionRejectionDto {
  return {
    type: faker.helpers.arrayElement(QUESTION_REJECTION_TYPES),
    comment: faker.lorem.sentence(),
    ...adminQuestionRejectionDto,
  };
}

export {
  createFakeAdminQuestionRejectionDto,
};