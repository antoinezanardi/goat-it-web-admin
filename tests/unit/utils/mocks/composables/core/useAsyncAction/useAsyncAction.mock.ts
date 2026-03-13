import { vi } from "vitest";
import { computed, ref } from "vue";
import type { ComputedRef, Ref } from "vue";

import type { StubToMock } from "~~/tests/unit/utils/types/mock.types";

import type { AsyncDataRequestStatus } from "#app";

type UseAsyncActionStub = {
  execute: (...arguments_: unknown[]) => Promise<unknown>;
  fetchStatus: Ref<AsyncDataRequestStatus>;
  isIdle: ComputedRef<boolean>;
  isPending: ComputedRef<boolean>;
  isSuccess: ComputedRef<boolean>;
  isError: ComputedRef<boolean>;
};

type UseAsyncActionMock = StubToMock<UseAsyncActionStub>;

/**
 * Creates a mock implementation of the `useAsyncAction` composable for unit testing purposes.
 * Can only be used from unit tests setup functions.
 */
function createUseAsyncActionMock(): UseAsyncActionMock {
  const fetchStatus = ref<AsyncDataRequestStatus>("idle");

  return {
    execute: vi.fn<UseAsyncActionStub["execute"]>(),
    fetchStatus,
    isIdle: computed<boolean>(() => fetchStatus.value === "idle"),
    isPending: computed<boolean>(() => fetchStatus.value === "pending"),
    isSuccess: computed<boolean>(() => fetchStatus.value === "success"),
    isError: computed<boolean>(() => fetchStatus.value === "error"),
  };
}

export type { UseAsyncActionMock };

export { createUseAsyncActionMock };