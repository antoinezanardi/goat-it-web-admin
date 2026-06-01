import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";

import { TableFilterSelect } from "#components";
import type { USelectMenu } from "#components";

import type { TableFilterSelectProps } from "~/components/shared/table/TableFilterSelect/table-filter-select.types";

describe("TableFilterSelect Component", () => {
  const defaultItems = [
    { label: "Active", value: "active" },
    { label: "Archived", value: "archived" },
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
      const items = selectMenu.props("items") as { label: string; value: string | undefined }[];

      expect(items[0]).toStrictEqual({ label: "common.table.filters.all", value: undefined });
    });

    it("should render all provided items after the 'All' option when mounted.", () => {
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });
      const items = selectMenu.props("items") as { label: string; value: string | undefined }[];

      expect(items).toHaveLength(3);
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
});