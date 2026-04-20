import { vi } from "vitest";

import type { ToMock } from "~~/tests/unit/utils/types/mock.types";

type UseOverlayInstanceStub = {
  open: (properties?: unknown) => { result: Promise<unknown> };
  close: (value?: unknown) => void;
  patch: (properties?: unknown) => void;
};

type UseOverlayInstanceMock = ToMock<UseOverlayInstanceStub>;

type UseOverlayStub = {
  create: (component: unknown, options?: unknown) => UseOverlayInstanceStub;
  open: (id: symbol, properties?: unknown) => { result: Promise<unknown> };
  close: (id: symbol, value?: unknown) => void;
  closeAll: () => void;
  patch: (id: symbol, properties?: unknown) => void;
};

type UseOverlayMock = ToMock<UseOverlayStub>;

/**
 * Creates a fresh overlay instance mock returned by the `create()` factory.
 * Can only be used from unit tests setup functions.
 */
function createUseOverlayInstanceMock(): UseOverlayInstanceMock {
  return {
    open: vi.fn<UseOverlayInstanceStub["open"]>(() => ({ result: Promise.resolve(true) })),
    close: vi.fn<UseOverlayInstanceStub["close"]>(),
    patch: vi.fn<UseOverlayInstanceStub["patch"]>(),
  };
}

/**
 * Creates a mock implementation of the `useOverlay` composable from `@nuxt/ui` for unit testing purposes.
 * Can only be used from unit tests setup functions.
 */
function createUseOverlayMock(): UseOverlayMock {
  return {
    create: vi.fn<UseOverlayStub["create"]>(() => createUseOverlayInstanceMock()),
    open: vi.fn<UseOverlayStub["open"]>(() => ({ result: Promise.resolve(true) })),
    close: vi.fn<UseOverlayStub["close"]>(),
    closeAll: vi.fn<UseOverlayStub["closeAll"]>(),
    patch: vi.fn<UseOverlayStub["patch"]>(),
  };
}

export type {
  UseOverlayInstanceMock,
  UseOverlayMock,
};

export {
  createUseOverlayInstanceMock,
  createUseOverlayMock,
};