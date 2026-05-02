import type { H3Event } from "h3";
import { createError, getRouterParam } from "h3";
import { vi, describe, it, expect, beforeEach } from "vitest";

import { HttpStatusCode } from "#server/utils/http/http.enums";
import { getRequiredRouterParam } from "#server/utils/router/router.helpers";

// oxlint-disable-next-line vitest/prefer-import-in-mock
vi.mock("h3", async importOriginal => {
  // oxlint-disable-next-line typescript/consistent-type-imports
  const original = await importOriginal<typeof import("h3")>();

  return {
    ...original,
    getRouterParam: vi.fn<typeof getRouterParam>(),
    createError: vi.fn<typeof createError>(),
  };
});

describe("Server Router Helpers", () => {
  const mockedEvent = { context: { params: {} } } as unknown as H3Event;

  beforeEach(() => {
    vi.mocked(getRouterParam).mockReturnValue("valid-value");
  });

  describe(getRequiredRouterParam, () => {
    it("should call getRouterParam with event and param name when called.", () => {
      getRequiredRouterParam(mockedEvent, "id", "Id is required");

      expect(getRouterParam).toHaveBeenCalledExactlyOnceWith(mockedEvent, "id");
    });

    it("should return the router param value when it is a non-empty string.", () => {
      vi.mocked(getRouterParam).mockReturnValue("abc123");

      const result = getRequiredRouterParam(mockedEvent, "id", "Id is required");

      expect(result).toBe("abc123");
    });

    it("should throw a 400 error when router param is undefined.", () => {
      vi.mocked(getRouterParam).mockReturnValue(undefined);
      vi.mocked(createError).mockImplementation(() => {
        throw new Error("Id is required");
      });

      expect(() => getRequiredRouterParam(mockedEvent, "id", "Id is required")).toThrow("Id is required");
    });

    it("should call createError with correct status code and message when router param is undefined.", () => {
      vi.mocked(getRouterParam).mockReturnValue(undefined);
      vi.mocked(createError).mockImplementation(() => {
        throw new Error("Id is required");
      });

      try {
        getRequiredRouterParam(mockedEvent, "id", "Id is required");
      } catch(error: unknown) {
        void error;
      }

      expect(createError).toHaveBeenCalledExactlyOnceWith({
        statusCode: HttpStatusCode.BAD_REQUEST,
        message: "Id is required",
      });
    });

    it("should throw a 400 error when router param is an empty string.", () => {
      vi.mocked(getRouterParam).mockReturnValue("");
      vi.mocked(createError).mockImplementation(() => {
        throw new Error("Id is required");
      });

      expect(() => getRequiredRouterParam(mockedEvent, "id", "Id is required")).toThrow("Id is required");
    });

    it("should call createError with correct status code and message when router param is an empty string.", () => {
      vi.mocked(getRouterParam).mockReturnValue("");
      vi.mocked(createError).mockImplementation(() => {
        throw new Error("Id is required");
      });

      try {
        getRequiredRouterParam(mockedEvent, "id", "Id is required");
      } catch(error: unknown) {
        void error;
      }

      expect(createError).toHaveBeenCalledExactlyOnceWith({
        statusCode: HttpStatusCode.BAD_REQUEST,
        message: "Id is required",
      });
    });
  });
});