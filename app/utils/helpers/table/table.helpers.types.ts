import type { VNode } from "vue";

type CreateTableColumnOptions = {
  accessorKey: string;
  header?: string | (() => VNode);
  isCentered?: boolean;
  tdClass?: string;
};

export type {
  CreateTableColumnOptions,
};