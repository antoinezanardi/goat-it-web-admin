import { faker } from "@faker-js/faker";
import { ADMIN_QUESTION_THEME_SORTABLE_FIELDS, QUESTION_THEME_STATUSES } from "@goat-it/schemas/question-theme";
import type { AdminFindQuestionThemesQueryDto, AdminQuestionThemeDto, QuestionThemeCreationDto, QuestionThemeModificationDto } from "@goat-it/schemas/question-theme";
import { SORT_ORDERS } from "@goat-it/schemas/shared/constants";

import { createFakeLocalizedText, createFakeLocalizedTexts } from "~~/tests/unit/utils/faketories/shared/locale/locale.faketory";

function createFakeAdminFindQuestionThemesQueryDto(dto: Partial<AdminFindQuestionThemesQueryDto> = {}): AdminFindQuestionThemesQueryDto {
  return {
    "sort-by": faker.helpers.arrayElement(ADMIN_QUESTION_THEME_SORTABLE_FIELDS),
    "sort-order": faker.helpers.arrayElement(SORT_ORDERS),
    "status": faker.helpers.arrayElement(QUESTION_THEME_STATUSES),
    "limit": faker.number.int({ min: 0, max: 100 }),
    ...dto,
  };
}

function createFakeAdminQuestionThemeDto(adminQuestionThemeDto: Partial<AdminQuestionThemeDto> = {}): AdminQuestionThemeDto {
  return {
    id: faker.database.mongodbObjectId(),
    slug: faker.lorem.slug(),
    color: faker.color.rgb({ casing: "upper" }),
    label: createFakeLocalizedText(),
    aliases: createFakeLocalizedTexts(),
    description: createFakeLocalizedText(),
    status: faker.helpers.arrayElement(QUESTION_THEME_STATUSES),
    updatedAt: faker.date.anytime().toISOString(),
    createdAt: faker.date.anytime().toISOString(),
    ...adminQuestionThemeDto,
  };
}

function createFakeQuestionThemeCreationDto(questionThemeCreationDto: Partial<QuestionThemeCreationDto> = {}): QuestionThemeCreationDto {
  return {
    slug: faker.lorem.slug(),
    color: faker.color.rgb({ casing: "upper" }),
    label: createFakeLocalizedText(),
    aliases: createFakeLocalizedTexts(),
    description: createFakeLocalizedText(),
    ...questionThemeCreationDto,
  };
}

function createFakeQuestionThemeModificationDto(questionThemeModificationDto: Partial<QuestionThemeModificationDto> = {}): QuestionThemeModificationDto {
  return {
    slug: faker.lorem.slug(),
    color: faker.color.rgb({ casing: "upper" }),
    label: createFakeLocalizedText(),
    aliases: createFakeLocalizedTexts(),
    description: createFakeLocalizedText(),
    ...questionThemeModificationDto,
  };
}

export {
  createFakeAdminFindQuestionThemesQueryDto,
  createFakeAdminQuestionThemeDto,
  createFakeQuestionThemeCreationDto,
  createFakeQuestionThemeModificationDto,
};