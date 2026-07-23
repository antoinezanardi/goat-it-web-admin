import { vi, describe, it, expect, beforeEach } from "vitest";
import { ZodError } from "zod";
import { createFakeAdminQuestionThemeDto } from "@goat-it/schemas/testing/question-theme";

import { createFakeH3Event } from "~~/tests/unit/utils/faketories/shared/h3/h3-event.faketory";

import { createQuestionThemeFromAdminQuestionThemeDto } from "#server/utils/goat-it-api/mappers/goat-it-api.mappers";
import type { SharedRuntimeConfig } from "#build/types/runtime-config";
import { createGoatItApiEndpoint, createGoatItApiFetchOptions, handleGoatItApiError } from "#server/utils/goat-it-api/helpers/goat-it-api.helpers";
import { archiveQuestionThemeHandler } from "#server/api/goat-it-api/question-themes/handlers/archive/[id].archive.post.handler";
import { getRequiredRouterParam } from "#server/utils/router/router.helpers";

vi.mock(import("#server/utils/goat-it-api/helpers/goat-it-api.helpers"));
vi.mock(import("#server/utils/router/router.helpers"));

describe("Server Goat It API Question Theme Archive Handler", () => {
  const fakeId = "abc123";
  const mockedEvent = createFakeH3Event({ params: { id: fakeId } });

  beforeEach(() => {
    vi.mocked($fetch).mockResolvedValue(createFakeAdminQuestionThemeDto());
    vi.mocked(getRequiredRouterParam).mockReturnValue(fakeId);
    vi.mocked(createGoatItApiEndpoint).mockReturnValue(`/admin/question-themes/${fakeId}`);
  });

  describe(archiveQuestionThemeHandler, () => {
    it("should get router param id from event when called.", async() => {
      await archiveQuestionThemeHandler(mockedEvent);

      expect(getRequiredRouterParam).toHaveBeenCalledExactlyOnceWith(mockedEvent, "id", "Question theme id is required");
    });

    it("should create goat it api endpoint with id when called.", async() => {
      await archiveQuestionThemeHandler(mockedEvent);

      expect(createGoatItApiEndpoint).toHaveBeenCalledExactlyOnceWith("question-themes", fakeId);
    });

    it("should create goat it api fetch options with config when called.", async() => {
      await archiveQuestionThemeHandler(mockedEvent);
      const expectedGoatItApiConfig: SharedRuntimeConfig["goatItApi"] = {
        baseUrl: "https://api.goat-it.com",
        adminKey: "test-admin-key",
      };

      expect(createGoatItApiFetchOptions).toHaveBeenCalledExactlyOnceWith(expectedGoatItApiConfig);
    });

    it("should fetch with POST method and archive endpoint when called.", async() => {
      const expectedEndpoint = `/admin/question-themes/${fakeId}/archive`;
      const expectedFetchOptions = {
        baseURL: "https://api.goat-it.com",
        headers: {
          "goat-it-api-key": "test-admin-key",
        },
      };
      vi.mocked(createGoatItApiFetchOptions).mockReturnValue(expectedFetchOptions);
      await archiveQuestionThemeHandler(mockedEvent);

      expect($fetch).toHaveBeenCalledExactlyOnceWith(expectedEndpoint, {
        ...expectedFetchOptions,
        method: "POST",
      });
    });

    it("should return mapped archived question theme when called.", async() => {
      const fakeAdminQuestionThemeDto = createFakeAdminQuestionThemeDto();
      vi.mocked($fetch).mockResolvedValue(fakeAdminQuestionThemeDto);
      const expectedQuestionTheme = createQuestionThemeFromAdminQuestionThemeDto(fakeAdminQuestionThemeDto);
      const result = await archiveQuestionThemeHandler(mockedEvent);

      expect(result).toStrictEqual(expectedQuestionTheme);
    });

    it("should call handleGoatItApiError when $fetch throws an error.", async() => {
      const fetchError = new Error("Network error");
      vi.mocked($fetch).mockRejectedValue(fetchError);

      try {
        await archiveQuestionThemeHandler(mockedEvent);
      } catch(error: unknown) {
        void error;
      }

      expect(handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(fetchError);
    });

    it("should call handleGoatItApiError with zod error when the fetched response is invalid.", async() => {
      vi.mocked($fetch).mockResolvedValue({
        id: "invalid-id",
        name: "Invalid Question Theme",
        description: "This question theme has an invalid structure.",
      });

      try {
        await archiveQuestionThemeHandler(mockedEvent);
      } catch(error: unknown) {
        void error;
      }

      expect(handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(expect.any(ZodError));
    });

    it("should throw when getRequiredRouterParam throws for missing id.", async() => {
      vi.mocked(getRequiredRouterParam).mockImplementation(() => {
        throw new Error("Question theme id is required");
      });

      await expect(archiveQuestionThemeHandler(mockedEvent)).rejects.toThrow("Question theme id is required");
    });
  });
});