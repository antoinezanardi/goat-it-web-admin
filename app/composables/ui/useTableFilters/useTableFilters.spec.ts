import { describe, expect, it } from "vitest";

import { useTableFilters } from "~/composables/ui/useTableFilters/useTableFilters";

describe(useTableFilters, () => {
  describe("filters", () => {
    it("should initialize the filter to its default value when created with a single filter.", () => {
      const { filters } = useTableFilters({
        definitions: {
          status: { default: undefined },
        },
      });

      expect(filters.status.value).toBeUndefined();
    });

    it("should initialize the first filter to its default value when created with multiple filters.", () => {
      const { filters } = useTableFilters({
        definitions: {
          status: { default: undefined },
          category: { default: "all" },
        },
      });

      expect(filters.status.value).toBeUndefined();
    });

    it("should initialize the second filter to its default value when created with multiple filters.", () => {
      const { filters } = useTableFilters({
        definitions: {
          status: { default: undefined },
          category: { default: "all" },
        },
      });

      expect(filters.category.value).toBe("all");
    });

    it("should be reactive and allow updates when filter value is changed.", () => {
      const { filters } = useTableFilters({
        definitions: {
          status: { default: undefined as string | undefined },
        },
      });

      filters.status.value = "active";

      expect(filters.status.value).toBe("active");
    });
  });

  describe("activeFilterCount", () => {
    it("should return 0 when no filters differ from their defaults.", () => {
      const { activeFilterCount } = useTableFilters({
        definitions: {
          status: { default: undefined },
        },
      });

      expect(activeFilterCount.value).toBe(0);
    });

    it("should return 1 when one filter differs from its default.", () => {
      const { filters, activeFilterCount } = useTableFilters({
        definitions: {
          status: { default: undefined as string | undefined },
        },
      });

      filters.status.value = "active";

      expect(activeFilterCount.value).toBe(1);
    });

    it("should return 2 when two filters differ from their defaults.", () => {
      const { filters, activeFilterCount } = useTableFilters({
        definitions: {
          status: { default: undefined as string | undefined },
          category: { default: "all" },
        },
      });

      filters.status.value = "active";
      filters.category.value = "trivia";

      expect(activeFilterCount.value).toBe(2);
    });

    it("should return 0 when an array filter is empty.", () => {
      const { activeFilterCount } = useTableFilters({
        definitions: {
          themeIds: { default: [] as string[] },
        },
      });

      expect(activeFilterCount.value).toBe(0);
    });

    it("should return 1 when an array filter contains items.", () => {
      const { filters, activeFilterCount } = useTableFilters({
        definitions: {
          themeIds: { default: [] as string[] },
        },
      });

      filters.themeIds.value = ["theme-1", "theme-2"];

      expect(activeFilterCount.value).toBe(1);
    });
  });

  describe("hasActiveFilters", () => {
    it("should return false when no filters are active.", () => {
      const { hasActiveFilters } = useTableFilters({
        definitions: {
          status: { default: undefined },
        },
      });

      expect(hasActiveFilters.value).toBe(false);
    });

    it("should return true when at least one filter is active.", () => {
      const { filters, hasActiveFilters } = useTableFilters({
        definitions: {
          status: { default: undefined as string | undefined },
        },
      });

      filters.status.value = "active";

      expect(hasActiveFilters.value).toBe(true);
    });
  });

  describe("clearFilters", () => {
    it("should reset the first filter to its default value when called.", () => {
      const { filters, clearFilters } = useTableFilters({
        definitions: {
          status: { default: undefined as string | undefined },
          category: { default: "all" },
        },
      });

      filters.status.value = "active";
      filters.category.value = "trivia";
      clearFilters();

      expect(filters.status.value).toBeUndefined();
    });

    it("should reset the second filter to its default value when called.", () => {
      const { filters, clearFilters } = useTableFilters({
        definitions: {
          status: { default: undefined as string | undefined },
          category: { default: "all" },
        },
      });

      filters.status.value = "active";
      filters.category.value = "trivia";
      clearFilters();

      expect(filters.category.value).toBe("all");
    });

    it("should reset activeFilterCount to 0 when called.", () => {
      const { filters, activeFilterCount, clearFilters } = useTableFilters({
        definitions: {
          status: { default: undefined as string | undefined },
        },
      });

      filters.status.value = "active";
      clearFilters();

      expect(activeFilterCount.value).toBe(0);
    });

    it("should reset an array filter to its default empty value when called.", () => {
      const { filters, clearFilters } = useTableFilters({
        definitions: {
          themeIds: { default: [] as string[] },
        },
      });

      filters.themeIds.value = ["theme-1"];
      clearFilters();

      expect(filters.themeIds.value).toStrictEqual([]);
    });
  });

  describe("setFilterValue", () => {
    it("should set the filter value for the given key when called.", () => {
      const { filters, setFilterValue } = useTableFilters({
        definitions: {
          status: { default: undefined as string | undefined },
        },
      });

      setFilterValue("status", "active");

      expect(filters.status.value).toBe("active");
    });

    it("should set the filter value for a specific key without affecting other filters when called.", () => {
      const { filters, setFilterValue } = useTableFilters({
        definitions: {
          status: { default: undefined as string | undefined },
          category: { default: "all" },
        },
      });

      setFilterValue("status", "archived");

      expect(filters.category.value).toBe("all");
    });

    it("should update activeFilterCount when setting a filter to a non-default value.", () => {
      const { activeFilterCount, setFilterValue } = useTableFilters({
        definitions: {
          status: { default: undefined as string | undefined },
        },
      });

      setFilterValue("status", "active");

      expect(activeFilterCount.value).toBe(1);
    });

    it("should reset activeFilterCount when setting a filter back to its default value.", () => {
      const { filters, activeFilterCount, setFilterValue } = useTableFilters({
        definitions: {
          status: { default: undefined as string | undefined },
        },
      });

      filters.status.value = "active";
      setFilterValue("status", undefined);

      expect(activeFilterCount.value).toBe(0);
    });
  });
});