import type { RouteMock } from "~~/tests/unit/utils/mocks/nuxt/useRouter/useRouter.mock.types";

const DEFAULT_MOCKED_ROUTE: RouteMock = {
  path: "/",
  name: "home",
  meta: {
    titleKey: "home.pageTitle",
    icon: "i-lucide-home",
  },
} as const;

const MOCKED_ROUTES = [
  DEFAULT_MOCKED_ROUTE,
  {
    name: "questions",
    path: "/questions",
    meta: {},
  },
  {
    path: "/question/:id",
    meta: {},
  }
] as const satisfies readonly RouteMock[];

export {
  DEFAULT_MOCKED_ROUTE,
  MOCKED_ROUTES
};