import type { TableColumn } from "@nuxt/ui";

import type { CreateTableColumnOptions } from "~/utils/helpers/table/table.helpers.types";

function createTableColumn<T>({ accessorKey, header, isCentered = false, tdClass }: CreateTableColumnOptions): TableColumn<T> {
  const tableColumn: TableColumn<T> = {
    accessorKey,
    header: header ?? "",
  };
  const thClass = isCentered ? "text-center" : undefined;
  const tdClassValue = [isCentered ? "text-center" : undefined, tdClass].filter(Boolean).join(" ") || undefined;

  if (tdClassValue !== undefined) {
    tableColumn.meta = {
      class: {
        ...thClass === undefined ? {} : { th: thClass },
        td: tdClassValue,
      },
    };
  }
  return tableColumn;
}

export {
  createTableColumn,
};