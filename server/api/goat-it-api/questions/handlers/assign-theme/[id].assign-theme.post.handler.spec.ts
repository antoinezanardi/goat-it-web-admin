import { vi, describe, it, expect, beforeEach } from "vitest";
import { ZodError } from "zod";
import { createFakeAdminQuestionDto, createFakeQuestionThemeAssignmentCreationDto } from "@goat-it/schemas/testing/question";

import { createFakeH3Event } from "~~/tests/unit/utils/faketories/shared/h3/h3-event.faketory";

import { createQuestionFromAdminQuestionDto } from "#server/utils/goat-it-api/mappers/question/question.mappers";
import type { SharedRuntimeConfig } from "#build/types/runtime-config";
import { createGoatItApiEndpoint, createGoatItApiFetchOptions, handleGoatItApiError } from "#server/utils/goat-it-api/helpers/goat-it-api.helpers";
import { assignThemeToQuestionHandler } from "#server/api/goat-it-api/questions/handlers/assign-theme/[id].assign-theme.post.handler";
import { getRequiredRouterParam } from "#server/utils/router/router.helpers";

vi.mock(import("#server/utils/goat-it-api/helpers/goat-it-api.helpers"));
vi.mock(import("#server/utils/router/router.helpers"));

describe("Server Goat It API Questions Assign Theme Handler", () => {
  const fakeId = "abc123";
  const fakeAssignmentDto = createFakeQuestionThemeAssignmentCreationDto();
  const mockedEvent = createFakeH3Event({ params: { id: fakeId } });

  beforeEach(() => {
    vi.mocked($fetch).mockResolvedValue(createFakeAdminQuestionDto({ author: { role: "admin", name: "Test Admin" } }));
    vi.mocked(getRequiredRouterParam).mockReturnValue(fakeId);
    vi.mocked(readBody).mockResolvedValue(fakeAssignmentDto);
    vi.mocked(createGoatItApiEndpoint).mockReturnValue(`/admin/questions/${fakeId}`);
  });

  describe(assignThemeToQuestionHandler, () => {
    it("should get router param id from event when called.", async() => {
      await assignThemeToQuestionHandler(mockedEvent);

      expect(getRequiredRouterParam).toHaveBeenCalledExactlyOnceWith(mockedEvent, "id", "Question id is required");
    });

    it("should create goat it api endpoint with id when called.", async() => {
      await assignThemeToQuestionHandler(mockedEvent);

      expect(createGoatItApiEndpoint).toHaveBeenCalledExactlyOnceWith("questions", fakeId);
    });

    it("should create goat it api fetch options with config when called.", async() => {
      await assignThemeToQuestionHandler(mockedEvent);
      const expectedGoatItApiConfig: SharedRuntimeConfig["goatItApi"] = {
        baseUrl: "https://api.goat-it.com",
        adminKey: "test-admin-key",
      };

      expect(createGoatItApiFetchOptions).toHaveBeenCalledExactlyOnceWith(expectedGoatItApiConfig);
    });

    it("should read body from event when called.", async() => {
      await assignThemeToQuestionHandler(mockedEvent);

      expect(readBody).toHaveBeenCalledExactlyOnceWith(mockedEvent);
    });

    it("should fetch with POST method and body to themes endpoint when called.", async() => {
      const expectedEndpoint = `/admin/questions/${fakeId}`;
      const expectedFetchOptions = {
        baseURL: "https://api.goat-it.com",
        headers: {
          "goat-it-api-key": "test-admin-key",
        },
      };
      vi.mocked(createGoatItApiFetchOptions).mockReturnValue(expectedFetchOptions);
      await assignThemeToQuestionHandler(mockedEvent);

      expect($fetch).toHaveBeenCalledExactlyOnceWith(`${expectedEndpoint}/themes`, {
        ...expectedFetchOptions,
        method: "POST",
        body: fakeAssignmentDto,
      });
    });

    it("should return mapped question when called.", async() => {
      const fakeAdminQuestionDto = createFakeAdminQuestionDto({ author: { role: "admin", name: "Test Admin" } });
      vi.mocked($fetch).mockResolvedValue(fakeAdminQuestionDto);
      const expectedQuestion = createQuestionFromAdminQuestionDto(fakeAdminQuestionDto);
      const result = await assignThemeToQuestionHandler(mockedEvent);

      expect(result).toStrictEqual(expectedQuestion);
    });

    it("should call handleGoatItApiError when $fetch throws an error.", async() => {
      const fetchError = new Error("Network error");
      vi.mocked($fetch).mockRejectedValue(fetchError);

      try {
        await assignThemeToQuestionHandler(mockedEvent);
      } catch(error: unknown) {
        void error;
      }

      expect(handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(fetchError);
    });

    it("should throw an error when the request body is invalid.", async() => {
      vi.mocked(readBody).mockResolvedValue({ invalid: "body" });

      await expect(assignThemeToQuestionHandler(mockedEvent)).rejects.toThrow(ZodError);
    });

    it("should call handleGoatItApiError with zod error when the fetched response is invalid.", async() => {
      vi.mocked($fetch).mockResolvedValue({
        id: "invalid-id",
        name: "Invalid Question",
      });

      try {
        await assignThemeToQuestionHandler(mockedEvent);
      } catch(error: unknown) {
        void error;
      }

      expect(handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(expect.any(ZodError));
    });

    it("should throw when getRequiredRouterParam throws for missing id.", async() => {
      vi.mocked(getRequiredRouterParam).mockImplementation(() => {
        throw new Error("Question id is required");
      });

      await expect(assignThemeToQuestionHandler(mockedEvent)).rejects.toThrow("Question id is required");
    });
  });
});