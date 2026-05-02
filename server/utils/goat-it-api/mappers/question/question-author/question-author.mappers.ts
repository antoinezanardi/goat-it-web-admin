import type { AdminQuestionAuthorDto, QuestionAuthor } from "#shared/types/question.types";

function createQuestionAuthorFromAdminQuestionAuthorDto(dto: AdminQuestionAuthorDto): QuestionAuthor {
  return { ...dto };
}

export {
  createQuestionAuthorFromAdminQuestionAuthorDto,
};