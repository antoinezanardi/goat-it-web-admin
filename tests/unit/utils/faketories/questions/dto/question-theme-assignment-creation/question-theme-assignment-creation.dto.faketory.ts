import { faker } from "@faker-js/faker";
import type { QuestionThemeAssignmentCreationDto } from "@goat-it/schemas/question";

function createFakeQuestionThemeAssignmentCreationDto(questionThemeAssignmentCreationDto: Partial<QuestionThemeAssignmentCreationDto> = {}): QuestionThemeAssignmentCreationDto {
  return {
    themeId: faker.database.mongodbObjectId(),
    isPrimary: faker.datatype.boolean(),
    isHint: faker.datatype.boolean(),
    ...questionThemeAssignmentCreationDto,
  };
}

export {
  createFakeQuestionThemeAssignmentCreationDto,
};