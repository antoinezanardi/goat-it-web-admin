import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { TableRowCount } from "#components";
import type { USkeleton } from "#components";

import type { TableRowCountProps } from "~/components/shared/table/TableRowCount/table-row-count.types";

describe("TableRowCount Component", () => {
  const defaultProps: TableRowCountProps = {
    count: 0,
    loading: false,
    countKey: "questions.itemsCount",
  };
  let wrapper: VueWrapper;

  async function mountTableRowCountComponent(options: MountSuspendedOptions<typeof TableRowCount> = {}): Promise<VueWrapper> {
    return mountSuspended(TableRowCount, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountTableRowCountComponent();
  });

  it("should render the table row count component when mounted.", () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe("Loading state", () => {
    it("should render a skeleton when loading is true.", async() => {
      wrapper = await mountTableRowCountComponent({ props: { ...defaultProps, loading: true } });

      const skeleton = wrapper.findComponent<typeof USkeleton>("[data-testid='table-row-count-skeleton']");

      expect(skeleton.exists()).toBe(true);
    });

    it("should not render the count text when loading is true.", async() => {
      wrapper = await mountTableRowCountComponent({ props: { ...defaultProps, loading: true } });

      const text = wrapper.find("[data-testid='table-row-count-text']");

      expect(text.exists()).toBe(false);
    });

    it("should render the count text when loading is false.", () => {
      const text = wrapper.find("[data-testid='table-row-count-text']");

      expect(text.exists()).toBe(true);
    });

    it("should not render a skeleton when loading is false.", () => {
      const skeleton = wrapper.findComponent<typeof USkeleton>("[data-testid='table-row-count-skeleton']");

      expect(skeleton.exists()).toBe(false);
    });
  });

  describe("Count text", () => {
    it("should render the count i18n key when loading is false.", () => {
      const text = wrapper.find("[data-testid='table-row-count-text']");

      expect(text.text()).toBe("questions.itemsCount");
    });

    it("should call $t with the count key and count when loading is false.", async() => {
      wrapper = await mountTableRowCountComponent({ props: { ...defaultProps, count: 42 } });

      // Acceptable as $t is a global mock function that doesn't use `this`
      // oxlint-disable-next-line typescript/unbound-method
      expect(wrapper.vm.$t).toHaveBeenCalledWith("questions.itemsCount", 42);
    });

    it("should update $t when the count prop changes.", async() => {
      wrapper = await mountTableRowCountComponent({ props: { ...defaultProps, count: 5 } });

      await wrapper.setProps({ count: 10 });

      // Acceptable as $t is a global mock function that doesn't use `this`
      // oxlint-disable-next-line typescript/unbound-method
      expect(wrapper.vm.$t).toHaveBeenLastCalledWith("questions.itemsCount", 10);
    });

    it("should call $t with the provided count key when countKey changes.", async() => {
      wrapper = await mountTableRowCountComponent({ props: { ...defaultProps, countKey: "questionThemes.itemsCount" } });

      // Acceptable as $t is a global mock function that doesn't use `this`
      // oxlint-disable-next-line typescript/unbound-method
      expect(wrapper.vm.$t).toHaveBeenCalledWith("questionThemes.itemsCount", 0);
    });
  });
});
