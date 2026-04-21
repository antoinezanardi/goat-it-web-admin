import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { beforeEach, vi } from "vitest";

import { createUseTableGlobalFilterMock } from "~~/tests/unit/utils/mocks/composables/ui/useTableGlobalFilter/useTableGlobalFilter.mock";
import type { UseTableGlobalFilterMock } from "~~/tests/unit/utils/mocks/composables/ui/useTableGlobalFilter/useTableGlobalFilter.mock";

const { useTableGlobalFilterFn } = vi.hoisted(() => ({
  useTableGlobalFilterFn: vi.fn<(...parameters: unknown[]) => unknown>(),
}));

let useTableGlobalFilterMock: UseTableGlobalFilterMock = createUseTableGlobalFilterMock();
mockNuxtImport("useTableGlobalFilter", () => useTableGlobalFilterFn);
beforeEach(() => {
  useTableGlobalFilterMock = createUseTableGlobalFilterMock();
  useTableGlobalFilterFn.mockReturnValue(useTableGlobalFilterMock);
});