import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import { createFakeTableFilterSelectItem } from "~~/tests/unit/utils/faketories/shared/table-filter-select/table-filter-select-item.faketory";
import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";

import { TableFilterSelect } from "#components";
import type { USelectMenu } from "#components";

import type { TableFilterSelectAllItem, TableFilterSelectItem, TableFilterSelectProps } from "~/components/shared/table/TableFilterSelect/table-filter-select.types";

describe("TableFilterSelect Component", () => {
  const defaultItems = [
    createFakeTableFilterSelectItem({ label: "Active", value: "active" }),
    createFakeTableFilterSelectItem({ label: "Archived", value: "archived" }),
  ];

  const defaultProps: TableFilterSelectProps = {
    modelValue: undefined,
    items: defaultItems,
    label: "Status",
  };

  let wrapper: VueWrapper;

  async function mountTableFilterSelectComponent(options: MountSuspendedOptions<typeof TableFilterSelect> = {}): Promise<VueWrapper> {
    return mountSuspended(TableFilterSelect, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountTableFilterSelectComponent();
  });

  it("should render the table filter select component when mounted.", () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe("Select Menu", () => {
    it("should prepend the 'All' option as first item when mounted.", () => {
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });
      const items = selectMenu.props("items") as (TableFilterSelectItem | TableFilterSelectAllItem)[];

      expect(items[0]).toStrictEqual({ label: "common.table.filters.all", value: undefined });
    });

    it("should pass the 'All' label as placeholder to the select menu when no custom placeholder is provided.", () => {
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

      expect(selectMenu.props("placeholder")).toBe("common.table.filters.all");
    });

    it("should pass the custom placeholder to the select menu when a custom placeholder is provided.", async() => {
      wrapper = await mountTableFilterSelectComponent({ props: { ...defaultProps, placeholder: "Select a status" } });
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

      expect(selectMenu.props("placeholder")).toBe("Select a status");
    });

    it("should render all provided items after the 'All' option when mounted.", () => {
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });
      const items = selectMenu.props("items") as (TableFilterSelectItem | TableFilterSelectAllItem)[];

      expect(items).toHaveLength(3);
    });

    it("should pass item icons to the select menu when items have icons.", async() => {
      wrapper = await mountTableFilterSelectComponent({
        props: {
          ...defaultProps,
          items: [createFakeTableFilterSelectItem({ label: "Active", value: "active", icon: "i-lucide-check" })],
        },
      });
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });
      const items = selectMenu.props("items") as (TableFilterSelectItem | TableFilterSelectAllItem)[];

      expect(items[1]).toStrictEqual({ label: "Active", value: "active", icon: "i-lucide-check" });
    });

    it("should pass undefined as modelValue to the select menu when no value is selected.", () => {
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

      expect(selectMenu.props("modelValue")).toBeUndefined();
    });

    it("should pass the active modelValue to the select menu when a value is selected.", async() => {
      wrapper = await mountTableFilterSelectComponent({ props: { ...defaultProps, modelValue: "active" } });
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

      expect(selectMenu.props("modelValue")).toBe("active");
    });

    it("should emit update:modelValue with the selected value when an item is selected.", () => {
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

      getWrapperVm(selectMenu).$emit("update:modelValue", "active");

      expect(wrapper.emitted("update:modelValue")).toStrictEqual([["active"]]);
    });

    it("should emit update:modelValue with undefined when 'All' is selected.", () => {
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

      getWrapperVm(selectMenu).$emit("update:modelValue", undefined);

      expect(wrapper.emitted("update:modelValue")).toStrictEqual([[undefined]]);
    });
  });

  describe("Label", () => {
    it("should display the label when mounted.", () => {
      expect(wrapper.text()).toContain("Status");
    });
  });

  describe("Multiple mode", () => {
    const multipleProps: TableFilterSelectProps = {
      modelValue: [],
      items: defaultItems,
      label: "Themes",
      multiple: true,
    };

    beforeEach(async() => {
      wrapper = await mountTableFilterSelectComponent({ props: multipleProps });
    });

    it("should not prepend the 'All' option when multiple is true.", () => {
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });
      const items = selectMenu.props("items") as (TableFilterSelectItem | TableFilterSelectAllItem)[];

      expect(items).toHaveLength(2);
    });

    it("should pass only the option items without 'All' when multiple is true.", () => {
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });
      const items = selectMenu.props("items") as (TableFilterSelectItem | TableFilterSelectAllItem)[];

      expect(items[0]).toStrictEqual({ label: "Active", value: "active" });
    });

    it("should pass multiple as true to the select menu when multiple is true.", () => {
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

      expect(selectMenu.props("multiple")).toBe(true);
    });

    it("should pass loading as true to the select menu when loading is true.", async() => {
      wrapper = await mountTableFilterSelectComponent({ props: { ...multipleProps, loading: true } });
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

      expect(selectMenu.props("loading")).toBe(true);
    });

    it("should pass the label as placeholder to the select menu when multiple is true.", () => {
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

      expect(selectMenu.props("placeholder")).toBe("Themes");
    });

    it("should pass an empty array as modelValue to the select menu when no value is selected.", () => {
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

      expect(selectMenu.props("modelValue")).toStrictEqual([]);
    });

    it("should pass the selected values as modelValue to the select menu when values are selected.", async() => {
      wrapper = await mountTableFilterSelectComponent({ props: { ...multipleProps, modelValue: ["active", "archived"] } });
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

      expect(selectMenu.props("modelValue")).toStrictEqual(["active", "archived"]);
    });

    it("should emit update:modelValue with an array when the select menu emits an array value.", () => {
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

      getWrapperVm(selectMenu).$emit("update:modelValue", ["active"]);

      expect(wrapper.emitted("update:modelValue")).toStrictEqual([[["active"]]]);
    });
  });
});