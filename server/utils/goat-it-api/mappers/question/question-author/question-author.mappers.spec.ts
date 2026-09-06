import { describe, expect, it } from "vitest";
import { createFakeQuestionAuthorDto } from "@goat-it/schemas/testing/question";

import { createQuestionAuthorFromAdminQuestionAuthorDto } from "#server/utils/goat-it-api/mappers/question/question-author/question-author.mappers";

describe(createQuestionAuthorFromAdminQuestionAuthorDto, () => {
  it("should create question author from admin question author dto with correct properties when called.", () => {
    const dto = createFakeQuestionAuthorDto();
    const result = createQuestionAuthorFromAdminQuestionAuthorDto(dto);

    expect(result).toStrictEqual(dto);
  });
});