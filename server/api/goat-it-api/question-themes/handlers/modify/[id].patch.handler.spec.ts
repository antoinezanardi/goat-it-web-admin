import type { H3Event } from "h3";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { ZodError } from "zod";

import { createFakeAdminQuestionThemeDto, createFakeQuestionThemeModificationDto } from "~~/tests/unit/utils/faketories/question-themes/dto/question-theme.dto.faketory";

import { createQuestionThemeFromAdminQuestionThemeDto } from "#server/utils/goat-it-api/mappers/goat-it-api.mappers";
import type { SharedRuntimeConfig } from "#build/types/runtime-config";
import { createGoatItApiEndpoint, createGoatItApiFetchOptions, handleGoatItApiError } from "#server/utils/goat-it-api/helpers/goat-it-api.helpers";
import { patchQuestionThemeHandler } from "#server/api/goat-it-api/question-themes/handlers/modify/[id].patch.handler";
import { HttpStatusCode } from "#server/utils/http/http.enums";

vi.mock(import("#server/utils/goat-it-api/helpers/goat-it-api.helpers"));

describe("Server Goat It API Question Theme Patch Handler", () => {
  const fakeId = "abc123";
  const fakeModificationDto = createFakeQuestionThemeModificationDto();
  const mockedEvent = {
    context: {
      params: { id: fakeId },
    },
    body: fakeModificationDto,
  } as unknown as H3Event;

  beforeEach(() => {
    vi.mocked($fetch).mockResolvedValue(createFakeAdminQuestionThemeDto());
    vi.mocked(getRouterParam).mockReturnValue(fakeId);
    vi.mocked(readBody).mockResolvedValue(fakeModificationDto);
  });

  describe(patchQuestionThemeHandler, () => {
    it("should get router param id from event when called.", async() => {
      await patchQuestionThemeHandler(mockedEvent);

      expect(getRouterParam).toHaveBeenCalledExactlyOnceWith(mockedEvent, "id");
    });

    it("should create goat it api endpoint with id when called.", async() => {
      await patchQuestionThemeHandler(mockedEvent);

      expect(createGoatItApiEndpoint).toHaveBeenCalledExactlyOnceWith("question-themes", fakeId);
    });

    it("should create goat it api fetch options with config when called.", async() => {
      await patchQuestionThemeHandler(mockedEvent);
      const expectedGoatItApiConfig: SharedRuntimeConfig["goatItApi"] = {
        baseUrl: "https://api.goat-it.com",
        adminKey: "test-admin-key",
      };

      expect(createGoatItApiFetchOptions).toHaveBeenCalledExactlyOnceWith(expectedGoatItApiConfig);
    });

    it("should fetch with PATCH method, id endpoint and body when called.", async() => {
      const expectedEndpoint = "/admin/question-themes/abc123";
      const expectedFetchOptions = {
        baseURL: "https://api.goat-it.com",
        headers: {
          "goat-it-api-key": "test-admin-key",
        },
      };
      vi.mocked(createGoatItApiEndpoint).mockReturnValue(expectedEndpoint);
      vi.mocked(createGoatItApiFetchOptions).mockReturnValue(expectedFetchOptions);
      await patchQuestionThemeHandler(mockedEvent);

      expect($fetch).toHaveBeenCalledExactlyOnceWith(expectedEndpoint, {
        ...expectedFetchOptions,
        method: "PATCH",
        body: fakeModificationDto,
      });
    });

    it("should return mapped question theme when called.", async() => {
      const fakeAdminQuestionThemeDto = createFakeAdminQuestionThemeDto();
      vi.mocked($fetch).mockResolvedValue(fakeAdminQuestionThemeDto);
      const expectedQuestionTheme = createQuestionThemeFromAdminQuestionThemeDto(fakeAdminQuestionThemeDto);
      const result = await patchQuestionThemeHandler(mockedEvent);

      expect(result).toStrictEqual(expectedQuestionTheme);
    });

    it("should call handleGoatItApiError when $fetch throws an error.", async() => {
      const fetchError = new Error("Network error");
      vi.mocked($fetch).mockRejectedValue(fetchError);
      vi.mocked(getRouterParam).mockReturnValue("valid-id");

      await patchQuestionThemeHandler(mockedEvent).catch(() => {});

      expect(handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(fetchError);
    });

    it("should throw an error when the request body is invalid.", async() => {
      vi.mocked(readBody).mockResolvedValue({ slug: 123 });

      await expect(patchQuestionThemeHandler(mockedEvent)).rejects.toThrow(ZodError);
    });

    it("should call handleGoatItApiError with zod error when the fetched response is invalid.", async() => {
      vi.mocked($fetch).mockResolvedValue({
        id: "invalid-id",
        name: "Invalid Question Theme",
        description: "This question theme has an invalid structure.",
      });

      await patchQuestionThemeHandler(mockedEvent).catch(() => {});

      expect(handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(expect.any(ZodError));
    });

    it("should throw a 400 error when router param id is undefined.", async() => {
      vi.mocked(getRouterParam).mockReset();
      vi.mocked(createError).mockThrow(new Error("Question theme id is required"));

      await expect(patchQuestionThemeHandler(mockedEvent)).rejects.toThrow("Question theme id is required");
    });

    it("should call createError with correct status code and message when router param id is undefined.", async() => {
      vi.mocked(getRouterParam).mockReset();
      vi.mocked(createError).mockThrow(new Error("Question theme id is required"));

      try {
        await patchQuestionThemeHandler(mockedEvent);
      } catch(error: unknown) {
        void error;
      }

      expect(createError).toHaveBeenCalledExactlyOnceWith({ statusCode: HttpStatusCode.BAD_REQUEST, message: "Question theme id is required" });
    });

    it("should throw a 400 error when router param id is an empty string.", async() => {
      vi.mocked(getRouterParam).mockReturnValue("");
      vi.mocked(createError).mockThrow(new Error("Question theme id is required"));

      await expect(patchQuestionThemeHandler(mockedEvent)).rejects.toThrow("Question theme id is required");
    });

    it("should call createError with correct status code and message when router param id is an empty string.", async() => {
      vi.mocked(getRouterParam).mockReturnValue("");
      vi.mocked(createError).mockThrow(new Error("Question theme id is required"));

      try {
        await patchQuestionThemeHandler(mockedEvent);
      } catch(error: unknown) {
        void error;
      }

      expect(createError).toHaveBeenCalledExactlyOnceWith({
        statusCode: HttpStatusCode.BAD_REQUEST,
        message: "Question theme id is required",
      });
    });
  });
});