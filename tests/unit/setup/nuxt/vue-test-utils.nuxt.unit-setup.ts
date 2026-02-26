import { config } from "@vue/test-utils";
import { beforeAll, afterAll } from "vitest";

beforeAll(() => {
  config.global.renderStubDefaultSlot = true;
});

afterAll(() => {
  config.global.renderStubDefaultSlot = false;
});