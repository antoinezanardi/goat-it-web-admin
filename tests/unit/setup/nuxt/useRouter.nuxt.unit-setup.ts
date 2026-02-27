import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi, beforeEach, type Mock } from "vitest";
import { ref, type Ref } from "vue";

type RouteMock = {
  name: string | symbol | number;
  path: string;
  meta?: {
    titleKey?: string;
    icon?: string;
  };
};

type UseRouterMock = {
  getRoutes: Mock<() => RouteMock[]>;
  currentRoute: Ref<RouteMock>;
  push: Mock<(to: string) => void>;
  afterEach: Mock<() => void>;
  beforeResolve: Mock<() => void>;
  beforeEach: Mock<() => void>;
  onError: Mock<() => void>;
};

function createUseRouterMock(): UseRouterMock {
  return {
    getRoutes: vi.fn<() => RouteMock[]>(() => [
      {
        name: "home",
        path: "/",
        meta: {
          titleKey: "home.pageTitle",
          icon: "i-lucide-home",
        },
      },
      {
        name: "questions",
        path: "/questions",
      },
    ]),
    currentRoute: ref<RouteMock>({
      path: "/",
      name: "home",
    }),
    push: vi.fn<(to: string) => void>(),
    afterEach: vi.fn<() => void>(),
    beforeResolve: vi.fn<() => void>(),
    beforeEach: vi.fn<() => void>(),
    onError: vi.fn<() => void>(),
  };
}

let useRouterMock = createUseRouterMock();

mockNuxtImport("useRouter", () => () => useRouterMock);

beforeEach(() => {
  useRouterMock = createUseRouterMock();
});
