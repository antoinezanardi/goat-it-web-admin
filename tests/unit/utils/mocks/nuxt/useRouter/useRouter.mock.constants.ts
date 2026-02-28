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
] as const satisfies RouteMock[];

export {
  DEFAULT_MOCKED_ROUTE,
  MOCKED_ROUTES
};