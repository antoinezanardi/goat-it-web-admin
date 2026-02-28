import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { beforeEach } from "vitest";
import { createUseRouterMock, type UseRouterMock } from "~~/tests/unit/utils/mocks/nuxt/useRouter.mock";

let useRouterMock: UseRouterMock = createUseRouterMock();

mockNuxtImport("useRouter", () => () => useRouterMock);

beforeEach(() => {
  useRouterMock = createUseRouterMock();
});