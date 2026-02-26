import { vi, beforeAll, afterAll } from "vitest";
import { config } from "@vue/test-utils";

process.env.TZ = "UTC";

beforeAll(() => {
  config.global.renderStubDefaultSlot = true;
  const dateForUnitTests = new Date("2026-04-14");

  vi.setSystemTime(dateForUnitTests);
});

afterAll(() => {
  config.global.renderStubDefaultSlot = false;
  vi.useRealTimers();
});

