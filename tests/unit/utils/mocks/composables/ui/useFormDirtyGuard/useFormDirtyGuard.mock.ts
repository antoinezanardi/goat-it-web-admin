import { vi } from "vitest";

import type { ToMock } from "~~/tests/unit/utils/types/mock.types";

import type { UseFormDirtyGuardReturn } from "~/composables/ui/useFormDirtyGuard/use-form-dirty-guard.types";

type UseFormDirtyGuardMock = ToMock<() => UseFormDirtyGuardReturn>;

/**
 * Creates a mock implementation of the `useFormDirtyGuard` composable for unit testing purposes.
 * Can only be used from unit tests setup functions.
 */
function createUseFormDirtyGuardMock(overrides: Partial<UseFormDirtyGuardReturn> = {}): UseFormDirtyGuardMock {
  return vi.fn<() => UseFormDirtyGuardReturn>(() => ({
    onRequestClose: vi.fn<UseFormDirtyGuardReturn["onRequestClose"]>(),
    forceClose: vi.fn<UseFormDirtyGuardReturn["forceClose"]>(),
    ...overrides,
  }));
}

export type {
  UseFormDirtyGuardMock,
};

export {
  createUseFormDirtyGuardMock,
};