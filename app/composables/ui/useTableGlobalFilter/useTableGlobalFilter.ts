import Fuse from "fuse.js";
import type { FilterFn, Row } from "@tanstack/vue-table";

import { DEFAULT_FUSE_OPTIONS } from "~/composables/ui/useTableGlobalFilter/table-global-filter.constants";
import type { UseTableGlobalFilter, UseTableGlobalFilterOptions } from "~/composables/ui/useTableGlobalFilter/table-global-filter.types";

function useTableGlobalFilter<T>(options: UseTableGlobalFilterOptions<T>): UseTableGlobalFilter<T> {
  const { data, keys, fuseOptions, debounceMs = 0 } = options;

  const searchTerm = ref<string>("");

  const globalFilter = debounceMs > 0 ? refDebounced(searchTerm, debounceMs) : searchTerm;

  const resolvedKeys = computed<string[]>(() => toValue(keys));

  const fuse = computed<Fuse<T>>(() => new Fuse(toValue(data), {
    ...DEFAULT_FUSE_OPTIONS,
    ...fuseOptions,
    keys: resolvedKeys.value,
  }));

  const matchingReferenceIndices = computed<Set<number>>(() => {
    const filterValue = globalFilter.value.trim();
    const results = fuse.value.search(filterValue);

    return new Set(results.map(result => result.refIndex));
  });

  const globalFilterFunction: FilterFn<T> = (row: Row<T>): boolean => matchingReferenceIndices.value.has(row.index);

  globalFilterFunction.autoRemove = (value: unknown): boolean => typeof value !== "string" || !value.trim();

  const hasActiveFilter = computed<boolean>(() => globalFilter.value.trim().length > 0);

  const filteredCount = computed<number>(() => matchingReferenceIndices.value.size);

  return {
    searchTerm,
    globalFilter,
    globalFilterFunction,
    hasActiveFilter,
    filteredCount,
  };
}

export { useTableGlobalFilter };

export { type UseTableGlobalFilter } from "~/composables/ui/useTableGlobalFilter/table-global-filter.types";