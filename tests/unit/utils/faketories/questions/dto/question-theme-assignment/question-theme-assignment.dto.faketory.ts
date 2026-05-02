import { faker } from "@faker-js/faker";

import { createFakeAdminQuestionThemeDto } from "~~/tests/unit/utils/faketories/question-themes/dto/question-theme.dto.faketory";

import type { AdminQuestionThemeAssignmentDto } from "#shared/types/question.types";

function createFakeAdminQuestionThemeAssignmentDto(adminQuestionThemeAssignmentDto: Partial<AdminQuestionThemeAssignmentDto> = {}): AdminQuestionThemeAssignmentDto {
  return {
    theme: createFakeAdminQuestionThemeDto(),
    isPrimary: faker.datatype.boolean(),
    isHint: faker.datatype.boolean(),
    ...adminQuestionThemeAssignmentDto,
  };
}

export {
  createFakeAdminQuestionThemeAssignmentDto,
};