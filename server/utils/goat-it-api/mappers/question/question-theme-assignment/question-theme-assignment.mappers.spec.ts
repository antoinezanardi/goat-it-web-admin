import { describe, expect, it } from "vitest";

import { createFakeAdminQuestionThemeAssignmentDto } from "~~/tests/unit/utils/faketories/questions/dto/question-theme-assignment/question-theme-assignment.dto.faketory";
import { createFakeQuestionThemeAssignment } from "~~/tests/unit/utils/faketories/questions/entity/question-theme-assignment/question-theme-assignment.entity.faketory";
import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";

import { createQuestionThemeAssignmentFromAdminQuestionThemeAssignmentDto } from "#server/utils/goat-it-api/mappers/question/question-theme-assignment/question-theme-assignment.mappers";

describe("Question Theme Assignment Mappers", () => {
  describe(createQuestionThemeAssignmentFromAdminQuestionThemeAssignmentDto, () => {
    it("should create question theme assignment from admin question theme assignment dto with correct properties when called.", () => {
      const dto = createFakeAdminQuestionThemeAssignmentDto();
      const expectedThemeAssignment = createFakeQuestionThemeAssignment({
        theme: createFakeQuestionTheme({
          ...dto.theme,
          createdAt: new Date(dto.theme.createdAt),
          updatedAt: new Date(dto.theme.updatedAt),
        }),
        isPrimary: dto.isPrimary,
        isHint: dto.isHint,
      });
      const result = createQuestionThemeAssignmentFromAdminQuestionThemeAssignmentDto(dto);

      expect(result).toStrictEqual(expectedThemeAssignment);
    });
  });
});