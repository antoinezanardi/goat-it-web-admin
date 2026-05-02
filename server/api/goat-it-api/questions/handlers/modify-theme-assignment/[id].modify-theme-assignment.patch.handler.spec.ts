import { vi, describe, it, expect, beforeEach } from "vitest";
import { ZodError } from "zod";

import { createFakeAdminQuestionDto } from "~~/tests/unit/utils/faketories/questions/dto/question.dto.faketory";
import { createFakeQuestionThemeAssignmentModificationDto } from "~~/tests/unit/utils/faketories/questions/dto/question-theme-assignment-modification/question-theme-assignment-modification.dto.faketory";
import { createFakeH3Event } from "~~/tests/unit/utils/faketories/shared/h3/h3-event.faketory";

import { createQuestionFromAdminQuestionDto } from "#server/utils/goat-it-api/mappers/question/question.mappers";
import type { SharedRuntimeConfig } from "#build/types/runtime-config";
import { createGoatItApiEndpoint, createGoatItApiFetchOptions, handleGoatItApiError } from "#server/utils/goat-it-api/helpers/goat-it-api.helpers";
import { modifyThemeAssignmentHandler } from "#server/api/goat-it-api/questions/handlers/modify-theme-assignment/[id].modify-theme-assignment.patch.handler";
import { getRequiredRouterParam } from "#server/utils/router/router.helpers";

vi.mock(import("#server/utils/goat-it-api/helpers/goat-it-api.helpers"));
vi.mock(import("#server/utils/router/router.helpers"));

describe("Server Goat It API Questions Modify Theme Assignment Handler", () => {
  const fakeId = "abc123";
  const fakeThemeId = "def456";
  const fakeModificationDto = createFakeQuestionThemeAssignmentModificationDto();
  const mockedEvent = createFakeH3Event({ params: { id: fakeId, themeId: fakeThemeId } });

  beforeEach(() => {
    vi.mocked($fetch).mockResolvedValue(createFakeAdminQuestionDto({ author: { role: "admin", name: "Test Admin" } }));
    vi.mocked(getRequiredRouterParam).mockImplementation((_event, parameterName, _errorMessage) => {
      const parameters: Record<string, string> = { "id": fakeId, "theme-id": fakeThemeId };

      return parameters[parameterName] ?? "";
    });
    vi.mocked(readBody).mockResolvedValue(fakeModificationDto);
    vi.mocked(createGoatItApiEndpoint).mockReturnValue(`/admin/questions/${fakeId}`);
  });

  describe(modifyThemeAssignmentHandler, () => {
    it("should get required router param id from event when called.", async() => {
      await modifyThemeAssignmentHandler(mockedEvent);

      expect(getRequiredRouterParam).toHaveBeenCalledWith(mockedEvent, "id", "Question id is required");
    });

    it("should get required router param theme-id from event when called.", async() => {
      await modifyThemeAssignmentHandler(mockedEvent);

      expect(getRequiredRouterParam).toHaveBeenCalledWith(mockedEvent, "theme-id", "Theme id is required");
    });

    it("should create goat it api endpoint with id when called.", async() => {
      await modifyThemeAssignmentHandler(mockedEvent);

      expect(createGoatItApiEndpoint).toHaveBeenCalledExactlyOnceWith("questions", fakeId);
    });

    it("should create goat it api fetch options with config when called.", async() => {
      await modifyThemeAssignmentHandler(mockedEvent);
      const expectedGoatItApiConfig: SharedRuntimeConfig["goatItApi"] = {
        baseUrl: "https://api.goat-it.com",
        adminKey: "test-admin-key",
      };

      expect(createGoatItApiFetchOptions).toHaveBeenCalledExactlyOnceWith(expectedGoatItApiConfig);
    });

    it("should read body from event when called.", async() => {
      await modifyThemeAssignmentHandler(mockedEvent);

      expect(readBody).toHaveBeenCalledExactlyOnceWith(mockedEvent);
    });

    it("should fetch with PATCH method and body to themes endpoint when called.", async() => {
      const expectedEndpoint = `/admin/questions/${fakeId}`;
      const expectedFetchOptions = {
        baseURL: "https://api.goat-it.com",
        headers: {
          "goat-it-api-key": "test-admin-key",
        },
      };
      vi.mocked(createGoatItApiFetchOptions).mockReturnValue(expectedFetchOptions);
      await modifyThemeAssignmentHandler(mockedEvent);

      expect($fetch).toHaveBeenCalledExactlyOnceWith(`${expectedEndpoint}/themes/${fakeThemeId}`, {
        ...expectedFetchOptions,
        method: "PATCH",
        body: fakeModificationDto,
      });
    });

    it("should return mapped question when called.", async() => {
      const fakeAdminQuestionDto = createFakeAdminQuestionDto({ author: { role: "admin", name: "Test Admin" } });
      vi.mocked($fetch).mockResolvedValue(fakeAdminQuestionDto);
      const expectedQuestion = createQuestionFromAdminQuestionDto(fakeAdminQuestionDto);
      const result = await modifyThemeAssignmentHandler(mockedEvent);

      expect(result).toStrictEqual(expectedQuestion);
    });

    it("should call handleGoatItApiError when $fetch throws an error.", async() => {
      const fetchError = new Error("Network error");
      vi.mocked($fetch).mockRejectedValue(fetchError);

      try {
        await modifyThemeAssignmentHandler(mockedEvent);
      } catch(error: unknown) {
        void error;
      }

      expect(handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(fetchError);
    });

    it("should throw an error when the request body is invalid.", async() => {
      vi.mocked(readBody).mockResolvedValue({ isPrimary: "not-a-boolean" });

      await expect(modifyThemeAssignmentHandler(mockedEvent)).rejects.toThrow(ZodError);
    });

    it("should call handleGoatItApiError with zod error when the fetched response is invalid.", async() => {
      vi.mocked($fetch).mockResolvedValue({
        id: "invalid-id",
        name: "Invalid Question",
      });

      try {
        await modifyThemeAssignmentHandler(mockedEvent);
      } catch(error: unknown) {
        void error;
      }

      expect(handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(expect.any(ZodError));
    });

    it("should throw when getRequiredRouterParam throws for missing id.", async() => {
      vi.mocked(getRequiredRouterParam).mockImplementation(() => {
        throw new Error("Question id is required");
      });

      await expect(modifyThemeAssignmentHandler(mockedEvent)).rejects.toThrow("Question id is required");
    });

    it("should throw when getRequiredRouterParam throws for missing theme-id.", async() => {
      vi.mocked(getRequiredRouterParam)
        .mockReturnValueOnce(fakeId)
        .mockImplementation(() => {
          throw new Error("Theme id is required");
        });

      await expect(modifyThemeAssignmentHandler(mockedEvent)).rejects.toThrow("Theme id is required");
    });
  });
});