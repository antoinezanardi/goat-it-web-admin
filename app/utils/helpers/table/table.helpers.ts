import type { TableColumn } from "@nuxt/ui";

import type { CreateTableColumnOptions } from "~/utils/helpers/table/table.helpers.types";

function createTableColumn<T>({ accessorKey, header, isCentered = false }: CreateTableColumnOptions): TableColumn<T> {
  const tableColumn: TableColumn<T> = {
    accessorKey,
    header: header ?? "",
  };
  if (isCentered) {
    tableColumn.meta = {
      class: {
        th: "text-center",
        td: "text-center",
      },
    };
  }
  return tableColumn;
}

export {
  createTableColumn,
};