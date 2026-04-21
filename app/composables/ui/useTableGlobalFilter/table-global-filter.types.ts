import type { IFuseOptions } from "fuse.js";
import type { FilterFn } from "@tanstack/vue-table";
import type { ComputedRef, MaybeRefOrGetter, Ref } from "vue";

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
};

export type {
  UseTableGlobalFilterOptions,
  UseTableGlobalFilter,
};