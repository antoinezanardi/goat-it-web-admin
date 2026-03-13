import { vi } from "vitest";

import type { StubToMock } from "~~/tests/unit/utils/types/mock.types";

import type { Toast } from "#ui/composables";

type UseAppToastStub = {
  addSuccessToast: (options: Partial<Toast>) => void;
  addErrorToast: (options: Partial<Toast>) => void;
};

type UseAppToastMock = StubToMock<UseAppToastStub>;

/**
 * Creates a mock implementation of the `useAppToast` composable for unit testing purposes.
 * Can only be used from unit tests setup functions.
 */
function createUseAppToastMock(): UseAppToastMock {
  return {
    addSuccessToast: vi.fn<UseAppToastStub["addSuccessToast"]>(),
    addErrorToast: vi.fn<UseAppToastStub["addErrorToast"]>(),
  };
}

export type { UseAppToastMock };

export { createUseAppToastMock };