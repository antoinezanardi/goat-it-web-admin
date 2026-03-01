import { vi, type Mock } from "vitest";
import { ref, type Ref } from "vue";
import { DEFAULT_MOCKED_ROUTE, MOCKED_ROUTES } from "~~/tests/unit/utils/mocks/nuxt/useRouter/useRouter.mock.constants";
import type { RouteMock } from "~~/tests/unit/utils/mocks/nuxt/useRouter/useRouter.mock.types";

type UseRouterMock = {
  getRoutes: Mock<() => RouteMock[]>;
  currentRoute: Ref<RouteMock>;
  push: Mock<(to: string) => void>;
  afterEach: Mock<() => void>;
  beforeResolve: Mock<() => void>;
  beforeEach: Mock<() => void>;
  onError: Mock<() => void>;
};

/**
 * Creates a mock implementation of the `useRouter` composable for unit testing purposes.
 * Can only be used from unit tests setup functions.
 */
function createUseRouterMock(): UseRouterMock {
  return {
    getRoutes: vi.fn<() => RouteMock[]>(() => [...MOCKED_ROUTES]),
    currentRoute: ref<RouteMock>(DEFAULT_MOCKED_ROUTE),
    push: vi.fn<(to: string) => void>(),
    afterEach: vi.fn<() => void>(),
    beforeResolve: vi.fn<() => void>(),
    beforeEach: vi.fn<() => void>(),
    onError: vi.fn<() => void>(),
  };
}

export type { UseRouterMock };

export { createUseRouterMock };