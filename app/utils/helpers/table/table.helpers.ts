import type { TableColumn } from "@nuxt/ui";

import type { CreateTableColumnOptions } from "~/utils/helpers/table/table.helpers.types";

function createTableColumn<T>({ accessorKey, header, isCentered = false, tdClass }: CreateTableColumnOptions): TableColumn<T> {
  const tableColumn: TableColumn<T> = {
    accessorKey,
    header: header ?? "",
  };
  const tdClasses = [isCentered ? "text-center" : undefined, tdClass].filter(Boolean).join(" ");

  if (tdClasses) {
    const metaClass: Record<string, string> = { td: tdClasses };

    if (isCentered) {
      metaClass.th = "text-center";
    }
    tableColumn.meta = { class: metaClass };
  }
  return tableColumn;
}

export {
  createTableColumn,
};