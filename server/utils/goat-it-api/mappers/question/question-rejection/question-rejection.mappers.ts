import type { AdminQuestionRejectionDto, QuestionRejection } from "#shared/types/question.types";

function createQuestionRejectionFromAdminQuestionRejectionDto(dto: AdminQuestionRejectionDto): QuestionRejection {
  return { ...dto };
}

export {
  createQuestionRejectionFromAdminQuestionRejectionDto,
};