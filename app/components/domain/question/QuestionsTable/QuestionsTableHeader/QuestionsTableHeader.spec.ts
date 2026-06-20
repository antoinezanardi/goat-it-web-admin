import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import { createFakeQuestionsTableFilters } from "~~/tests/unit/utils/faketories/questions/components/questions-table-filters.faketory";

import { QuestionsTableHeader } from "#components";
import type { TableGlobalSearchInput, TableFiltersSection, QuestionsTableStatusFilter, QuestionsTableCategoryFilter, QuestionsTableCognitiveDifficultyFilter, TableRowCount } from "#components";

import type { QuestionsTableHeaderProps } from "~/components/domain/question/QuestionsTable/QuestionsTableHeader/questions-table-header.types";

describe("QuestionsTableHeader Component", () => {
  let wrapper: VueWrapper;
  const defaultProps: QuestionsTableHeaderProps = {
    searchTerm: "",
    filteredCount: 0,
    activeFilterCount: 0,
    isLoading: false,
    filters: createFakeQuestionsTableFilters({ status: undefined, category: undefined, cognitiveDifficulty: undefined }),
  };

  async function mountQuestionsTableHeaderComponent(options: MountSuspendedOptions<typeof QuestionsTableHeader> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionsTableHeader, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionsTableHeaderComponent();
  });

  async function expandFiltersSection(): Promise<void> {
    const toggleButton = wrapper.find("[data-testid='table-filters-section-toggle']");
    await toggleButton.trigger("click");
  }

  it("should render the questions table header component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Search input", () => {
    it("should render the search input when mounted.", () => {
      const searchInput = wrapper.findComponent<typeof TableGlobalSearchInput>({ name: "TableGlobalSearchInput" });

      expect(searchInput.exists()).toBeTruthy();
    });

    it("should pass the searchTerm to the search input when mounted.", async() => {
      wrapper = await mountQuestionsTableHeaderComponent({ props: { ...defaultProps, searchTerm: "search text" } });

      const searchInput = wrapper.findComponent<typeof TableGlobalSearchInput>({ name: "TableGlobalSearchInput" });

      expect(searchInput.props("modelValue")).toBe("search text");
    });

    it("should emit update:searchTerm when the search input emits update:modelValue.", () => {
      const searchInput = wrapper.findComponent<typeof TableGlobalSearchInput>({ name: "TableGlobalSearchInput" });
      getWrapperVm(searchInput).$emit("update:modelValue", "new search");

      expect(wrapper.emitted("update:searchTerm")).toStrictEqual([["new search"]]);
    });
  });

  describe("Create question button", () => {
    it("should render the create question button when mounted.", () => {
      const button = wrapper.find("[data-testid='create-question-button']");

      expect(button.exists()).toBeTruthy();
    });

    it("should render the create question button with the correct aria-label when mounted.", () => {
      const button = wrapper.find("[data-testid='create-question-button']");

      expect(button.attributes("aria-label")).toBe("questions.createNew");
    });

    it("should emit startCreate when the create question button is clicked.", async() => {
      const button = wrapper.find("[data-testid='create-question-button']");
      await button.trigger("click");

      expect(wrapper.emitted("startCreate")).toStrictEqual([[]]);
    });
  });

  describe("Filters section", () => {
    it("should render the filters section with active filter count when mounted.", () => {
      const filtersSection = wrapper.findComponent<typeof TableFiltersSection>("[data-testid='questions-table-header-filters-section']");

      expect(filtersSection.props("activeFilterCount")).toBe(0);
    });

    it("should pass the active filter count to the filters section when filters are active.", async() => {
      wrapper = await mountQuestionsTableHeaderComponent({ props: { ...defaultProps, activeFilterCount: 2 } });

      const filtersSection = wrapper.findComponent<typeof TableFiltersSection>("[data-testid='questions-table-header-filters-section']");

      expect(filtersSection.props("activeFilterCount")).toBe(2);
    });

    it("should emit clearFilters when the filters section emits clear.", () => {
      const filtersSection = wrapper.findComponent<typeof TableFiltersSection>("[data-testid='questions-table-header-filters-section']");
      getWrapperVm(filtersSection).$emit("clear");

      expect(wrapper.emitted("clearFilters")).toBeDefined();
    });
  });

  describe("Status filter", () => {
    it("should render the status filter with undefined modelValue when no status is selected.", async() => {
      await expandFiltersSection();
      const statusFilter = wrapper.findComponent<typeof QuestionsTableStatusFilter>({ name: "QuestionsTableStatusFilter" });

      expect(statusFilter.props("modelValue")).toBeUndefined();
    });

    it("should pass the status filter value when a status is selected.", async() => {
      wrapper = await mountQuestionsTableHeaderComponent({ props: { ...defaultProps, filters: createFakeQuestionsTableFilters({ status: "active" }) } });
      await expandFiltersSection();
      const statusFilter = wrapper.findComponent<typeof QuestionsTableStatusFilter>({ name: "QuestionsTableStatusFilter" });

      expect(statusFilter.props("modelValue")).toBe("active");
    });

    it("should emit update:filter with status when the status filter emits update:modelValue.", async() => {
      await expandFiltersSection();
      const statusFilter = wrapper.findComponent<typeof QuestionsTableStatusFilter>({ name: "QuestionsTableStatusFilter" });
      getWrapperVm(statusFilter).$emit("update:modelValue", "archived");

      expect(wrapper.emitted("update:filter")).toStrictEqual([[{ status: "archived" }]]);
    });
  });

  describe("Category filter", () => {
    it("should render the category filter with undefined modelValue when no category is selected.", async() => {
      await expandFiltersSection();
      const categoryFilter = wrapper.findComponent<typeof QuestionsTableCategoryFilter>({ name: "QuestionsTableCategoryFilter" });

      expect(categoryFilter.props("modelValue")).toBeUndefined();
    });

    it("should pass the category filter value when a category is selected.", async() => {
      wrapper = await mountQuestionsTableHeaderComponent({ props: { ...defaultProps, filters: createFakeQuestionsTableFilters({ category: "trivia" }) } });
      await expandFiltersSection();
      const categoryFilter = wrapper.findComponent<typeof QuestionsTableCategoryFilter>({ name: "QuestionsTableCategoryFilter" });

      expect(categoryFilter.props("modelValue")).toBe("trivia");
    });

    it("should emit update:filter with category when the category filter emits update:modelValue.", async() => {
      await expandFiltersSection();
      const categoryFilter = wrapper.findComponent<typeof QuestionsTableCategoryFilter>({ name: "QuestionsTableCategoryFilter" });
      getWrapperVm(categoryFilter).$emit("update:modelValue", "lexicon");

      expect(wrapper.emitted("update:filter")).toStrictEqual([[{ category: "lexicon" }]]);
    });
  });

  describe("Cognitive difficulty filter", () => {
    it("should render the cognitive difficulty filter with undefined modelValue when no cognitive difficulty is selected.", async() => {
      await expandFiltersSection();
      const cognitiveDifficultyFilter = wrapper.findComponent<typeof QuestionsTableCognitiveDifficultyFilter>({ name: "QuestionsTableCognitiveDifficultyFilter" });

      expect(cognitiveDifficultyFilter.props("modelValue")).toBeUndefined();
    });

    it("should pass the cognitive difficulty filter value when a cognitive difficulty is selected.", async() => {
      wrapper = await mountQuestionsTableHeaderComponent({ props: { ...defaultProps, filters: createFakeQuestionsTableFilters({ cognitiveDifficulty: "easy" }) } });
      await expandFiltersSection();
      const cognitiveDifficultyFilter = wrapper.findComponent<typeof QuestionsTableCognitiveDifficultyFilter>({ name: "QuestionsTableCognitiveDifficultyFilter" });

      expect(cognitiveDifficultyFilter.props("modelValue")).toBe("easy");
    });

    it("should emit update:filter with cognitive difficulty when the cognitive difficulty filter emits update:modelValue.", async() => {
      await expandFiltersSection();
      const cognitiveDifficultyFilter = wrapper.findComponent<typeof QuestionsTableCognitiveDifficultyFilter>({ name: "QuestionsTableCognitiveDifficultyFilter" });
      getWrapperVm(cognitiveDifficultyFilter).$emit("update:modelValue", "hard");

      expect(wrapper.emitted("update:filter")).toStrictEqual([[{ cognitiveDifficulty: "hard" }]]);
    });
  });

  describe("Table row count", () => {
    it("should render the table row count component when mounted.", () => {
      const rowCount = wrapper.findComponent<typeof TableRowCount>("[data-testid='questions-table-row-count']");

      expect(rowCount.exists()).toBe(true);
    });

    it("should pass filteredCount to the row count component when a filteredCount prop is provided.", async() => {
      wrapper = await mountQuestionsTableHeaderComponent({ props: { ...defaultProps, filteredCount: 5 } });

      const rowCount = wrapper.findComponent<typeof TableRowCount>("[data-testid='questions-table-row-count']");

      expect(rowCount.props("count")).toBe(5);
    });

    it("should pass the questions itemsCount key to the row count component when rendered.", () => {
      const rowCount = wrapper.findComponent<typeof TableRowCount>("[data-testid='questions-table-row-count']");

      expect(rowCount.props("countKey")).toBe("questions.itemsCount");
    });

    it("should pass loading as false to the row count component when not loading.", () => {
      const rowCount = wrapper.findComponent<typeof TableRowCount>("[data-testid='questions-table-row-count']");

      expect(rowCount.props("loading")).toBe(false);
    });

    it("should pass loading as true to the row count component when loading.", async() => {
      wrapper = await mountQuestionsTableHeaderComponent({ props: { ...defaultProps, isLoading: true } });

      const rowCount = wrapper.findComponent<typeof TableRowCount>("[data-testid='questions-table-row-count']");

      expect(rowCount.props("loading")).toBe(true);
    });
  });
});