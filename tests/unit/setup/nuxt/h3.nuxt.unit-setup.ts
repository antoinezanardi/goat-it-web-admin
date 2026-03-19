import { beforeEach, vi } from "vitest";

import { createGetRouterParamMock, createReadBodyMock } from "~~/tests/unit/utils/mocks/composables/nuxt/h3/h3.mock";
import type { GetRouterParamMock, ReadBodyMock } from "~~/tests/unit/utils/mocks/composables/nuxt/h3/h3.mock";

let getRouterParameterMock: GetRouterParamMock = createGetRouterParamMock();
let readBodyMock: ReadBodyMock = createReadBodyMock();

vi.stubGlobal("getRouterParam", getRouterParameterMock);
vi.stubGlobal("readBody", readBodyMock);

beforeEach(() => {
  getRouterParameterMock = createGetRouterParamMock();
  readBodyMock = createReadBodyMock();
  vi.stubGlobal("getRouterParam", getRouterParameterMock);
  vi.stubGlobal("readBody", readBodyMock);
});