import type { ComputedRef, Ref } from "vue";

type FilterDefinition<T> = {
  default: T;
};

type FilterDefinitions = Record<string, FilterDefinition<unknown>>;

type FilterReferences<T extends FilterDefinitions> = {
  [K in keyof T]: Ref<T[K]["default"]>;
};

type FilterValues<T extends FilterDefinitions> = {
  [K in keyof T]: T[K]["default"];
};

type UseTableFiltersOptions<T extends FilterDefinitions> = {
  definitions: T;
  onChange?: (values: FilterValues<T>) => void;
};

type UseTableFilters<T extends FilterDefinitions> = {
  filters: FilterReferences<T>;
  activeFilterCount: ComputedRef<number>;
  hasActiveFilters: ComputedRef<boolean>;
  clearFilters: () => void;
};

export type {
  FilterDefinition,
  FilterDefinitions,
  FilterReferences as FilterRefs,
  FilterValues,
  UseTableFiltersOptions,
  UseTableFilters,
};