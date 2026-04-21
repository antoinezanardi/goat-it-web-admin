import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Ref } from "vue";
import { nextTick, ref } from "vue";

import { useTableGlobalFilter } from "~/composables/ui/useTableGlobalFilter/useTableGlobalFilter";
 
// oxlint-disable-next-line no-empty-function -- Intentional no-op callback for FilterFn parameters
function noop(): void {}

type TestRow = {
  id: string;
  name: string;
  description: string;
};

describe(useTableGlobalFilter, () => {
  let data: Ref<TestRow[]>;

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
    it("should return false for all rows when globalFilter is empty.", () => {
      // oxlint-disable-next-line typescript/no-unsafe-assignment -- FilterFn<T> type is not resolved by oxlint type-aware mode
      const { globalFilterFn } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      // oxlint-disable-next-line typescript/no-unsafe-assignment, typescript/no-unsafe-call -- FilterFn<T> type is not resolved by oxlint type-aware mode
      const isMatching = globalFilterFn({ index: 0 } as Parameters<typeof globalFilterFn>[0], "", "", noop);

      expect(isMatching).toBe(false);
    });

    it("should return false for all rows when globalFilter contains only whitespace.", () => {
      // oxlint-disable-next-line typescript/no-unsafe-assignment -- FilterFn<T> type is not resolved by oxlint type-aware mode
      const { searchTerm, globalFilterFn } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      searchTerm.value = "   ";

      // oxlint-disable-next-line typescript/no-unsafe-assignment, typescript/no-unsafe-call -- FilterFn<T> type is not resolved by oxlint type-aware mode
      const isMatching = globalFilterFn({ index: 0 } as Parameters<typeof globalFilterFn>[0], "", "", noop);

      expect(isMatching).toBe(false);
    });

    it("should return true for a row matching the search term when globalFilter matches by name.", () => {
      // oxlint-disable-next-line typescript/no-unsafe-assignment -- FilterFn<T> type is not resolved by oxlint type-aware mode
      const { searchTerm, globalFilterFn } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      searchTerm.value = "Mathematics";

      // oxlint-disable-next-line typescript/no-unsafe-assignment, typescript/no-unsafe-call -- FilterFn<T> type is not resolved by oxlint type-aware mode
      const isMatching = globalFilterFn({ index: 0 } as Parameters<typeof globalFilterFn>[0], "", "Mathematics", noop);

      expect(isMatching).toBe(true);
    });

    it("should return false for a row not matching the search term when globalFilter does not match.", () => {
      // oxlint-disable-next-line typescript/no-unsafe-assignment -- FilterFn<T> type is not resolved by oxlint type-aware mode
      const { searchTerm, globalFilterFn } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      searchTerm.value = "Mathematics";

      // oxlint-disable-next-line typescript/no-unsafe-assignment, typescript/no-unsafe-call -- FilterFn<T> type is not resolved by oxlint type-aware mode
      const isMatching = globalFilterFn({ index: 1 } as Parameters<typeof globalFilterFn>[0], "", "Mathematics", noop);

      expect(isMatching).toBe(false);
    });

    it("should perform fuzzy matching when search term has typos.", () => {
      // oxlint-disable-next-line typescript/no-unsafe-assignment -- FilterFn<T> type is not resolved by oxlint type-aware mode
      const { searchTerm, globalFilterFn } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      searchTerm.value = "Mathmatcs";

      // oxlint-disable-next-line typescript/no-unsafe-assignment, typescript/no-unsafe-call -- FilterFn<T> type is not resolved by oxlint type-aware mode
      const isMatching = globalFilterFn({ index: 0 } as Parameters<typeof globalFilterFn>[0], "", "Mathmatcs", noop);

      expect(isMatching).toBe(true);
    });

    it("should match on description field when search term matches description.", () => {
      // oxlint-disable-next-line typescript/no-unsafe-assignment -- FilterFn<T> type is not resolved by oxlint type-aware mode
      const { searchTerm, globalFilterFn } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      searchTerm.value = "Biology";

      // oxlint-disable-next-line typescript/no-unsafe-assignment, typescript/no-unsafe-call -- FilterFn<T> type is not resolved by oxlint type-aware mode
      const isMatching = globalFilterFn({ index: 1 } as Parameters<typeof globalFilterFn>[0], "", "Biology", noop);

      expect(isMatching).toBe(true);
    });

    it("should return false for a row when globalFilter matches description but only name key is configured.", () => {
      const keys = ref(["name"]);
      // oxlint-disable-next-line typescript/no-unsafe-assignment -- FilterFn<T> type is not resolved by oxlint type-aware mode
      const { searchTerm, globalFilterFn } = useTableGlobalFilter({ data, keys });

      searchTerm.value = "equations";

      // oxlint-disable-next-line typescript/no-unsafe-assignment, typescript/no-unsafe-call -- FilterFn<T> type is not resolved by oxlint type-aware mode
      const isMatching = globalFilterFn({ index: 0 } as Parameters<typeof globalFilterFn>[0], "", "equations", noop);

      expect(isMatching).toBe(false);
    });

    it("should return true for a row when keys are updated to include the matching field.", async() => {
      const keys = ref(["name"]);
      // oxlint-disable-next-line typescript/no-unsafe-assignment -- FilterFn<T> type is not resolved by oxlint type-aware mode
      const { searchTerm, globalFilterFn } = useTableGlobalFilter({ data, keys });

      searchTerm.value = "equations";
      keys.value = ["name", "description"];
      await nextTick();

      // oxlint-disable-next-line typescript/no-unsafe-assignment, typescript/no-unsafe-call -- FilterFn<T> type is not resolved by oxlint type-aware mode
      const isMatching = globalFilterFn({ index: 0 } as Parameters<typeof globalFilterFn>[0], "", "equations", noop);

      expect(isMatching).toBe(true);
    });

    it("should return false for a row index that does not exist in data when searching for a non-existent entry.", () => {
      // oxlint-disable-next-line typescript/no-unsafe-assignment -- FilterFn<T> type is not resolved by oxlint type-aware mode
      const { searchTerm, globalFilterFn } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      searchTerm.value = "Geography";

      // oxlint-disable-next-line typescript/no-unsafe-assignment, typescript/no-unsafe-call -- FilterFn<T> type is not resolved by oxlint type-aware mode
      const isMatching = globalFilterFn({ index: 3 } as Parameters<typeof globalFilterFn>[0], "", "Geography", noop);

      expect(isMatching).toBe(false);
    });

    it("should return true for the new row when data is updated with a matching entry.", async() => {
      // oxlint-disable-next-line typescript/no-unsafe-assignment -- FilterFn<T> type is not resolved by oxlint type-aware mode
      const { searchTerm, globalFilterFn } = useTableGlobalFilter({ data, keys: ["name", "description"] });

      searchTerm.value = "Geography";
      data.value = [...data.value, { id: "4", name: "Geography", description: "Earth and maps" }];
      await nextTick();

      // oxlint-disable-next-line typescript/no-unsafe-assignment, typescript/no-unsafe-call -- FilterFn<T> type is not resolved by oxlint type-aware mode
      const isMatching = globalFilterFn({ index: 3 } as Parameters<typeof globalFilterFn>[0], "", "Geography", noop);

      expect(isMatching).toBe(true);
    });

    it("should respect custom fuse options when fuseOptions are provided.", () => {
      // oxlint-disable-next-line typescript/no-unsafe-assignment -- FilterFn<T> type is not resolved by oxlint type-aware mode
      const { searchTerm, globalFilterFn } = useTableGlobalFilter({
        data,
        keys: ["name"],
        fuseOptions: { threshold: 0 },
      });

      searchTerm.value = "Mathmatcs";

      // oxlint-disable-next-line typescript/no-unsafe-assignment, typescript/no-unsafe-call -- FilterFn<T> type is not resolved by oxlint type-aware mode
      const isMatching = globalFilterFn({ index: 0 } as Parameters<typeof globalFilterFn>[0], "", "Mathmatcs", noop);

      expect(isMatching).toBe(false);
    });
  });
});