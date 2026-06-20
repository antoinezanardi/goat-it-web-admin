import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";

import { QuestionThemesTableHeader } from "#components";
import type { TableGlobalSearchInput, UButton, TableFiltersSection, QuestionThemesTableStatusFilter, TableRowCount } from "#components";

import type { QuestionThemesTableHeaderProps } from "~/components/domain/question-theme/QuestionThemesTable/QuestionThemesTableHeader/question-themes-table-header.types";

describe("QuestionThemesTableHeader Component", () => {
  const defaultProps: QuestionThemesTableHeaderProps = {
    searchTerm: "",
    filteredCount: 0,
    activeFilterCount: 0,
    isLoading: false,
    filters: { status: undefined },
  };
  let wrapper: VueWrapper;

  async function mountQuestionThemesTableHeaderComponent(options: MountSuspendedOptions<typeof QuestionThemesTableHeader> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemesTableHeader, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionThemesTableHeaderComponent();
  });

  it("should render the question themes table header component when mounted.", () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe("Search input", () => {
    it("should render the search input when mounted.", () => {
      const searchInput = wrapper.findComponent<typeof TableGlobalSearchInput>({ name: "TableGlobalSearchInput" });

      expect(searchInput.exists()).toBe(true);
    });

    it("should pass the searchTerm to the search input when mounted.", async() => {
      wrapper = await mountQuestionThemesTableHeaderComponent({ props: { ...defaultProps, searchTerm: "search text" } });

      const searchInput = wrapper.findComponent<typeof TableGlobalSearchInput>({ name: "TableGlobalSearchInput" });

      expect(searchInput.props("modelValue")).toBe("search text");
    });

    it("should emit update:searchTerm when the search input emits update:modelValue.", () => {
      const searchInput = wrapper.findComponent<typeof TableGlobalSearchInput>({ name: "TableGlobalSearchInput" });
      getWrapperVm(searchInput).$emit("update:modelValue", "new search");

      expect(wrapper.emitted("update:searchTerm")).toStrictEqual([["new search"]]);
    });
  });

  describe("Create button", () => {
    it("should render the create question theme button with the correct i18n key when mounted.", () => {
      const button = wrapper.find("#create-question-theme-button");

      expect(button.text()).toContain("questionThemes.createNew");
    });

    it("should render the create question theme button with the correct aria-label when mounted.", () => {
      const button = wrapper.find("#create-question-theme-button");

      expect(button.attributes("aria-label")).toBe("questionThemes.createNew");
    });

    it("should render the create question theme button with the correct icon when mounted.", () => {
      const button = wrapper.findComponent<typeof UButton>({ name: "UButton" });

      expect(button.props("icon")).toBe("i-lucide-circle-plus");
    });

    it("should emit startCreate when the create button is clicked.", async() => {
      const button = wrapper.find<HTMLButtonElement>("#create-question-theme-button");

      await button.trigger("click");

      expect(wrapper.emitted("startCreate")).toBeDefined();
    });
  });

  describe("Filters section", () => {
    it("should render the filters section with active filter count when mounted.", () => {
      const filtersSection = wrapper.findComponent<typeof TableFiltersSection>("[data-testid='question-themes-table-header-filters-section']");

      expect(filtersSection.props("activeFilterCount")).toBe(0);
    });

    it("should pass the active filter count to the filters section when filters are active.", async() => {
      wrapper = await mountQuestionThemesTableHeaderComponent({ props: { ...defaultProps, activeFilterCount: 2 } });

      const filtersSection = wrapper.findComponent<typeof TableFiltersSection>("[data-testid='question-themes-table-header-filters-section']");

      expect(filtersSection.props("activeFilterCount")).toBe(2);
    });

    it("should emit clearFilters when the filters section emits clear.", () => {
      const filtersSection = wrapper.findComponent<typeof TableFiltersSection>("[data-testid='question-themes-table-header-filters-section']");
      getWrapperVm(filtersSection).$emit("clear");

      expect(wrapper.emitted("clearFilters")).toBeDefined();
    });
  });

  describe("Status filter", () => {
    async function expandFiltersSection(): Promise<void> {
      const toggleButton = wrapper.find("[data-testid='table-filters-section-toggle']");
      await toggleButton.trigger("click");
    }

    it("should render the status filter with undefined modelValue when no status is selected.", async() => {
      await expandFiltersSection();
      const statusFilter = wrapper.findComponent<typeof QuestionThemesTableStatusFilter>({ name: "QuestionThemesTableStatusFilter" });

      expect(statusFilter.props("modelValue")).toBeUndefined();
    });

    it("should pass the status filter value when a status is selected.", async() => {
      wrapper = await mountQuestionThemesTableHeaderComponent({ props: { ...defaultProps, filters: { status: "active" } } });
      await expandFiltersSection();
      const statusFilter = wrapper.findComponent<typeof QuestionThemesTableStatusFilter>({ name: "QuestionThemesTableStatusFilter" });

      expect(statusFilter.props("modelValue")).toBe("active");
    });

    it("should emit update:filter with status when the status filter emits update:modelValue.", async() => {
      await expandFiltersSection();
      const statusFilter = wrapper.findComponent<typeof QuestionThemesTableStatusFilter>({ name: "QuestionThemesTableStatusFilter" });
      getWrapperVm(statusFilter).$emit("update:modelValue", "archived");

      expect(wrapper.emitted("update:filter")).toStrictEqual([[{ status: "archived" }]]);
    });
  });

  describe("Table row count", () => {
    it("should render the table row count component when mounted.", () => {
      const rowCount = wrapper.findComponent<typeof TableRowCount>("[data-testid='question-themes-table-row-count']");

      expect(rowCount.exists()).toBe(true);
    });

    it("should pass filteredCount to the row count component when a filteredCount prop is provided.", async() => {
      wrapper = await mountQuestionThemesTableHeaderComponent({ props: { ...defaultProps, filteredCount: 5 } });

      const rowCount = wrapper.findComponent<typeof TableRowCount>("[data-testid='question-themes-table-row-count']");

      expect(rowCount.props("count")).toBe(5);
    });

    it("should pass the question themes itemsCount key to the row count component when rendered.", () => {
      const rowCount = wrapper.findComponent<typeof TableRowCount>("[data-testid='question-themes-table-row-count']");

      expect(rowCount.props("countKey")).toBe("questionThemes.itemsCount");
    });

    it("should pass loading as false to the row count component when not loading.", () => {
      const rowCount = wrapper.findComponent<typeof TableRowCount>("[data-testid='question-themes-table-row-count']");

      expect(rowCount.props("loading")).toBe(false);
    });

    it("should pass loading as true to the row count component when loading.", async() => {
      wrapper = await mountQuestionThemesTableHeaderComponent({ props: { ...defaultProps, isLoading: true } });

      const rowCount = wrapper.findComponent<typeof TableRowCount>("[data-testid='question-themes-table-row-count']");

      expect(rowCount.props("loading")).toBe(true);
    });

    it("should render the row count to the left of the search input when rendered.", () => {
      const rowCount = wrapper.findComponent<typeof TableRowCount>("[data-testid='question-themes-table-row-count']");
      const searchInput = wrapper.findComponent<typeof TableGlobalSearchInput>({ name: "TableGlobalSearchInput" });

      const rowCountElement = rowCount.element as HTMLElement;
      const searchInputElement = searchInput.element as HTMLElement;

      // Acceptable as DOCUMENT_POSITION_FOLLOWING constant value is 4
      // oxlint-disable-next-line no-bitwise
      expect(rowCountElement.compareDocumentPosition(searchInputElement) & 4).toBeTruthy();
    });
  });
});