import { describe, expect, it } from "vitest";

import { createTableColumn } from "~/utils/helpers/table/table.helpers";

describe("Table Helpers", () => {
  describe(createTableColumn, () => {
    it("should create a table column with accessorKey and empty header when called with only accessorKey.", () => {
      const column = createTableColumn({ accessorKey: "name" });

      expect(column).toStrictEqual({
        accessorKey: "name",
        header: "",
      });
    });

    it("should create a table column with the given header when called with a header.", () => {
      const column = createTableColumn({ accessorKey: "name", header: "Name" });

      expect(column).toStrictEqual({
        accessorKey: "name",
        header: "Name",
      });
    });

    it("should create a table column with centered meta when isCentered is true.", () => {
      const column = createTableColumn({ accessorKey: "name", isCentered: true });

      expect(column).toStrictEqual({
        accessorKey: "name",
        header: "",
        meta: {
          class: {
            th: "text-center",
            td: "text-center",
          },
        },
      });
    });

    it("should create a table column without meta when isCentered is false.", () => {
      const column = createTableColumn({ accessorKey: "name", isCentered: false });

      expect(column).toStrictEqual({
        accessorKey: "name",
        header: "",
      });
    });

    it("should create a table column with header and centered meta when called with all options.", () => {
      const column = createTableColumn({ accessorKey: "status", header: "Status", isCentered: true });

      expect(column).toStrictEqual({
        accessorKey: "status",
        header: "Status",
        meta: {
          class: {
            th: "text-center",
            td: "text-center",
          },
        },
      });
    });
  });
});