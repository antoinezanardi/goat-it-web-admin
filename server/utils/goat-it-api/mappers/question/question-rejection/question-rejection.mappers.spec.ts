import { describe, expect, it } from "vitest";

import { createFakeAdminQuestionRejectionDto } from "~~/tests/unit/utils/faketories/questions/dto/question-rejection/question-rejection.dto.faketory";

import { createQuestionRejectionFromAdminQuestionRejectionDto } from "#server/utils/goat-it-api/mappers/question/question-rejection/question-rejection.mappers";

describe("Question Rejection Mappers", () => {
  describe(createQuestionRejectionFromAdminQuestionRejectionDto, () => {
    it("should create question rejection from admin question rejection dto with correct properties when called.", () => {
      const dto = createFakeAdminQuestionRejectionDto();
      const result = createQuestionRejectionFromAdminQuestionRejectionDto(dto);

      expect(result).toStrictEqual(dto);
    });
  });
});