import { beforeEach, describe, expect, it, vi } from "vitest";
import type { FilterMeta } from "@tanstack/vue-table";
import type { Ref } from "vue";
import { nextTick, ref } from "vue";

import { useTableGlobalFilter } from "~/composables/ui/useTableGlobalFilter/useTableGlobalFilter";

type TestRow = {
  id: string;
  name: string;
  description: string;
};

describe(useTableGlobalFilter, () => {
  let data: Ref<TestRow[]>;
  const addMetaMock = vi.fn<(meta: FilterMeta) => void>();

  beforeEach(() => {
    data = ref<TestRow[]>([
      { id: "1", name: "Mathematics", description: "Numbers and equations" },
      { id: "2", name: "Science", description: "Biology and chemistry" },
      { id: "3", name: "History", description: "Past events and civilizations" },
    ]);
  });

  describe("searchTerm", () => {
    it("should initialize searchTerm as an empty string when composable is created.", () => {
      const { searchTerm } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      expect(searchTerm.value).toBe("");
    });
  });

  describe("globalFilter", () => {
    it("should be the same ref as searchTerm when no debounce is configured.", () => {
      const { searchTerm, globalFilter } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      searchTerm.value = "test";

      expect(globalFilter.value).toBe("test");
    });

    it("should be the same ref as searchTerm when debounceMs is 0.", () => {
      const { searchTerm, globalFilter } = useTableGlobalFilter({ data, keys: ["name", "description"], debounceMs: 0 });

      searchTerm.value = "test";

      expect(globalFilter.value).toBe("test");
    });

    it("should not update globalFilter immediately when debounceMs is greater than 0.", async() => {
      const { searchTerm, globalFilter } = useTableGlobalFilter({ data, keys: ["name", "description"], debounceMs: 100 });

      searchTerm.value = "test";
      await nextTick();

      expect(globalFilter.value).toBe("");
    });

    it("should update globalFilter after the debounce delay when debounceMs is greater than 0.", async() => {
      const { searchTerm, globalFilter } = useTableGlobalFilter({ data, keys: ["name", "description"], debounceMs: 100 });

      searchTerm.value = "test";
      await nextTick();
      vi.advanceTimersByTime(100);
      await nextTick();

      expect(globalFilter.value).toBe("test");
    });
  });

  describe("hasActiveFilter", () => {
    it("should return false when searchTerm is empty.", () => {
      const { hasActiveFilter } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      expect(hasActiveFilter.value).toBe(false);
    });

    it("should return false when searchTerm is only whitespace.", () => {
      const { searchTerm, hasActiveFilter } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      searchTerm.value = "   ";

      expect(hasActiveFilter.value).toBe(false);
    });

    it("should return true when searchTerm has a non-empty value.", () => {
      const { searchTerm, hasActiveFilter } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      searchTerm.value = "math";

      expect(hasActiveFilter.value).toBe(true);
    });
  });

  describe("globalFilterFn", () => {
    it.each<{ description: string; searchTermValue: string }>([
      { description: "empty", searchTermValue: "" },
      { description: "only whitespace", searchTermValue: "   " },
    ])("should return true for all rows when globalFilter is $description.", ({ searchTermValue }) => {
      const { searchTerm, globalFilterFn } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      searchTerm.value = searchTermValue;

      const isMatching = globalFilterFn({ index: 0 } as Parameters<typeof globalFilterFn>[0], "", "", addMetaMock);

      expect(isMatching).toBe(true);
    });

    it("should return true for a row matching the search term when globalFilter matches by name.", () => {
      const { searchTerm, globalFilterFn } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      searchTerm.value = "Mathematics";

      const isMatching = globalFilterFn({ index: 0 } as Parameters<typeof globalFilterFn>[0], "", "Mathematics", addMetaMock);

      expect(isMatching).toBe(true);
    });

    it("should return false for a row not matching the search term when globalFilter does not match.", () => {
      const { searchTerm, globalFilterFn } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      searchTerm.value = "Mathematics";

      const isMatching = globalFilterFn({ index: 1 } as Parameters<typeof globalFilterFn>[0], "", "Mathematics", addMetaMock);

      expect(isMatching).toBe(false);
    });

    it("should perform fuzzy matching when search term has typos.", () => {
      const { searchTerm, globalFilterFn } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      searchTerm.value = "Mathmatcs";

      const isMatching = globalFilterFn({ index: 0 } as Parameters<typeof globalFilterFn>[0], "", "Mathmatcs", addMetaMock);

      expect(isMatching).toBe(true);
    });

    it("should match on description field when search term matches description.", () => {
      const { searchTerm, globalFilterFn } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      searchTerm.value = "Biology";

      const isMatching = globalFilterFn({ index: 1 } as Parameters<typeof globalFilterFn>[0], "", "Biology", addMetaMock);

      expect(isMatching).toBe(true);
    });

    it("should return false for a row when globalFilter matches description but only name key is configured.", () => {
      const keys = ref(["name"]);
      const { searchTerm, globalFilterFn } = useTableGlobalFilter({ data, keys });

      searchTerm.value = "equations";

      const isMatching = globalFilterFn({ index: 0 } as Parameters<typeof globalFilterFn>[0], "", "equations", addMetaMock);

      expect(isMatching).toBe(false);
    });

    it("should return true for a row when keys are updated to include the matching field.", async() => {
      const keys = ref(["name"]);
      const { searchTerm, globalFilterFn } = useTableGlobalFilter({ data, keys });

      searchTerm.value = "equations";
      keys.value = ["name", "description"];
      await nextTick();

      const isMatching = globalFilterFn({ index: 0 } as Parameters<typeof globalFilterFn>[0], "", "equations", addMetaMock);

      expect(isMatching).toBe(true);
    });

    it("should return false for a row index that does not exist in data when searching for a non-existent entry.", () => {
      const { searchTerm, globalFilterFn } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      searchTerm.value = "Geography";

      const isMatching = globalFilterFn({ index: 3 } as Parameters<typeof globalFilterFn>[0], "", "Geography", addMetaMock);

      expect(isMatching).toBe(false);
    });

    it("should return true for the new row when data is updated with a matching entry.", async() => {
      const { searchTerm, globalFilterFn } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      searchTerm.value = "Geography";
      data.value = [...data.value, { id: "4", name: "Geography", description: "Earth and maps" }];
      await nextTick();

      const isMatching = globalFilterFn({ index: 3 } as Parameters<typeof globalFilterFn>[0], "", "Geography", addMetaMock);

      expect(isMatching).toBe(true);
    });

    it("should respect custom fuse options when fuseOptions are provided.", () => {
      const { searchTerm, globalFilterFn } = useTableGlobalFilter({
        data,
        keys: ["name"],
        fuseOptions: { threshold: 0 },
      });

      searchTerm.value = "Mathmatcs";

      const isMatching = globalFilterFn({ index: 0 } as Parameters<typeof globalFilterFn>[0], "", "Mathmatcs", addMetaMock);

      expect(isMatching).toBe(false);
    });
  });

  describe("autoRemove", () => {
    it.each<{ description: string; filterValue: string; expected: boolean }>([
      { description: "empty string", filterValue: "", expected: true },
      { description: "only whitespace", filterValue: "   ", expected: true },
      { description: "non-empty string", filterValue: "search", expected: false },
    ])("should return $expected when the filter value is $description.", ({ filterValue, expected }) => {
      const { globalFilterFn } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      const shouldAutoRemove = globalFilterFn.autoRemove?.(filterValue);

      expect(shouldAutoRemove).toBe(expected);
    });
  });
});