import { faker } from "@faker-js/faker";
import { QUESTION_THEME_STATUSES } from "@goat-it/schemas/question-theme";
import type { AdminQuestionThemeDto } from "@goat-it/schemas/question-theme";

import { createFakeLocalizedText, createFakeLocalizedTexts } from "~~/tests/unit/utils/faketories/shared/locale/locale.faketory";

function createFakeAdminQuestionThemeDto(adminQuestionThemeDto: Partial<AdminQuestionThemeDto> = {}): AdminQuestionThemeDto {
  return {
    id: faker.database.mongodbObjectId(),
    slug: faker.lorem.slug(),
    label: createFakeLocalizedText(),
    aliases: createFakeLocalizedTexts(),
    description: createFakeLocalizedText(),
    status: faker.helpers.arrayElement(QUESTION_THEME_STATUSES),
    updatedAt: faker.date.anytime().toISOString(),
    createdAt: faker.date.anytime().toISOString(),
    ...adminQuestionThemeDto,
  };
}

export {
  createFakeAdminQuestionThemeDto,
};