import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { beforeEach } from "vitest";

import { createUseI18nMock } from "~~/tests/unit/utils/mocks/composables/nuxt/useI18n/useI18n.mock";
import type { UseI18nMock } from "~~/tests/unit/utils/mocks/composables/nuxt/useI18n/useI18n.mock";

let i18nMock = createUseI18nMock();

mockNuxtImport("useI18n", () => (): UseI18nMock => i18nMock);

beforeEach(() => {
  i18nMock = createUseI18nMock();
});