import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { beforeEach } from "vitest";

import { createUseColorModeMock } from "~~/tests/unit/utils/mocks/composables/nuxt/useColorMode/useColorMode.mock";
import type { UseColorModeMock } from "~~/tests/unit/utils/mocks/composables/nuxt/useColorMode/useColorMode.mock";

let useColorModeMock: UseColorModeMock = createUseColorModeMock();
mockNuxtImport("useColorMode", () => (): UseColorModeMock => useColorModeMock);
beforeEach(() => {
  useColorModeMock = createUseColorModeMock();
});