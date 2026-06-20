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

  describe("globalFilterFunction", () => {
    it.each<{ description: string; searchTermValue: string; index: number; filterValue: string; expected: boolean }>([
      { description: "empty", searchTermValue: "", index: 0, filterValue: "", expected: true },
      { description: "only whitespace", searchTermValue: "   ", index: 0, filterValue: "", expected: true },
      { description: "matching by name", searchTermValue: "Mathematics", index: 0, filterValue: "Mathematics", expected: true },
      { description: "not matching", searchTermValue: "Mathematics", index: 1, filterValue: "Mathematics", expected: false },
      { description: "fuzzy matching with typos", searchTermValue: "Mathmatcs", index: 0, filterValue: "Mathmatcs", expected: true },
      { description: "matching on description field", searchTermValue: "Biology", index: 1, filterValue: "Biology", expected: true },
      { description: "matching with leading and trailing whitespace", searchTermValue: " Math ", index: 0, filterValue: " Math ", expected: true },
      { description: "non-existent row index", searchTermValue: "Geography", index: 3, filterValue: "Geography", expected: false },
    ])("should return $expected when globalFilter is $description.", ({ searchTermValue, index, filterValue, expected }) => {
      const { searchTerm, globalFilterFunction } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      searchTerm.value = searchTermValue;

      const isMatching = globalFilterFunction({ index } as Parameters<typeof globalFilterFunction>[0], "", filterValue, addMetaMock);

      expect(isMatching).toBe(expected);
    });

    it("should return false for a row when globalFilter matches description but only name key is configured.", () => {
      const keys = ref(["name"]);
      const { searchTerm, globalFilterFunction } = useTableGlobalFilter({ data, keys });

      searchTerm.value = "equations";

      const isMatching = globalFilterFunction({ index: 0 } as Parameters<typeof globalFilterFunction>[0], "", "equations", addMetaMock);

      expect(isMatching).toBe(false);
    });

    it("should return true for a row when keys are updated to include the matching field.", async() => {
      const keys = ref(["name"]);
      const { searchTerm, globalFilterFunction } = useTableGlobalFilter({ data, keys });

      searchTerm.value = "equations";
      keys.value = ["name", "description"];
      await nextTick();

      const isMatching = globalFilterFunction({ index: 0 } as Parameters<typeof globalFilterFunction>[0], "", "equations", addMetaMock);

      expect(isMatching).toBe(true);
    });

    it("should return true for the new row when data is updated with a matching entry.", async() => {
      const { searchTerm, globalFilterFunction } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      searchTerm.value = "Geography";
      data.value = [...data.value, { id: "4", name: "Geography", description: "Earth and maps" }];
      await nextTick();

      const isMatching = globalFilterFunction({ index: 3 } as Parameters<typeof globalFilterFunction>[0], "", "Geography", addMetaMock);

      expect(isMatching).toBe(true);
    });

    it("should respect custom fuse options when fuseOptions are provided.", () => {
      const { searchTerm, globalFilterFunction } = useTableGlobalFilter({
        data,
        keys: ["name"],
        fuseOptions: { threshold: 0 },
      });

      searchTerm.value = "Mathmatcs";

      const isMatching = globalFilterFunction({ index: 0 } as Parameters<typeof globalFilterFunction>[0], "", "Mathmatcs", addMetaMock);

      expect(isMatching).toBe(false);
    });
  });

  describe("autoRemove", () => {
    it.each<{ description: string; filterValue: unknown; expected: boolean }>([
      { description: "empty string", filterValue: "", expected: true },
      { description: "only whitespace", filterValue: "   ", expected: true },
      { description: "non-empty string", filterValue: "search", expected: false },
      { description: "undefined", filterValue: undefined, expected: true },
      { description: "null", filterValue: null, expected: true },
      { description: "number", filterValue: 42, expected: true },
    ])("should return $expected when the filter value is $description.", ({ filterValue, expected }) => {
      const { globalFilterFunction } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      const shouldAutoRemove = globalFilterFunction.autoRemove?.(filterValue);

      expect(shouldAutoRemove).toBe(expected);
    });
  });

  describe("filteredCount", () => {
    it("should return data length when no search term is active.", () => {
      const { filteredCount } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      expect(filteredCount.value).toBe(3);
    });

    it("should return 0 when data is empty and no search term is active.", () => {
      data.value = [];
      const { filteredCount } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      expect(filteredCount.value).toBe(0);
    });

    it("should return the number of matching rows when a search term is active.", () => {
      const { searchTerm, filteredCount } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      searchTerm.value = "Math";

      expect(filteredCount.value).toBe(1);
    });

    it("should return data length when search term is only whitespace.", () => {
      const { searchTerm, filteredCount } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      searchTerm.value = "   ";

      expect(filteredCount.value).toBe(3);
    });

    it("should update when data changes.", async() => {
      const { filteredCount } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      data.value = [...data.value, { id: "4", name: "Geography", description: "Earth and maps" }];
      await nextTick();

      expect(filteredCount.value).toBe(4);
    });

    it("should update when keys change and the matching set changes.", async() => {
      const keys = ref(["name"]);
      const { searchTerm, filteredCount } = useTableGlobalFilter({ data, keys });

      searchTerm.value = "equations";
      await nextTick();

      expect(filteredCount.value).toBe(0);

      keys.value = ["name", "description"];
      await nextTick();

      expect(filteredCount.value).toBe(1);
    });
  });
});