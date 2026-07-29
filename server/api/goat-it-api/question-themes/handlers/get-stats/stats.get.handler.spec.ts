import { vi, describe, it, expect, beforeEach } from "vitest";
import { ZodError } from "zod";
import { createFakeQuestionThemeStatsDto } from "@goat-it/schemas/testing/question-theme";

import { createFakeH3Event } from "~~/tests/unit/utils/faketories/shared/h3/h3-event.faketory";

import type { SharedRuntimeConfig } from "#build/types/runtime-config";
import { createGoatItApiEndpoint, createGoatItApiFetchOptions, handleGoatItApiError } from "#server/utils/goat-it-api/helpers/goat-it-api.helpers";
import { getQuestionThemeStatsHandler } from "#server/api/goat-it-api/question-themes/handlers/get-stats/stats.get.handler";

vi.mock(import("#server/utils/goat-it-api/helpers/goat-it-api.helpers"));

describe("Server Goat It API Question Theme Stats Get Handler", () => {
  const mockedEvent = createFakeH3Event();

  beforeEach(() => {
    vi.mocked($fetch).mockResolvedValue(createFakeQuestionThemeStatsDto());
  });

  describe(getQuestionThemeStatsHandler, () => {
    it("should create goat it api endpoint when called.", async() => {
      await getQuestionThemeStatsHandler(mockedEvent);

      expect(createGoatItApiEndpoint).toHaveBeenCalledExactlyOnceWith("question-themes");
    });

    it("should create goat it api fetch options with config when called.", async() => {
      await getQuestionThemeStatsHandler(mockedEvent);
      const expectedGoatItApiConfig: SharedRuntimeConfig["goatItApi"] = {
        baseUrl: "https://api.goat-it.com",
        adminKey: "test-admin-key",
      };

      expect(createGoatItApiFetchOptions).toHaveBeenCalledExactlyOnceWith(expectedGoatItApiConfig);
    });

    it("should fetch question theme stats from goat it api with correct endpoint and fetch options when called.", async() => {
      const expectedEndpoint = "/admin/question-themes/stats";
      const expectedFetchOptions = {
        baseURL: "https://api.goat-it.com",
        headers: {
          "goat-it-api-key": "test-admin-key",
        },
      };
      vi.mocked(createGoatItApiEndpoint).mockReturnValue("/admin/question-themes");
      vi.mocked(createGoatItApiFetchOptions).mockReturnValue(expectedFetchOptions);
      await getQuestionThemeStatsHandler(mockedEvent);

      expect($fetch).toHaveBeenCalledExactlyOnceWith(expectedEndpoint, expectedFetchOptions);
    });

    it("should return parsed question theme stats when called.", async() => {
      const fakeQuestionThemeStats = createFakeQuestionThemeStatsDto();
      vi.mocked($fetch).mockResolvedValue(fakeQuestionThemeStats);

      const result = await getQuestionThemeStatsHandler(mockedEvent);

      expect(result).toStrictEqual(fakeQuestionThemeStats);
    });

    it("should call handleGoatItApiError when $fetch throws an error.", async() => {
      const fetchError = new Error("Network error");
      vi.mocked($fetch).mockRejectedValue(fetchError);

      try {
        await getQuestionThemeStatsHandler(mockedEvent);
      } catch(error: unknown) {
        void error;
      }

      expect(handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(fetchError);
    });

    it("should call handleGoatItApiError with zod error when the fetched data is invalid.", async() => {
      vi.mocked($fetch).mockResolvedValue({ total: "not-a-number" });

      try {
        await getQuestionThemeStatsHandler(mockedEvent);
      } catch(error: unknown) {
        void error;
      }

      expect(handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(expect.any(ZodError));
    });
  });
});