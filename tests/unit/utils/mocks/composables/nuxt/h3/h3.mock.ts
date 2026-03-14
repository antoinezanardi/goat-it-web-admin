import { vi } from "vitest";
import type { Mock } from "vitest";
import type { getRouterParam, readBody } from "h3";

type GetRouterParameterMock = Mock<typeof getRouterParam>;

type ReadBodyMock = Mock<typeof readBody>;

/**
 * Creates a mock implementation of the `getRouterParam` H3 global for unit testing purposes.
 * Can only be used from unit tests setup functions.
 */
function createGetRouterParameterMock(): GetRouterParameterMock {
  return vi.fn<typeof getRouterParam>();
}

/**
 * Creates a mock implementation of the `readBody` H3 global for unit testing purposes.
 * Can only be used from unit tests setup functions.
 */
function createReadBodyMock(): ReadBodyMock {
  return vi.fn<typeof readBody>();
}

export type { GetRouterParameterMock as GetRouterParamMock, ReadBodyMock };

export { createGetRouterParameterMock as createGetRouterParamMock, createReadBodyMock };