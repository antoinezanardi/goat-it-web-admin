import { describe, expect, it } from "vitest";
import { createFakeQuestionRejectionDto } from "@goat-it/schemas/testing/question";

import { createQuestionRejectionFromAdminQuestionRejectionDto } from "#server/utils/goat-it-api/mappers/question/question-rejection/question-rejection.mappers";

describe("Question Rejection Mappers", () => {
  describe(createQuestionRejectionFromAdminQuestionRejectionDto, () => {
    it("should create question rejection from admin question rejection dto with correct properties when called.", () => {
      const dto = createFakeQuestionRejectionDto();
      const result = createQuestionRejectionFromAdminQuestionRejectionDto(dto);

      expect(result).toStrictEqual(dto);
    });
  });
});