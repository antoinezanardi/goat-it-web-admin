import { describe, expect, it } from "vitest";

import { createFakeAdminQuestionAuthorDto } from "~~/tests/unit/utils/faketories/questions/dto/question-author/question-author.dto.faketory";

import { createQuestionAuthorFromAdminQuestionAuthorDto } from "#server/utils/goat-it-api/mappers/question/question-author/question-author.mappers";

describe("Question Author Mappers", () => {
  describe(createQuestionAuthorFromAdminQuestionAuthorDto, () => {
    it("should create question author from admin question author dto with correct properties when called.", () => {
      const dto = createFakeAdminQuestionAuthorDto();
      const result = createQuestionAuthorFromAdminQuestionAuthorDto(dto);

      expect(result).toStrictEqual(dto);
    });
  });
});