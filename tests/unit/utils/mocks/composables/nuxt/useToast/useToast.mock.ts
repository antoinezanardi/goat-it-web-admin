import { vi } from "vitest";
import type { Mock } from "vitest";

type UseToastMock = {
  add: Mock<() => void>;
  remove: Mock<() => void>;
  clear: Mock<() => void>;
};

/**
 * Creates a mock implementation of the `useToast` composable for unit testing purposes.
 * Can only be used from unit tests setup functions.
 */
function createUseToastMock(): UseToastMock {
  return {
    add: vi.fn<() => void>(),
    remove: vi.fn<() => void>(),
    clear: vi.fn<() => void>(),
  };
}

export type { UseToastMock };

export { createUseToastMock };