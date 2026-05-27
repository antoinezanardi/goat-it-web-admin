import { faker } from "@faker-js/faker";
import type { QuestionThemeAssignmentModificationDto } from "@goat-it/schemas/question";

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