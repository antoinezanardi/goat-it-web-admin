import { faker } from "@faker-js/faker";
import { QUESTION_CATEGORIES, QUESTION_COGNITIVE_DIFFICULTIES, QUESTION_STATUSES } from "@goat-it/schemas/question";
import type { AdminQuestionDto, QuestionCreationDto } from "@goat-it/schemas/question";

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

export {
  createFakeAdminQuestionDto,
  createFakeQuestionCreationDto,
};