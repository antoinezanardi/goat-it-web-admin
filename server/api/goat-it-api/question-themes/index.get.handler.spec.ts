import type { AdminQuestionThemeDto } from "@goat-it/schemas/question-theme";
import type { H3Event } from "h3";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { ZodError } from "zod";

import { createFakeAdminQuestionThemeDto } from "~~/tests/unit/utils/faketories/question-themes/dto/question-theme.dto.faketory";

import type { SharedRuntimeConfig } from "#build/types/runtime-config";
import { createGoatItApiEndpoint, createGoatItApiFetchOptions } from "#server/api/goat-it-api/helpers/goat-it-api.helpers";
import { getQuestionThemesHandler } from "#server/api/goat-it-api/question-themes/index.get.handler";

vi.mock(import("#server/api/goat-it-api/helpers/goat-it-api.helpers"));

describe("Server Goat It API Question Themes Get Endpoint", () => {
  beforeEach(() => {
    vi.mocked($fetch).mockResolvedValue([
      createFakeAdminQuestionThemeDto(),
      createFakeAdminQuestionThemeDto(),
      createFakeAdminQuestionThemeDto(),
    ]);
  });

  describe(getQuestionThemesHandler, () => {
    it("should create goat it api endpoint when called.", async() => {
      const mockedEvent = {} as unknown as H3Event;
      await getQuestionThemesHandler(mockedEvent);

      expect(createGoatItApiEndpoint).toHaveBeenCalledExactlyOnceWith("question-themes");
    });

    it("should create goat it api fetch options with config when called.", async() => {
      const mockedEvent = {} as unknown as H3Event;
      await getQuestionThemesHandler(mockedEvent);
      const expectedGoatItApiConfig: SharedRuntimeConfig["goatItApi"] = {
        baseUrl: "https://api.goat-it.com",
        adminKey: "test-admin-key",
      };

      expect(createGoatItApiFetchOptions).toHaveBeenCalledExactlyOnceWith(expectedGoatItApiConfig);
    });

    it("should fetch question themes from goat it api with correct endpoint and fetch options when called.", async() => {
      const mockedEvent = {} as unknown as H3Event;
      const expectedEndpoint = "/admin/question-themes";
      const expectedFetchOptions = {
        baseURL: "https://api.goat-it.com",
        headers: {
          "goat-it-api-key": "test-admin-key",
        },
      };
      vi.mocked(createGoatItApiEndpoint).mockReturnValue(expectedEndpoint);
      vi.mocked(createGoatItApiFetchOptions).mockReturnValue(expectedFetchOptions);
      await getQuestionThemesHandler(mockedEvent);

      expect($fetch).toHaveBeenCalledExactlyOnceWith(expectedEndpoint, expectedFetchOptions);
    });

    it("should return parsed question themes when called.", async() => {
      const mockedEvent = {} as unknown as H3Event;
      const fakeQuestionThemes = [
        createFakeAdminQuestionThemeDto(),
        createFakeAdminQuestionThemeDto(),
        createFakeAdminQuestionThemeDto(),
      ];
      vi.mocked($fetch).mockResolvedValue(fakeQuestionThemes);
      const result = await getQuestionThemesHandler(mockedEvent);

      expect(result).toStrictEqual<AdminQuestionThemeDto[]>(fakeQuestionThemes);
    });

    it("should throw an error when the fetched data is invalid.", async() => {
      const mockedEvent = {} as unknown as H3Event;
      vi.mocked($fetch).mockResolvedValue([
        {
          id: "invalid-id",
          name: "Invalid Question Theme",
          description: "This question theme has an invalid ID.",
        },
      ]);

      await expect(getQuestionThemesHandler(mockedEvent)).rejects.toThrow(ZodError);
    });
  });
});