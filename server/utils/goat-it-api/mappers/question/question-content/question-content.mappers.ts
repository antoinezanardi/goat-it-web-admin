import type { AdminQuestionContentDto, QuestionContent } from "#shared/types/question.types";

function createQuestionContentFromAdminQuestionContentDto(dto: AdminQuestionContentDto): QuestionContent {
  return { ...dto };
}

export {
  createQuestionContentFromAdminQuestionContentDto,
};