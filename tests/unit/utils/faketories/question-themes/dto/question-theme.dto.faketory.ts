import { faker } from "@faker-js/faker";
import { QUESTION_THEME_STATUSES } from "@goat-it/schemas/question-theme";
import type { AdminFindQuestionThemesQueryDto, AdminQuestionThemeDto, QuestionThemeCreationDto, QuestionThemeModificationDto } from "@goat-it/schemas/question-theme";

import { createFakeLocalizedText, createFakeLocalizedTexts } from "~~/tests/unit/utils/faketories/shared/locale/locale.faketory";

function createFakeAdminFindQuestionThemesQueryDto(dto: Partial<AdminFindQuestionThemesQueryDto> = {}): AdminFindQuestionThemesQueryDto {
  return {
    "sort-by": faker.helpers.arrayElement(["slug", "status", "createdAt", "updatedAt"] as const),
    "sort-order": faker.helpers.arrayElement(["asc", "desc"] as const),
    "status": faker.helpers.arrayElement(QUESTION_THEME_STATUSES),
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