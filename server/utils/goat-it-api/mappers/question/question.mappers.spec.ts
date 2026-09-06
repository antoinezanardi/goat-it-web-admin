import { describe, expect, it } from "vitest";
import { createFakeAdminQuestionDto, createFakeQuestionRejectionDto } from "@goat-it/schemas/testing/question";

import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";
import { createFakeQuestion } from "~~/tests/unit/utils/faketories/questions/entity/question.entity.faketory";

import { createQuestionFromAdminQuestionDto } from "#server/utils/goat-it-api/mappers/question/question.mappers";

describe(createQuestionFromAdminQuestionDto, () => {
  describe(createQuestionFromAdminQuestionDto, () => {
    it("should create question from admin question dto with correct properties when called.", () => {
      const dto = createFakeAdminQuestionDto({ rejection: undefined });
      const result = createQuestionFromAdminQuestionDto(dto);
      const expected = createFakeQuestion({
        id: dto.id,
        category: dto.category,
        themes: dto.themes.map(themeAssignment => ({
          theme: createFakeQuestionTheme({
            ...themeAssignment.theme,
            createdAt: new Date(themeAssignment.theme.createdAt),
            updatedAt: new Date(themeAssignment.theme.updatedAt),
          }),
          isPrimary: themeAssignment.isPrimary,
          isHint: themeAssignment.isHint,
        })),
        content: dto.content,
        cognitiveDifficulty: dto.cognitiveDifficulty,
        author: dto.author,
        status: dto.status,
        rejection: dto.rejection,
        sourceUrls: dto.sourceUrls,
        createdAt: new Date(dto.createdAt),
        updatedAt: new Date(dto.updatedAt),
      });

      expect(result).toStrictEqual(expected);
    });

    it("should map rejection when dto has a rejection.", () => {
      const fakeRejection = createFakeQuestionRejectionDto();
      const dto = createFakeAdminQuestionDto({ rejection: fakeRejection });
      const result = createQuestionFromAdminQuestionDto(dto);

      expect(result.rejection).toStrictEqual(fakeRejection);
    });

    it("should set rejection to undefined when dto has no rejection.", () => {
      const dto = createFakeAdminQuestionDto({ rejection: undefined });
      const result = createQuestionFromAdminQuestionDto(dto);

      expect(result.rejection).toBeUndefined();
    });
  });
});