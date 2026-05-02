import type { AdminQuestionDto } from "@goat-it/schemas/question";

import type { Question } from "#shared/types/question.types";
import { createQuestionThemeAssignmentFromAdminQuestionThemeAssignmentDto } from "#server/utils/goat-it-api/mappers/question/question-theme-assignment/question-theme-assignment.mappers";
import { createQuestionContentFromAdminQuestionContentDto } from "#server/utils/goat-it-api/mappers/question/question-content/question-content.mappers";
import { createQuestionAuthorFromAdminQuestionAuthorDto } from "#server/utils/goat-it-api/mappers/question/question-author/question-author.mappers";
import { createQuestionRejectionFromAdminQuestionRejectionDto } from "#server/utils/goat-it-api/mappers/question/question-rejection/question-rejection.mappers";

function createQuestionFromAdminQuestionDto(dto: AdminQuestionDto): Question {
  return {
    id: dto.id,
    category: dto.category,
    themes: dto.themes.map(createQuestionThemeAssignmentFromAdminQuestionThemeAssignmentDto),
    content: createQuestionContentFromAdminQuestionContentDto(dto.content),
    cognitiveDifficulty: dto.cognitiveDifficulty,
    author: createQuestionAuthorFromAdminQuestionAuthorDto(dto.author),
    status: dto.status,
    rejection: dto.rejection ? createQuestionRejectionFromAdminQuestionRejectionDto(dto.rejection) : undefined,
    sourceUrls: dto.sourceUrls,
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
  };
}

export {
  createQuestionFromAdminQuestionDto,
};