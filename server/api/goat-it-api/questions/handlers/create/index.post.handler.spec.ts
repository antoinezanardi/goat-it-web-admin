import { vi, describe, it, expect, beforeEach } from "vitest";
import { ZodError } from "zod";

import { createFakeAdminQuestionDto, createFakeQuestionCreationDto } from "~~/tests/unit/utils/faketories/questions/dto/question.dto.faketory";
import { createFakeH3Event } from "~~/tests/unit/utils/faketories/shared/h3/h3-event.faketory";

import { createQuestionFromAdminQuestionDto } from "#server/utils/goat-it-api/mappers/question/question.mappers";
import type { SharedRuntimeConfig } from "#build/types/runtime-config";
import { createGoatItApiEndpoint, createGoatItApiFetchOptions, handleGoatItApiError } from "#server/utils/goat-it-api/helpers/goat-it-api.helpers";
import { createQuestionHandler } from "#server/api/goat-it-api/questions/handlers/create/index.post.handler";

vi.mock(import("#server/utils/goat-it-api/helpers/goat-it-api.helpers"));

describe("Server Goat It API Questions Create Handler", () => {
  const fakeCreationDto = createFakeQuestionCreationDto();
  const mockedEvent = createFakeH3Event();

  beforeEach(() => {
    vi.mocked($fetch).mockResolvedValue(createFakeAdminQuestionDto({ author: { role: "admin", name: "Test Admin" } }));
    vi.mocked(readBody).mockResolvedValue(fakeCreationDto);
  });

  describe(createQuestionHandler, () => {
    it("should create goat it api endpoint when called.", async() => {
      await createQuestionHandler(mockedEvent);

      expect(createGoatItApiEndpoint).toHaveBeenCalledExactlyOnceWith("questions");
    });

    it("should create goat it api fetch options with config when called.", async() => {
      await createQuestionHandler(mockedEvent);
      const expectedGoatItApiConfig: SharedRuntimeConfig["goatItApi"] = {
        baseUrl: "https://api.goat-it.com",
        adminKey: "test-admin-key",
      };

      expect(createGoatItApiFetchOptions).toHaveBeenCalledExactlyOnceWith(expectedGoatItApiConfig);
    });

    it("should read body from event when called.", async() => {
      await createQuestionHandler(mockedEvent);

      expect(readBody).toHaveBeenCalledExactlyOnceWith(mockedEvent);
    });

    it("should fetch with POST method and body when called.", async() => {
      const expectedEndpoint = "/admin/questions";
      const expectedFetchOptions = {
        baseURL: "https://api.goat-it.com",
        headers: {
          "goat-it-api-key": "test-admin-key",
        },
      };
      vi.mocked(createGoatItApiEndpoint).mockReturnValue(expectedEndpoint);
      vi.mocked(createGoatItApiFetchOptions).mockReturnValue(expectedFetchOptions);
      await createQuestionHandler(mockedEvent);

      expect($fetch).toHaveBeenCalledExactlyOnceWith(expectedEndpoint, {
        ...expectedFetchOptions,
        method: "POST",
        body: fakeCreationDto,
      });
    });

    it("should return mapped question when called.", async() => {
      const fakeAdminQuestionDto = createFakeAdminQuestionDto({ author: { role: "admin", name: "Test Admin" } });
      vi.mocked($fetch).mockResolvedValue(fakeAdminQuestionDto);
      const expectedQuestion = createQuestionFromAdminQuestionDto(fakeAdminQuestionDto);
      const result = await createQuestionHandler(mockedEvent);

      expect(result).toStrictEqual(expectedQuestion);
    });

    it("should call handleGoatItApiError when $fetch throws an error.", async() => {
      const fetchError = new Error("Network error");
      vi.mocked($fetch).mockRejectedValue(fetchError);

      try {
        await createQuestionHandler(mockedEvent);
      } catch(error: unknown) {
        void error;
      }

      expect(handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(fetchError);
    });

    it("should throw an error when the request body is invalid.", async() => {
      vi.mocked(readBody).mockResolvedValue({ invalid: "body" });

      await expect(createQuestionHandler(mockedEvent)).rejects.toThrow(ZodError);
    });

    it("should call handleGoatItApiError with zod error when the fetched response is invalid.", async() => {
      vi.mocked($fetch).mockResolvedValue({
        id: "invalid-id",
        name: "Invalid Question",
      });

      try {
        await createQuestionHandler(mockedEvent);
      } catch(error: unknown) {
        void error;
      }

      expect(handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(expect.any(ZodError));
    });
  });
});