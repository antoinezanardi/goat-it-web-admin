import { describe, expect, it } from "vitest";

import { createFakeAdminQuestionThemeDto } from "~~/tests/unit/utils/faketories/question-themes/dto/question-theme.dto.faketory";
import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";

import { createQuestionThemeFromAdminQuestionThemeDto } from "#server/utils/goat-it-api/mappers/goat-it-api.mappers";

describe("Goat It Api Mappers", () => {
  describe(createQuestionThemeFromAdminQuestionThemeDto, () => {
    it("should create question theme from admin question theme dto with correct properties when called.", () => {
      const adminQuestionThemeDto = createFakeAdminQuestionThemeDto();
      const expectedQuestionTheme = createFakeQuestionTheme({
        ...adminQuestionThemeDto,
        createdAt: new Date(adminQuestionThemeDto.createdAt),
        updatedAt: new Date(adminQuestionThemeDto.updatedAt),
      });
      const questionTheme = createQuestionThemeFromAdminQuestionThemeDto(adminQuestionThemeDto);

      expect(questionTheme).toStrictEqual(expectedQuestionTheme);
    });
  });
});