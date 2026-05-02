import { faker } from "@faker-js/faker";

import { createFakeLocalizedText, createFakeLocalizedTexts } from "~~/tests/unit/utils/faketories/shared/locale/locale.faketory";

import type { AdminQuestionContentDto } from "#shared/types/question.types";

function createFakeAdminQuestionContentDto(adminQuestionContentDto: Partial<AdminQuestionContentDto> = {}): AdminQuestionContentDto {
  return {
    statement: createFakeLocalizedText(),
    answer: createFakeLocalizedText(),
    context: faker.helpers.maybe(() => createFakeLocalizedText()),
    trivia: faker.helpers.maybe(() => createFakeLocalizedTexts()),
    ...adminQuestionContentDto,
  };
}

export {
  createFakeAdminQuestionContentDto,
};