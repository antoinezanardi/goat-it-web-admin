import { vi } from "vitest";
import type { Mock } from "vitest";

type UseOverlayInstanceOpenFunction = (properties?: unknown) => { result: Promise<unknown> };

type UseOverlayInstanceCloseFunction = (value?: unknown) => void;

type UseOverlayInstancePatchFunction = (properties?: unknown) => void;

type UseOverlayInstanceMock = {
  open: Mock<UseOverlayInstanceOpenFunction>;
  close: Mock<UseOverlayInstanceCloseFunction>;
  patch: Mock<UseOverlayInstancePatchFunction>;
};

type UseOverlayCreateFunction = (component: unknown, options?: unknown) => UseOverlayInstanceMock;

type UseOverlayOpenFunction = (id: symbol, properties?: unknown) => { result: Promise<unknown> };

type UseOverlayCloseFunction = (id: symbol, value?: unknown) => void;

type UseOverlayCloseAllFunction = () => void;

type UseOverlayPatchFunction = (id: symbol, properties?: unknown) => void;

type UseOverlayMock = {
  create: Mock<UseOverlayCreateFunction>;
  open: Mock<UseOverlayOpenFunction>;
  close: Mock<UseOverlayCloseFunction>;
  closeAll: Mock<UseOverlayCloseAllFunction>;
  patch: Mock<UseOverlayPatchFunction>;
};

/**
 * Creates a fresh overlay instance mock returned by the `create()` factory.
 * Can only be used from unit tests setup functions.
 */
function createUseOverlayInstanceMock(): UseOverlayInstanceMock {
  return {
    open: vi.fn<UseOverlayInstanceOpenFunction>(() => ({ result: Promise.resolve(true) })),
    close: vi.fn<UseOverlayInstanceCloseFunction>(),
    patch: vi.fn<UseOverlayInstancePatchFunction>(),
  };
}

/**
 * Creates a mock implementation of the `useOverlay` composable from `@nuxt/ui` for unit testing purposes.
 * Can only be used from unit tests setup functions.
 */
function createUseOverlayMock(): UseOverlayMock {
  return {
    create: vi.fn<UseOverlayCreateFunction>(() => createUseOverlayInstanceMock()),
    open: vi.fn<UseOverlayOpenFunction>(() => ({ result: Promise.resolve(true) })),
    close: vi.fn<UseOverlayCloseFunction>(),
    closeAll: vi.fn<UseOverlayCloseAllFunction>(),
    patch: vi.fn<UseOverlayPatchFunction>(),
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