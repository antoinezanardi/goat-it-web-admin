import type { AdminQuestionThemeAssignmentDto, QuestionThemeAssignment } from "#shared/types/question.types";
import { createQuestionThemeFromAdminQuestionThemeDto } from "#server/utils/goat-it-api/mappers/goat-it-api.mappers";

function createQuestionThemeAssignmentFromAdminQuestionThemeAssignmentDto(dto: AdminQuestionThemeAssignmentDto): QuestionThemeAssignment {
  return {
    theme: createQuestionThemeFromAdminQuestionThemeDto(dto.theme),
    isPrimary: dto.isPrimary,
    isHint: dto.isHint,
  };
}

export {
  createQuestionThemeAssignmentFromAdminQuestionThemeAssignmentDto,
};