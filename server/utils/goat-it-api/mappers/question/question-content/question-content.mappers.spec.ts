import { describe, expect, it } from "vitest";

import { createFakeAdminQuestionContentDto } from "~~/tests/unit/utils/faketories/questions/dto/question-content/question-content.dto.faketory";

import { createQuestionContentFromAdminQuestionContentDto } from "#server/utils/goat-it-api/mappers/question/question-content/question-content.mappers";

describe("Question Content Mappers", () => {
  describe(createQuestionContentFromAdminQuestionContentDto, () => {
    it("should create question content from admin question content dto with correct properties when called.", () => {
      const dto = createFakeAdminQuestionContentDto();
      const result = createQuestionContentFromAdminQuestionContentDto(dto);

      expect(result).toStrictEqual(dto);
    });
  });
});