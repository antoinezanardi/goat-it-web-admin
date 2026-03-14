import type { H3Event } from "h3";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { ZodError } from "zod";

import { createFakeAdminQuestionThemeDto } from "~~/tests/unit/utils/faketories/question-themes/dto/question-theme.dto.faketory";

import { createQuestionThemeFromAdminQuestionThemeDto } from "#server/utils/goat-it-api/mappers/goat-it-api.mappers";
import type { SharedRuntimeConfig } from "#build/types/runtime-config";
import { createGoatItApiEndpoint, createGoatItApiFetchOptions } from "#server/utils/goat-it-api/helpers/goat-it-api.helpers";
import { archiveQuestionThemeHandler } from "#server/api/goat-it-api/question-themes/[id].archive.post.handler";

vi.mock(import("#server/utils/goat-it-api/helpers/goat-it-api.helpers"));

describe("Server Goat It API Question Theme Archive Handler", () => {
  const fakeId = "abc123";
  const mockedEvent = { context: { params: { id: fakeId } } } as unknown as H3Event;

  beforeEach(() => {
    vi.mocked($fetch).mockResolvedValue(createFakeAdminQuestionThemeDto());
    vi.mocked(getRouterParam).mockReturnValue(fakeId);
    vi.mocked(createGoatItApiEndpoint).mockReturnValue(`/admin/question-themes/${fakeId}`);
  });

  describe(archiveQuestionThemeHandler, () => {
    it("should get router param id from event when called.", async() => {
      await archiveQuestionThemeHandler(mockedEvent);

      expect(getRouterParam).toHaveBeenCalledExactlyOnceWith(mockedEvent, "id");
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

      expect(result).toStrictEqual<QuestionTheme>(expectedQuestionTheme);
    });

    it("should throw an error when the fetched response is invalid.", async() => {
      vi.mocked($fetch).mockResolvedValue({
        id: "invalid-id",
        name: "Invalid Question Theme",
        description: "This question theme has an invalid structure.",
      });

      await expect(archiveQuestionThemeHandler(mockedEvent)).rejects.toThrow(ZodError);
    });

    it("should use empty string as id when router param is undefined.", async() => {
      vi.mocked(getRouterParam).mockReset();
      await archiveQuestionThemeHandler(mockedEvent);

      expect(createGoatItApiEndpoint).toHaveBeenCalledExactlyOnceWith("question-themes", "");
    });
  });
});