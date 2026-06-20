import type { IFuseOptions } from "fuse.js";
import type { FilterFn } from "@tanstack/vue-table";
import type { MaybeRefOrGetter, Ref } from "vue";

type UseTableGlobalFilterOptions<T> = {
  data: MaybeRefOrGetter<T[]>;
  keys: MaybeRefOrGetter<string[]>;
  fuseOptions?: Partial<IFuseOptions<T>>;
  debounceMs?: number;
};

type UseTableGlobalFilter<T> = {
  searchTerm: Ref<string>;
  globalFilter: Ref<string>;
  globalFilterFunction: FilterFn<T>;
  hasActiveFilter: ComputedRef<boolean>;
  filteredCount: Ref<number>;
};

export type {
  UseTableGlobalFilterOptions,
  UseTableGlobalFilter,
};