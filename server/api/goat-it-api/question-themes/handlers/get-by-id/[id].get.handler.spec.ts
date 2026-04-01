import type { H3Event } from "h3";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { ZodError } from "zod";

import { createFakeAdminQuestionThemeDto } from "~~/tests/unit/utils/faketories/question-themes/dto/question-theme.dto.faketory";

import { createQuestionThemeFromAdminQuestionThemeDto } from "#server/utils/goat-it-api/mappers/goat-it-api.mappers";
import type { SharedRuntimeConfig } from "#build/types/runtime-config";
import { createGoatItApiEndpoint, createGoatItApiFetchOptions } from "#server/utils/goat-it-api/helpers/goat-it-api.helpers";
import { getQuestionThemeHandler } from "#server/api/goat-it-api/question-themes/handlers/get-by-id/[id].get.handler";
import { HttpStatusCode } from "#server/utils/http/http.enums";

vi.mock(import("#server/utils/goat-it-api/helpers/goat-it-api.helpers"));

describe("Server Goat It API Question Theme Get Handler", () => {
  const fakeId = "abc123";
  const mockedEvent = { context: { params: { id: fakeId } } } as unknown as H3Event;

  beforeEach(() => {
    vi.mocked($fetch).mockResolvedValue(createFakeAdminQuestionThemeDto());
    vi.mocked(getRouterParam).mockReturnValue(fakeId);
  });

  describe(getQuestionThemeHandler, () => {
    it("should get router param id from event when called.", async() => {
      await getQuestionThemeHandler(mockedEvent);

      expect(getRouterParam).toHaveBeenCalledExactlyOnceWith(mockedEvent, "id");
    });

    it("should create goat it api endpoint with id when called.", async() => {
      await getQuestionThemeHandler(mockedEvent);

      expect(createGoatItApiEndpoint).toHaveBeenCalledExactlyOnceWith("question-themes", fakeId);
    });

    it("should create goat it api fetch options with config when called.", async() => {
      await getQuestionThemeHandler(mockedEvent);
      const expectedGoatItApiConfig: SharedRuntimeConfig["goatItApi"] = {
        baseUrl: "https://api.goat-it.com",
        adminKey: "test-admin-key",
      };

      expect(createGoatItApiFetchOptions).toHaveBeenCalledExactlyOnceWith(expectedGoatItApiConfig);
    });

    it("should fetch question theme from goat it api with correct endpoint and fetch options when called.", async() => {
      const expectedEndpoint = "/admin/question-themes/abc123";
      const expectedFetchOptions = {
        baseURL: "https://api.goat-it.com",
        headers: {
          "goat-it-api-key": "test-admin-key",
        },
      };
      vi.mocked(createGoatItApiEndpoint).mockReturnValue(expectedEndpoint);
      vi.mocked(createGoatItApiFetchOptions).mockReturnValue(expectedFetchOptions);
      await getQuestionThemeHandler(mockedEvent);

      expect($fetch).toHaveBeenCalledExactlyOnceWith(expectedEndpoint, expectedFetchOptions);
    });

    it("should return mapped question theme when called.", async() => {
      const fakeAdminQuestionThemeDto = createFakeAdminQuestionThemeDto();
      vi.mocked($fetch).mockResolvedValue(fakeAdminQuestionThemeDto);
      const expectedQuestionTheme = createQuestionThemeFromAdminQuestionThemeDto(fakeAdminQuestionThemeDto);
      const result = await getQuestionThemeHandler(mockedEvent);

      expect(result).toStrictEqual(expectedQuestionTheme);
    });

    it("should throw an error when the fetched data is invalid.", async() => {
      vi.mocked($fetch).mockResolvedValue({
        id: "invalid-id",
        name: "Invalid Question Theme",
        description: "This question theme has an invalid structure.",
      });

      await expect(getQuestionThemeHandler(mockedEvent)).rejects.toThrow(ZodError);
    });

    it("should throw a 400 error when router param id is undefined.", async() => {
      vi.mocked(getRouterParam).mockReset();
      vi.mocked(createError).mockThrow(new Error("Question theme id is required"));

      await expect(getQuestionThemeHandler(mockedEvent)).rejects.toThrow("Question theme id is required");
    });

    it("should call createError with correct status code and message when router param id is undefined.", async() => {
      vi.mocked(getRouterParam).mockReset();
      vi.mocked(createError).mockThrow(new Error("Question theme id is required"));

      try {
        await getQuestionThemeHandler(mockedEvent);
      } catch(error: unknown) {
        void error;
      }

      expect(createError).toHaveBeenCalledExactlyOnceWith({
        statusCode: HttpStatusCode.BAD_REQUEST,
        message: "Question theme id is required",
      });
    });

    it("should throw a 400 error when router param id is an empty string.", async() => {
      vi.mocked(getRouterParam).mockReturnValue("");
      vi.mocked(createError).mockThrow(new Error("Question theme id is required"));

      await expect(getQuestionThemeHandler(mockedEvent)).rejects.toThrow("Question theme id is required");
    });

    it("should call createError with correct status code and message when router param id is an empty string.", async() => {
      vi.mocked(getRouterParam).mockReturnValue("");
      vi.mocked(createError).mockThrow(new Error("Question theme id is required"));

      try {
        await getQuestionThemeHandler(mockedEvent);
      } catch(error: unknown) {
        void error;
      }

      expect(createError).toHaveBeenCalledExactlyOnceWith({ statusCode: HttpStatusCode.BAD_REQUEST, message: "Question theme id is required" });
    });
  });
});