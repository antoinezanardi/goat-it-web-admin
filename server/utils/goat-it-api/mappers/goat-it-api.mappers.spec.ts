import { describe, expect, it } from "vitest";
import { createFakeAdminQuestionThemeDto } from "@goat-it/schemas/testing/question-theme";

import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";

import { createQuestionThemeFromAdminQuestionThemeDto } from "#server/utils/goat-it-api/mappers/goat-it-api.mappers";

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