import { vi } from "vitest";
import { computed, ref } from "vue";

import type { ToMock } from "~~/tests/unit/utils/types/mock.types";

import type { UseTableGlobalFilter } from "~/composables/ui/useTableGlobalFilter/table-global-filter.types";

type UseTableGlobalFilterMock = ToMock<UseTableGlobalFilter<unknown>>;

function createUseTableGlobalFilterMock(): UseTableGlobalFilterMock {
  const searchTerm = ref("");
  const globalFilter = ref("");

  return {
    searchTerm,
    globalFilter,
    globalFilterFunction: vi.fn<() => boolean>().mockReturnValue(true),
    hasActiveFilter: computed<boolean>(() => globalFilter.value.trim().length > 0),
    filteredCount: ref(0),
  };
}

export type { UseTableGlobalFilterMock };

export { createUseTableGlobalFilterMock };