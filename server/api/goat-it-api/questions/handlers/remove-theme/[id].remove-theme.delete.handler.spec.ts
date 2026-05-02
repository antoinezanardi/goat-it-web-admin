import type { H3Event } from "h3";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { ZodError } from "zod";

import { createFakeAdminQuestionDto } from "~~/tests/unit/utils/faketories/questions/dto/question.dto.faketory";

import { createQuestionFromAdminQuestionDto } from "#server/utils/goat-it-api/mappers/question/question.mappers";
import type { SharedRuntimeConfig } from "#build/types/runtime-config";
import { createGoatItApiEndpoint, createGoatItApiFetchOptions, handleGoatItApiError } from "#server/utils/goat-it-api/helpers/goat-it-api.helpers";
import { removeThemeFromQuestionHandler } from "#server/api/goat-it-api/questions/handlers/remove-theme/[id].remove-theme.delete.handler";
import { getRequiredRouterParam } from "#server/utils/router/router.helpers";

vi.mock(import("#server/utils/goat-it-api/helpers/goat-it-api.helpers"));
vi.mock(import("#server/utils/router/router.helpers"));

describe("Server Goat It API Questions Remove Theme Handler", () => {
  const fakeId = "abc123";
  const fakeThemeId = "def456";
  const mockedEvent = { context: { params: { id: fakeId, themeId: fakeThemeId } } } as unknown as H3Event;

  beforeEach(() => {
    vi.mocked($fetch).mockResolvedValue(createFakeAdminQuestionDto({ author: { role: "admin", name: "Test Admin" } }));
    vi.mocked(getRequiredRouterParam).mockImplementation((_event, parameterName, _errorMessage) => {
      const parameters: Record<string, string> = { "id": fakeId, "theme-id": fakeThemeId };

      return parameters[parameterName] ?? "";
    });
    vi.mocked(createGoatItApiEndpoint).mockReturnValue(`/admin/questions/${fakeId}`);
  });

  describe(removeThemeFromQuestionHandler, () => {
    it("should get router param id from event when called.", async() => {
      await removeThemeFromQuestionHandler(mockedEvent);

      expect(getRequiredRouterParam).toHaveBeenCalledWith(mockedEvent, "id", "Question id is required");
    });

    it("should get router param theme-id from event when called.", async() => {
      await removeThemeFromQuestionHandler(mockedEvent);

      expect(getRequiredRouterParam).toHaveBeenCalledWith(mockedEvent, "theme-id", "Theme id is required");
    });

    it("should create goat it api endpoint with id when called.", async() => {
      await removeThemeFromQuestionHandler(mockedEvent);

      expect(createGoatItApiEndpoint).toHaveBeenCalledExactlyOnceWith("questions", fakeId);
    });

    it("should create goat it api fetch options with config when called.", async() => {
      await removeThemeFromQuestionHandler(mockedEvent);
      const expectedGoatItApiConfig: SharedRuntimeConfig["goatItApi"] = {
        baseUrl: "https://api.goat-it.com",
        adminKey: "test-admin-key",
      };

      expect(createGoatItApiFetchOptions).toHaveBeenCalledExactlyOnceWith(expectedGoatItApiConfig);
    });

    it("should fetch with DELETE method to themes endpoint when called.", async() => {
      const expectedEndpoint = `/admin/questions/${fakeId}`;
      const expectedFetchOptions = {
        baseURL: "https://api.goat-it.com",
        headers: {
          "goat-it-api-key": "test-admin-key",
        },
      };
      vi.mocked(createGoatItApiFetchOptions).mockReturnValue(expectedFetchOptions);
      await removeThemeFromQuestionHandler(mockedEvent);

      expect($fetch).toHaveBeenCalledExactlyOnceWith(`${expectedEndpoint}/themes/${fakeThemeId}`, {
        ...expectedFetchOptions,
        method: "DELETE",
      });
    });

    it("should return mapped question when called.", async() => {
      const fakeAdminQuestionDto = createFakeAdminQuestionDto({ author: { role: "admin", name: "Test Admin" } });
      vi.mocked($fetch).mockResolvedValue(fakeAdminQuestionDto);
      const expectedQuestion = createQuestionFromAdminQuestionDto(fakeAdminQuestionDto);
      const result = await removeThemeFromQuestionHandler(mockedEvent);

      expect(result).toStrictEqual(expectedQuestion);
    });

    it("should call handleGoatItApiError when $fetch throws an error.", async() => {
      const fetchError = new Error("Network error");
      vi.mocked($fetch).mockRejectedValue(fetchError);

      try {
        await removeThemeFromQuestionHandler(mockedEvent);
      } catch(error: unknown) {
        void error;
      }

      expect(handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(fetchError);
    });

    it("should call handleGoatItApiError with zod error when the fetched data is invalid.", async() => {
      vi.mocked($fetch).mockResolvedValue({
        id: "invalid-id",
        name: "Invalid Question",
      });

      try {
        await removeThemeFromQuestionHandler(mockedEvent);
      } catch(error: unknown) {
        void error;
      }

      expect(handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(expect.any(ZodError));
    });

    it("should throw when getRequiredRouterParam throws for missing id.", async() => {
      vi.mocked(getRequiredRouterParam).mockImplementation(() => {
        throw new Error("Question id is required");
      });

      await expect(removeThemeFromQuestionHandler(mockedEvent)).rejects.toThrow("Question id is required");
    });

    it("should throw when getRequiredRouterParam throws for missing theme-id.", async() => {
      vi.mocked(getRequiredRouterParam)
        .mockReturnValueOnce(fakeId)
        .mockImplementation(() => {
          throw new Error("Theme id is required");
        });

      await expect(removeThemeFromQuestionHandler(mockedEvent)).rejects.toThrow("Theme id is required");
    });
  });
});