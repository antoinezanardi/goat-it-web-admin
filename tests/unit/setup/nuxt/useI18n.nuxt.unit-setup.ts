import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { beforeEach } from "vitest";
import { createUseI18nMock } from "~~/tests/unit/utils/mocks/nuxt/useI18n.mock";

let i18nMock = createUseI18nMock();

mockNuxtImport("useI18n", () => () => i18nMock);

beforeEach(() => {
  i18nMock = createUseI18nMock();
});
