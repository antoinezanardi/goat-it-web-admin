import { vi, describe, it, expect, beforeEach } from "vitest";
import { ZodError } from "zod";
import { createFakeAdminQuestionDto } from "@goat-it/schemas/testing/question";

import { createFakeH3Event } from "~~/tests/unit/utils/faketories/shared/h3/h3-event.faketory";

import { createQuestionFromAdminQuestionDto } from "#server/utils/goat-it-api/mappers/question/question.mappers";
import type { SharedRuntimeConfig } from "#build/types/runtime-config";
import { createGoatItApiEndpoint, createGoatItApiFetchOptions, handleGoatItApiError } from "#server/utils/goat-it-api/helpers/goat-it-api.helpers";
import { getQuestionsHandler } from "#server/api/goat-it-api/questions/handlers/get-all/index.get.handler";

vi.mock(import("#server/utils/goat-it-api/helpers/goat-it-api.helpers"));

describe("Server Goat It API Questions Get Handler", () => {
  const mockedEvent = createFakeH3Event();

  beforeEach(() => {
    vi.mocked($fetch).mockResolvedValue([
      createFakeAdminQuestionDto({ author: { role: "admin", name: "Test Admin" } }),
      createFakeAdminQuestionDto({ author: { role: "admin", name: "Test Admin" } }),
      createFakeAdminQuestionDto({ author: { role: "admin", name: "Test Admin" } }),
    ]);
  });

  describe(getQuestionsHandler, () => {
    it("should create goat it api endpoint when called.", async() => {
      await getQuestionsHandler(mockedEvent);

      expect(createGoatItApiEndpoint).toHaveBeenCalledExactlyOnceWith("questions");
    });

    it("should create goat it api fetch options with config when called.", async() => {
      await getQuestionsHandler(mockedEvent);
      const expectedGoatItApiConfig: SharedRuntimeConfig["goatItApi"] = {
        baseUrl: "https://api.goat-it.com",
        adminKey: "test-admin-key",
      };

      expect(createGoatItApiFetchOptions).toHaveBeenCalledExactlyOnceWith(expectedGoatItApiConfig);
    });

    it("should fetch questions from goat it api with correct endpoint, fetch options and default query when called.", async() => {
      const expectedEndpoint = "/admin/questions";
      const expectedFetchOptions = {
        baseURL: "https://api.goat-it.com",
        headers: {
          "goat-it-api-key": "test-admin-key",
        },
      };
      vi.mocked(createGoatItApiEndpoint).mockReturnValue(expectedEndpoint);
      vi.mocked(createGoatItApiFetchOptions).mockReturnValue(expectedFetchOptions);
      await getQuestionsHandler(mockedEvent);

      expect($fetch).toHaveBeenCalledExactlyOnceWith(expectedEndpoint, { ...expectedFetchOptions, query: { "sort-by": "createdAt", "sort-order": "desc", "limit": 0 } });
    });

    it("should get query from event when called.", async() => {
      await getQuestionsHandler(mockedEvent);

      expect(getQuery).toHaveBeenCalledExactlyOnceWith(mockedEvent);
    });

    it("should fetch questions with status query param when query contains status.", async() => {
      const expectedEndpoint = "/admin/questions";
      const expectedFetchOptions = {
        baseURL: "https://api.goat-it.com",
        headers: {
          "goat-it-api-key": "test-admin-key",
        },
      };
      vi.mocked(createGoatItApiEndpoint).mockReturnValue(expectedEndpoint);
      vi.mocked(createGoatItApiFetchOptions).mockReturnValue(expectedFetchOptions);
      vi.mocked(getQuery).mockReturnValue({ status: "active" });
      await getQuestionsHandler(mockedEvent);

      expect($fetch).toHaveBeenCalledExactlyOnceWith(expectedEndpoint, {
        ...expectedFetchOptions,
        query: { "sort-by": "createdAt", "sort-order": "desc", "status": "active", "limit": 0 },
      });
    });

    it("should fetch questions with category and cognitive-difficulty query params when query contains them.", async() => {
      const expectedEndpoint = "/admin/questions";
      const expectedFetchOptions = {
        baseURL: "https://api.goat-it.com",
        headers: {
          "goat-it-api-key": "test-admin-key",
        },
      };
      vi.mocked(createGoatItApiEndpoint).mockReturnValue(expectedEndpoint);
      vi.mocked(createGoatItApiFetchOptions).mockReturnValue(expectedFetchOptions);
      vi.mocked(getQuery).mockReturnValue({ "category": "trivia", "cognitive-difficulty": "easy" });
      await getQuestionsHandler(mockedEvent);

      expect($fetch).toHaveBeenCalledExactlyOnceWith(expectedEndpoint, {
        ...expectedFetchOptions,
        query: { "sort-by": "createdAt", "sort-order": "desc", "category": "trivia", "cognitive-difficulty": "easy", "limit": 0 },
      });
    });

    it("should throw zod error when query params are invalid.", async() => {
      vi.mocked(getQuery).mockReturnValue({ status: "invalid-status" });

      const asyncFunction = async(): Promise<void> => {
        await getQuestionsHandler(mockedEvent);
      };

      await expect(asyncFunction).rejects.toThrow(ZodError);
    });

    it("should return mapped questions when called.", async() => {
      const fakeQuestions = [
        createFakeAdminQuestionDto({ author: { role: "admin", name: "Test Admin" } }),
        createFakeAdminQuestionDto({ author: { role: "admin", name: "Test Admin" } }),
        createFakeAdminQuestionDto({ author: { role: "admin", name: "Test Admin" } }),
      ];
      vi.mocked($fetch).mockResolvedValue(fakeQuestions);
      const expectedQuestions = fakeQuestions.map(createQuestionFromAdminQuestionDto);
      const result = await getQuestionsHandler(mockedEvent);

      expect(result).toStrictEqual(expectedQuestions);
    });

    it("should call handleGoatItApiError when $fetch throws an error.", async() => {
      const fetchError = new Error("Network error");
      vi.mocked($fetch).mockRejectedValue(fetchError);

      try {
        await getQuestionsHandler(mockedEvent);
      } catch(error: unknown) {
        void error;
      }

      expect(handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(fetchError);
    });

    it("should call handleGoatItApiError with zod error when the fetched data is invalid.", async() => {
      vi.mocked($fetch).mockResolvedValue([
        {
          id: "invalid-id",
          name: "Invalid Question",
        },
      ]);

      try {
        await getQuestionsHandler(mockedEvent);
      } catch(error: unknown) {
        void error;
      }

      expect(handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(expect.any(ZodError));
    });
  });
});