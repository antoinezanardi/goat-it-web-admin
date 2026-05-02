import { faker } from "@faker-js/faker";
import { QUESTION_AUTHOR_ROLES } from "@goat-it/schemas/question";

import type { AdminQuestionAuthorDto } from "#shared/types/question.types";

function createFakeAdminQuestionAuthorDto(adminQuestionAuthorDto: Partial<AdminQuestionAuthorDto> = {}): AdminQuestionAuthorDto {
  return {
    role: faker.helpers.arrayElement(QUESTION_AUTHOR_ROLES),
    name: faker.person.fullName(),
    ...adminQuestionAuthorDto,
  };
}

export {
  createFakeAdminQuestionAuthorDto,
};