import { faker } from "@faker-js/faker";

import type { QuestionThemeAssignmentModificationDto } from "#shared/types/question.types";

function createFakeQuestionThemeAssignmentModificationDto(questionThemeAssignmentModificationDto: Partial<QuestionThemeAssignmentModificationDto> = {}):
QuestionThemeAssignmentModificationDto {
  return {
    isPrimary: true,
    isHint: faker.datatype.boolean(),
    ...questionThemeAssignmentModificationDto,
  };
}

export {
  createFakeQuestionThemeAssignmentModificationDto,
};