import { vi } from "vitest";
import { computed, ref } from "vue";
import type { ComputedRef, Ref } from "vue";

import type { StubToMock } from "~~/tests/unit/utils/types/mock.types";

import type { AsyncDataRequestStatus } from "#app";

type UseFetchStatusStub = {
  fetchStatus: Ref<AsyncDataRequestStatus>;
  isIdle: ComputedRef<boolean>;
  isPending: ComputedRef<boolean>;
  isSuccess: ComputedRef<boolean>;
  isError: ComputedRef<boolean>;
  setFetchStatusToPending: () => void;
  setFetchStatusToSuccess: () => void;
  setFetchStatusToError: () => void;
};

type UseFetchStatusMock = StubToMock<UseFetchStatusStub>;

/**
 * Creates a mock implementation of the `useFetchStatus` composable for unit testing purposes.
 * Can only be used from unit tests setup functions.
 */
function createUseFetchStatusMock(): UseFetchStatusMock {
  const fetchStatus = ref<AsyncDataRequestStatus>("idle");

  return {
    fetchStatus,
    isIdle: computed<boolean>(() => fetchStatus.value === "idle"),
    isPending: computed<boolean>(() => fetchStatus.value === "pending"),
    isSuccess: computed<boolean>(() => fetchStatus.value === "success"),
    isError: computed<boolean>(() => fetchStatus.value === "error"),
    setFetchStatusToPending: vi.fn<UseFetchStatusStub["setFetchStatusToPending"]>(),
    setFetchStatusToSuccess: vi.fn<UseFetchStatusStub["setFetchStatusToSuccess"]>(),
    setFetchStatusToError: vi.fn<UseFetchStatusStub["setFetchStatusToError"]>(),
  };
}

export type { UseFetchStatusMock };

export { createUseFetchStatusMock };