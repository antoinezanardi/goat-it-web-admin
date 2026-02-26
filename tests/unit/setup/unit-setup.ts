import { vi, beforeAll, afterAll } from "vitest";
import { config } from "@vue/test-utils";
import { useI18nMock } from "~~/tests/unit/utils/mocks/i18n/useI18nMock";

process.env.TZ = "UTC";

beforeAll(() => {
  config.global.renderStubDefaultSlot = true;
  const dateForUnitTests = new Date("2026-04-14");
  useI18nMock();

  vi.setSystemTime(dateForUnitTests);
});

afterAll(() => {
  config.global.renderStubDefaultSlot = false;
  vi.useRealTimers();
});

