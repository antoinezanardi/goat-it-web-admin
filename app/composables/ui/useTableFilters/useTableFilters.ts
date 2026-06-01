import type { FilterDefinitions, FilterRefs, UseTableFilters, UseTableFiltersOptions } from "~/composables/ui/useTableFilters/use-table-filters.types";

function useTableFilters<T extends FilterDefinitions>(options: UseTableFiltersOptions<T>): UseTableFilters<T> {
  const defaults = Object.entries(options).map(([key, definition]) => ({
    key,
    default: definition.default,
  }));

  // Acceptable as Object.fromEntries loses key typing; the cast is safe because we build entries from the same keys
  // oxlint-disable-next-line no-unsafe-type-assertion
  const filters = Object.fromEntries(defaults.map(({ key, default: defaultValue }) => [key, ref(defaultValue)])) as FilterRefs<T>;

  const activeFilterCount = computed<number>(() => defaults.filter(({ key, default: defaultValue }) => filters[key as keyof typeof filters].value !== defaultValue).length);

  const hasActiveFilters = computed<boolean>(() => activeFilterCount.value > 0);

  function clearFilters(): void {
    for (const { key, default: defaultValue } of defaults) {
      filters[key as keyof typeof filters].value = defaultValue;
    }
  }
  return {
    filters,
    activeFilterCount,
    hasActiveFilters,
    clearFilters,
  };
}

export { useTableFilters };