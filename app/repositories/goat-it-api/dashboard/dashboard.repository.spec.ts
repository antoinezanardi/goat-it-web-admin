import { vi, describe, it, expect, beforeEach } from "vitest";
import type { $Fetch } from "nitropack";
import { createFakeQuestionStatsDto } from "@goat-it/schemas/testing/question";
import { createFakeQuestionThemeStatsDto } from "@goat-it/schemas/testing/question-theme";

import { dashboardRepository } from "@/repositories/goat-it-api/dashboard/dashboard.repository";

describe(dashboardRepository, () => {
  let fetchMock: ReturnType<typeof vi.fn<$Fetch>>;

  beforeEach(() => {
    fetchMock = vi.fn<$Fetch>();
  });

  it("should return the repository object when called.", () => {
    const repository = dashboardRepository(fetchMock as $Fetch);

    expect(repository).toStrictEqual({
      getQuestionStats: expect.any(Function) as () => Promise<unknown>,
      getQuestionThemeStats: expect.any(Function) as () => Promise<unknown>,
    });
  });

  describe("getQuestionStats", () => {
    it("should call fetch with the correct endpoint when called.", async() => {
      const repository = dashboardRepository(fetchMock as $Fetch);
      fetchMock.mockResolvedValue(createFakeQuestionStatsDto());
      await repository.getQuestionStats();

      expect(fetchMock).toHaveBeenCalledExactlyOnceWith("/api/goat-it-api/questions/stats");
    });

    it("should return question stats from fetch when called.", async() => {
      const fakeStats = createFakeQuestionStatsDto();
      const repository = dashboardRepository(fetchMock as $Fetch);
      fetchMock.mockResolvedValue(fakeStats);

      const result = await repository.getQuestionStats();

      expect(result).toStrictEqual(fakeStats);
    });
  });

  describe("getQuestionThemeStats", () => {
    it("should call fetch with the correct endpoint when called.", async() => {
      const repository = dashboardRepository(fetchMock as $Fetch);
      fetchMock.mockResolvedValue(createFakeQuestionThemeStatsDto());
      await repository.getQuestionThemeStats();

      expect(fetchMock).toHaveBeenCalledExactlyOnceWith("/api/goat-it-api/question-themes/stats");
    });

    it("should return question theme stats from fetch when called.", async() => {
      const fakeStats = createFakeQuestionThemeStatsDto();
      const repository = dashboardRepository(fetchMock as $Fetch);
      fetchMock.mockResolvedValue(fakeStats);

      const result = await repository.getQuestionThemeStats();

      expect(result).toStrictEqual(fakeStats);
    });
  });
});