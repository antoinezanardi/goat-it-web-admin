import { nextTick } from "vue";
import { describe, expect, it, vi } from "vitest";

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
  });

  describe("onChange", () => {
    it("should call onChange with current filter values when a filter value changes.", async() => {
      const onChange = vi.fn<(values: { status: string | undefined }) => void>();
      const { filters } = useTableFilters({
        definitions: {
          status: { default: undefined as string | undefined },
        },
        onChange,
      });

      filters.status.value = "active";
      await nextTick();

      expect(onChange).toHaveBeenCalledExactlyOnceWith({ status: "active" });
    });

    it("should call onChange with all filter values when one of multiple filters changes.", async() => {
      const onChange = vi.fn<(values: { status: string | undefined; category: string }) => void>();
      const { filters } = useTableFilters({
        definitions: {
          status: { default: undefined as string | undefined },
          category: { default: "all" },
        },
        onChange,
      });

      filters.status.value = "archived";
      await nextTick();

      expect(onChange).toHaveBeenCalledExactlyOnceWith({ status: "archived", category: "all" });
    });

    it("should call onChange when clearFilters resets the values.", async() => {
      const onChange = vi.fn<(values: { status: string | undefined }) => void>();
      const { filters, clearFilters } = useTableFilters({
        definitions: {
          status: { default: undefined as string | undefined },
        },
        onChange,
      });

      filters.status.value = "active";
      await nextTick();
      onChange.mockClear();

      clearFilters();
      await nextTick();

      expect(onChange).toHaveBeenCalledExactlyOnceWith({ status: undefined });
    });

    it("should not call onChange when no onChange callback is provided.", async() => {
      const { filters } = useTableFilters({
        definitions: {
          status: { default: undefined as string | undefined },
        },
      });

      filters.status.value = "active";
      await nextTick();

      expect(filters.status.value).toBe("active");
    });
  });
});