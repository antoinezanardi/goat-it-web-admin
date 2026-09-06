import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { TableFiltersSection } from "#components";
import type { UBadge, UButton } from "#components";

import type { TableFiltersSectionProps } from "~/components/shared/table/TableFiltersSection/table-filters-section.types";

describe("TableFiltersSection Component", () => {
  const defaultTableFiltersSectionProps: TableFiltersSectionProps = { activeFilterCount: 0 } as const;
  let wrapper: VueWrapper;

  async function mountTableFiltersSectionComponent(options: MountSuspendedOptions<typeof TableFiltersSection> = {}): Promise<VueWrapper> {
    return mountSuspended(TableFiltersSection, {
      props: defaultTableFiltersSectionProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountTableFiltersSectionComponent();
  });

  it("should render the table filters section component when mounted.", () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe("Toggle button", () => {
    it("should render the toggle button with filters label when mounted.", () => {
      const toggleButton = wrapper.find("[data-testid='table-filters-section-toggle']");

      expect(toggleButton.text()).toContain("common.table.filters.label");
    });

    it("should render the toggle button with a chevron-down icon when collapsed.", () => {
      const toggleButton = wrapper.findComponent<typeof UButton>({ name: "UButton" });

      expect(toggleButton.props("icon")).toBe("i-lucide-chevron-down");
    });

    it("should keep the chevron-down icon when expanded and rotate via CSS.", async() => {
      const toggleButton = wrapper.find("[data-testid='table-filters-section-toggle']");
      await toggleButton.trigger("click");
      const button = wrapper.findComponent<typeof UButton>({ name: "UButton" });

      expect(button.props("icon")).toBe("i-lucide-chevron-down");
    });

    it("should not render the badge when activeFilterCount is 0.", () => {
      const badge = wrapper.findComponent<typeof UBadge>("[data-testid='table-filters-section-badge']");

      expect(badge.exists()).toBe(false);
    });

    it("should render the badge with count when activeFilterCount is greater than 0.", async() => {
      wrapper = await mountTableFiltersSectionComponent({ props: { activeFilterCount: 2 } });
      const badge = wrapper.find("[data-testid='table-filters-section-badge']");

      expect(badge.text()).toContain("2");
    });
  });

  describe("Toolbar end slot", () => {
    it("should render the toolbar-end slot content when provided.", async() => {
      wrapper = await mountTableFiltersSectionComponent({
        slots: { toolbarEnd: "<div data-testid='toolbar-end-slot-content'>Row Count</div>" },
      });
      const toolbarEndContent = wrapper.find("[data-testid='toolbar-end-slot-content']");

      expect(toolbarEndContent.exists()).toBe(true);
    });
  });

  describe("Collapsible area", () => {
    it("should be collapsed when rendered.", () => {
      const collapsible = wrapper.find("[data-testid='table-filters-section']");

      expect(collapsible.attributes("data-state")).toBe("closed");
    });

    it("should render slot content when expanded.", async() => {
      wrapper = await mountTableFiltersSectionComponent({
        props: defaultTableFiltersSectionProps,
        slots: { default: "<div data-testid='slot-content'>Filter here</div>" },
      });
      const toggleButton = wrapper.find("[data-testid='table-filters-section-toggle']");
      await toggleButton.trigger("click");
      const slotContent = wrapper.find("[data-testid='slot-content']");

      expect(slotContent.exists()).toBe(true);
    });
  });

  describe("Clear all button", () => {
    it("should not render the clear all button when activeFilterCount is 0.", async() => {
      const toggleButton = wrapper.find("[data-testid='table-filters-section-toggle']");
      await toggleButton.trigger("click");
      const clearButton = wrapper.find("[data-testid='table-filters-section-clear']");

      expect(clearButton.exists()).toBe(false);
    });

    it("should render the clear all button when activeFilterCount is greater than 0 and section is expanded.", async() => {
      wrapper = await mountTableFiltersSectionComponent({ props: { activeFilterCount: 1 } });
      const toggleButton = wrapper.find("[data-testid='table-filters-section-toggle']");
      await toggleButton.trigger("click");
      const clearButton = wrapper.find("[data-testid='table-filters-section-clear']");

      expect(clearButton.exists()).toBe(true);
    });

    it("should render the clear all button with the correct i18n key when activeFilterCount is greater than 0 and section is expanded.", async() => {
      wrapper = await mountTableFiltersSectionComponent({ props: { activeFilterCount: 1 } });
      const toggleButton = wrapper.find("[data-testid='table-filters-section-toggle']");
      await toggleButton.trigger("click");
      const clearButton = wrapper.find("[data-testid='table-filters-section-clear']");

      expect(clearButton.text()).toContain("common.table.filters.clearAll");
    });

    it("should emit clear when the clear all button is clicked.", async() => {
      wrapper = await mountTableFiltersSectionComponent({ props: { activeFilterCount: 1 } });
      const toggleButton = wrapper.find("[data-testid='table-filters-section-toggle']");
      await toggleButton.trigger("click");
      const clearButton = wrapper.find("[data-testid='table-filters-section-clear']");
      await clearButton.trigger("click");

      expect(wrapper.emitted("clear")).toStrictEqual([[]]);
    });

    it("should pass the x icon to the clear all button when activeFilterCount is greater than 0.", async() => {
      wrapper = await mountTableFiltersSectionComponent({ props: { activeFilterCount: 1 } });
      const toggleButton = wrapper.find("[data-testid='table-filters-section-toggle']");
      await toggleButton.trigger("click");
      const clearButton = wrapper.findComponent<typeof UButton>("[data-testid='table-filters-section-clear']");

      expect(clearButton.props("icon")).toBe("i-lucide-x");
    });
  });
});