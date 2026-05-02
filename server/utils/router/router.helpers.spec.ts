import { createError, getRouterParam } from "h3";
import { vi, describe, it, expect, beforeEach } from "vitest";

import { createFakeH3Event } from "~~/tests/unit/utils/faketories/shared/h3/h3-event.faketory";

import { HttpStatusCode } from "#server/utils/http/http.enums";
import { getRequiredRouterParam } from "#server/utils/router/router.helpers";

describe("Server Router Helpers", () => {
  const mockedEvent = createFakeH3Event();

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

    it.each<{ paramValue: string | undefined }>([
      { paramValue: undefined },
      { paramValue: "" },
    ])("should throw a 400 error when router param is $paramValue.", ({ paramValue }) => {
      vi.mocked(getRouterParam).mockReturnValue(paramValue);
      vi.mocked(createError).mockImplementation(() => {
        throw new Error("Id is required");
      });

      expect(() => getRequiredRouterParam(mockedEvent, "id", "Id is required")).toThrow("Id is required");
    });

    it.each<{ paramValue: string | undefined }>([
      { paramValue: undefined },
      { paramValue: "" },
    ])("should call createError with correct status code and message when router param is $paramValue.", ({ paramValue }) => {
      vi.mocked(getRouterParam).mockReturnValue(paramValue);
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