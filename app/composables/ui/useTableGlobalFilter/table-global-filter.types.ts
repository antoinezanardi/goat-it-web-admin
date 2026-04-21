import type { IFuseOptions } from "fuse.js";
import type { FilterFn } from "@tanstack/vue-table";
import type { ComputedRef, Ref } from "vue";

type UseTableGlobalFilterOptions<T> = {
  data: Ref<T[]> | ComputedRef<T[]>;
  keys: Ref<string[]> | ComputedRef<string[]> | string[];
  fuseOptions?: Partial<IFuseOptions<T>>;
  debounceMs?: number;
};

type UseTableGlobalFilter<T> = {
  searchTerm: Ref<string>;
  globalFilter: Ref<string>;
  globalFilterFn: FilterFn<T>;
  hasActiveFilter: ComputedRef<boolean>;
};

export type {
  UseTableGlobalFilterOptions,
  UseTableGlobalFilter,
};