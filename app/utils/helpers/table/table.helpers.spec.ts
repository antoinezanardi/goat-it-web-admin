import { describe, expect, it } from "vitest";

import type { CreateTableColumnOptions } from "~/utils/helpers/table/table.helpers.types";
import { createTableColumn } from "~/utils/helpers/table/table.helpers";

describe(createTableColumn, () => {
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

    describe("td class", () => {
      it.each<{ options: CreateTableColumnOptions; expected: { header: string; meta?: { class: { th?: string; td?: string } } } }>([
        {
          options: { accessorKey: "description", tdClass: "whitespace-normal break-words" },
          expected: { header: "", meta: { class: { td: "whitespace-normal break-words" } } },
        },
        {
          options: { accessorKey: "name", isCentered: true, tdClass: "font-bold" },
          expected: { header: "", meta: { class: { th: "text-center", td: "text-center font-bold" } } },
        },
        {
          options: { accessorKey: "name", isCentered: false, tdClass: "italic" },
          expected: { header: "", meta: { class: { td: "italic" } } },
        },
      ])("should create a table column with td class $options.tdClass when tdClass is provided.", ({ options, expected }) => {
        const column = createTableColumn(options);

        expect(column).toStrictEqual({
          accessorKey: options.accessorKey,
          ...expected,
        });
      });

      it("should not add meta when neither isCentered nor tdClass is provided.", () => {
        const column = createTableColumn({ accessorKey: "name" });

        expect(column).toStrictEqual({
          accessorKey: "name",
          header: "",
        });
      });
    });
  });
});