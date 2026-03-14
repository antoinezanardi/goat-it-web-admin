import type { H3Event } from "h3";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { ZodError } from "zod";

import { createFakeAdminQuestionThemeDto, createFakeQuestionThemeCreationDto } from "~~/tests/unit/utils/faketories/question-themes/dto/question-theme.dto.faketory";

import { createQuestionThemeFromAdminQuestionThemeDto } from "#server/utils/goat-it-api/mappers/goat-it-api.mappers";
import type { SharedRuntimeConfig } from "#build/types/runtime-config";
import { createGoatItApiEndpoint, createGoatItApiFetchOptions } from "#server/utils/goat-it-api/helpers/goat-it-api.helpers";
import { createQuestionThemeHandler } from "#server/api/goat-it-api/question-themes/index.post.handler";

vi.mock(import("#server/utils/goat-it-api/helpers/goat-it-api.helpers"));

describe("Server Goat It API Question Theme Create Handler", () => {
  const fakeCreationDto = createFakeQuestionThemeCreationDto();
  const mockedEvent = { body: fakeCreationDto } as unknown as H3Event;

  beforeEach(() => {
    vi.mocked($fetch).mockResolvedValue(createFakeAdminQuestionThemeDto());
    vi.stubGlobal("readBody", vi.fn().mockResolvedValue(fakeCreationDto));
  });

  describe(createQuestionThemeHandler, () => {
    it("should create goat it api endpoint when called.", async() => {
      await createQuestionThemeHandler(mockedEvent);

      expect(createGoatItApiEndpoint).toHaveBeenCalledExactlyOnceWith("question-themes");
    });

    it("should create goat it api fetch options with config when called.", async() => {
      await createQuestionThemeHandler(mockedEvent);
      const expectedGoatItApiConfig: SharedRuntimeConfig["goatItApi"] = {
        baseUrl: "https://api.goat-it.com",
        adminKey: "test-admin-key",
      };

      expect(createGoatItApiFetchOptions).toHaveBeenCalledExactlyOnceWith(expectedGoatItApiConfig);
    });

    it("should fetch with POST method and body when called.", async() => {
      const expectedEndpoint = "/admin/question-themes";
      const expectedFetchOptions = {
        baseURL: "https://api.goat-it.com",
        headers: {
          "goat-it-api-key": "test-admin-key",
        },
      };
      vi.mocked(createGoatItApiEndpoint).mockReturnValue(expectedEndpoint);
      vi.mocked(createGoatItApiFetchOptions).mockReturnValue(expectedFetchOptions);
      await createQuestionThemeHandler(mockedEvent);

      expect($fetch).toHaveBeenCalledExactlyOnceWith(expectedEndpoint, {
        ...expectedFetchOptions,
        method: "POST",
        body: fakeCreationDto,
      });
    });

    it("should return mapped question theme when called.", async() => {
      const fakeAdminQuestionThemeDto = createFakeAdminQuestionThemeDto();
      vi.mocked($fetch).mockResolvedValue(fakeAdminQuestionThemeDto);
      const expectedQuestionTheme = createQuestionThemeFromAdminQuestionThemeDto(fakeAdminQuestionThemeDto);
      const result = await createQuestionThemeHandler(mockedEvent);

      expect(result).toStrictEqual<QuestionTheme>(expectedQuestionTheme);
    });

    it("should throw an error when the request body is invalid.", async() => {
      vi.mocked(readBody).mockResolvedValue({ invalid: "body" });

      await expect(createQuestionThemeHandler(mockedEvent)).rejects.toThrow(ZodError);
    });

    it("should throw an error when the fetched response is invalid.", async() => {
      vi.mocked($fetch).mockResolvedValue({
        id: "invalid-id",
        name: "Invalid Question Theme",
        description: "This question theme has an invalid structure.",
      });

      await expect(createQuestionThemeHandler(mockedEvent)).rejects.toThrow(ZodError);
    });
  });
});