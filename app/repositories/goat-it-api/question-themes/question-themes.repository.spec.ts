import { vi, describe, it, expect, beforeEach } from "vitest";
import type { $Fetch } from "nitropack";

import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";

import { questionThemesRepository } from "@/repositories/goat-it-api/question-themes/question-themes.repository";

describe(questionThemesRepository, () => {
  let fetchMock: ReturnType<typeof vi.fn<$Fetch>>;

  beforeEach(() => {
    fetchMock = vi.fn<$Fetch>();
  });

  describe(questionThemesRepository, () => {
    it("should return the repository object when called.", () => {
      const repository = questionThemesRepository(fetchMock as $Fetch);

      expect(repository).toStrictEqual({
        getAll: expect.any(Function) as () => Promise<QuestionTheme[]>,
      });
    });
  });

  describe("getAll", () => {
    it("should call fetch with the correct endpoint when called.", async() => {
      const repository = questionThemesRepository(fetchMock as $Fetch);
      fetchMock.mockResolvedValue([]);
      await repository.getAll();

      expect(fetchMock).toHaveBeenCalledExactlyOnceWith("/api/goat-it-api/question-themes");
    });

    it("should return question themes when fetch resolves.", async() => {
      const fakeQuestionThemes: QuestionTheme[] = [
        createFakeQuestionTheme(),
        createFakeQuestionTheme(),
      ];
      const repository = questionThemesRepository(fetchMock as $Fetch);
      fetchMock.mockResolvedValue(fakeQuestionThemes);
      const result = await repository.getAll();

      expect(result).toStrictEqual<QuestionTheme[]>(fakeQuestionThemes);
    });
  });
});