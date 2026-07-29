import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createUseFetchStatusMock } from "~~/tests/unit/utils/mocks/composables/core/useFetchStatus/useFetchStatus.mock";
import type { UseFetchStatusMock } from "~~/tests/unit/utils/mocks/composables/core/useFetchStatus/useFetchStatus.mock";

import type { useAsyncAction as UseAsyncActionType } from "@/composables/core/useAsyncAction/useAsyncAction";

let useFetchStatusMock: UseFetchStatusMock;

mockNuxtImport("useFetchStatus", () => (): UseFetchStatusMock => useFetchStatusMock);

let useAsyncAction: typeof UseAsyncActionType;

describe("useAsyncAction", () => {
  beforeEach(async() => {
    useFetchStatusMock = createUseFetchStatusMock();
    ({ useAsyncAction } = await import("@/composables/core/useAsyncAction/useAsyncAction"));
  });

  describe("execute", () => {
    it("should call the action with provided arguments when called.", async() => {
      const action = vi.fn<(count: number, label: string) => Promise<void>>();
      const { execute } = useAsyncAction(action, vi.fn<(error: unknown) => void>());

      await execute(42, "hello");

      expect(action).toHaveBeenCalledExactlyOnceWith(42, "hello");
    });

    it("should return the result when action resolves.", async() => {
      const action = vi.fn<() => Promise<string>>().mockResolvedValue("result");
      const { execute } = useAsyncAction(action, vi.fn<(error: unknown) => void>());

      const result = await execute();

      expect(result).toBe("result");
    });

    it("should call onError with the error when action rejects.", async() => {
      const error = new Error("something went wrong");
      const action = vi.fn<() => Promise<void>>().mockRejectedValue(error);
      const onError = vi.fn<(error: unknown) => void>();
      const { execute } = useAsyncAction(action, onError);

      await execute();

      expect(onError).toHaveBeenCalledExactlyOnceWith(error);
    });

    it("should return undefined when action rejects.", async() => {
      const action = vi.fn<() => Promise<string>>().mockRejectedValue(new Error("fail"));
      const { execute } = useAsyncAction(action, vi.fn<(error: unknown) => void>());

      const result = await execute();

      expect(result).toBeUndefined();
    });

    it("should not call setFetchStatusToSuccess when action rejects.", async() => {
      const action = vi.fn<() => Promise<void>>().mockRejectedValue(new Error("fail"));
      const { execute } = useAsyncAction(action, vi.fn<(error: unknown) => void>());

      await execute();

      expect(useFetchStatusMock.setFetchStatusToSuccess).not.toHaveBeenCalled();
    });

    it("should not call setFetchStatusToError when action resolves.", async() => {
      const action = vi.fn<() => Promise<void>>();
      const { execute } = useAsyncAction(action, vi.fn<(error: unknown) => void>());

      await execute();

      expect(useFetchStatusMock.setFetchStatusToError).not.toHaveBeenCalled();
    });
  });

  describe("fetchStatus", () => {
    it("should expose the fetchStatus ref from useFetchStatus when called.", () => {
      const { fetchStatus } = useAsyncAction(vi.fn<() => Promise<void>>(), vi.fn<(error: unknown) => void>());

      expect(fetchStatus).toStrictEqual(useFetchStatusMock.fetchStatus);
    });
  });
});