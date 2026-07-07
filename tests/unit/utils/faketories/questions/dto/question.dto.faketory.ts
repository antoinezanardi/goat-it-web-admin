import { faker } from "@faker-js/faker";
import { ADMIN_QUESTION_SORTABLE_FIELDS, QUESTION_AUTHOR_ROLES, QUESTION_CATEGORIES, QUESTION_COGNITIVE_DIFFICULTIES, QUESTION_STATUSES } from "@goat-it/schemas/question";
import type { AdminFindQuestionsQueryDto, AdminQuestionDto, QuestionCreationDto } from "@goat-it/schemas/question";
import { SORT_ORDERS } from "@goat-it/schemas/shared/constants";

import { createFakeAdminQuestionAuthorDto } from "~~/tests/unit/utils/faketories/questions/dto/question-author/question-author.dto.faketory";
import { createFakeAdminQuestionContentDto } from "~~/tests/unit/utils/faketories/questions/dto/question-content/question-content.dto.faketory";
import { createFakeAdminQuestionThemeAssignmentDto } from "~~/tests/unit/utils/faketories/questions/dto/question-theme-assignment/question-theme-assignment.dto.faketory";

function createFakeAdminQuestionDto(adminQuestionDto: Partial<AdminQuestionDto> = {}): AdminQuestionDto {
  return {
    id: faker.database.mongodbObjectId(),
    category: faker.helpers.arrayElement(QUESTION_CATEGORIES),
    themes: [createFakeAdminQuestionThemeAssignmentDto({ isPrimary: true })],
    content: createFakeAdminQuestionContentDto(),
    cognitiveDifficulty: faker.helpers.arrayElement(QUESTION_COGNITIVE_DIFFICULTIES),
    author: createFakeAdminQuestionAuthorDto(),
    status: faker.helpers.arrayElement(QUESTION_STATUSES),
    sourceUrls: [faker.internet.url()],
    createdAt: faker.date.anytime().toISOString(),
    updatedAt: faker.date.anytime().toISOString(),
    ...adminQuestionDto,
  };
}

function createFakeQuestionCreationDto(questionCreationDto: Partial<QuestionCreationDto> = {}): QuestionCreationDto {
  return {
    category: faker.helpers.arrayElement(QUESTION_CATEGORIES),
    themes: [{ themeId: faker.database.mongodbObjectId(), isPrimary: true, isHint: false }],
    content: createFakeAdminQuestionContentDto(),
    cognitiveDifficulty: faker.helpers.arrayElement(QUESTION_COGNITIVE_DIFFICULTIES),
    author: { role: "admin", name: faker.person.fullName() },
    sourceUrls: [faker.internet.url()],
    ...questionCreationDto,
  };
}

function createFakeAdminFindQuestionsQueryDto(dto: Partial<AdminFindQuestionsQueryDto> = {}): AdminFindQuestionsQueryDto {
  return {
    "sort-by": faker.helpers.arrayElement(ADMIN_QUESTION_SORTABLE_FIELDS),
    "sort-order": faker.helpers.arrayElement(SORT_ORDERS),
    "status": faker.helpers.arrayElement(QUESTION_STATUSES),
    "category": faker.helpers.arrayElement(QUESTION_CATEGORIES),
    "cognitive-difficulty": faker.helpers.arrayElement(QUESTION_COGNITIVE_DIFFICULTIES),
    "author-role": faker.helpers.arrayElement(QUESTION_AUTHOR_ROLES),
    "theme-ids": [faker.database.mongodbObjectId()],
    "limit": faker.number.int({ min: 0, max: 100 }),
    ...dto,
  };
}

export {
  createFakeAdminFindQuestionsQueryDto,
  createFakeAdminQuestionDto,
  createFakeQuestionCreationDto,
};