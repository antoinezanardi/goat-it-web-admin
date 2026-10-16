import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { BooleanFilterSelect } from "#components";
import type { USelect } from "#components";

import type { BooleanFilterSelectOption, BooleanFilterSelectProps } from "~/components/shared/table/BooleanFilterSelect/boolean-filter-select.types";

describe("BooleanFilterSelect Component", () => {
  const defaultBooleanFilterSelectProps: BooleanFilterSelectProps = {
    modelValue: undefined,
    label: "Fully translated",
  } as const;

  let wrapper: VueWrapper;

  async function mountBooleanFilterSelectComponent(options: MountSuspendedOptions<typeof BooleanFilterSelect> = {}): Promise<VueWrapper> {
    return mountSuspended(BooleanFilterSelect, {
      props: defaultBooleanFilterSelectProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountBooleanFilterSelectComponent();
  });

  it("should render the boolean filter select component when mounted.", () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe("Label", () => {
    it("should display the label when mounted.", () => {
      expect(wrapper.text()).toContain("Fully translated");
    });
  });

  describe("Test id", () => {
    it("should render the boolean filter select root element with its test id when mounted.", () => {
      expect(wrapper.attributes("data-testid")).toBe("boolean-filter-select");
    });
  });

  describe("Select options", () => {
    it("should pass the any, yes and no options to the select when mounted.", () => {
      const select = wrapper.findComponent<typeof USelect>({ name: "USelect" });

      expect(select.props("items")).toStrictEqual([
        { label: "common.table.filters.any", value: undefined },
        { label: "common.table.filters.yes", value: "yes" },
        { label: "common.table.filters.no", value: "no" },
      ] satisfies BooleanFilterSelectOption[]);
    });

    it("should pass the any label as placeholder to the select when mounted so it is displayed as a placeholder.", () => {
      const select = wrapper.findComponent<typeof USelect>({ name: "USelect" });

      expect(select.props("placeholder")).toBe("common.table.filters.any");
    });
  });

  describe("Model value mapping", () => {
    it("should pass undefined as model value to the select when no value is selected so the any placeholder is displayed.", () => {
      const select = wrapper.findComponent<typeof USelect>({ name: "USelect" });

      expect(select.props("modelValue")).toBeUndefined();
    });

    it("should pass the yes value as model value to the select when the value is true.", async() => {
      wrapper = await mountBooleanFilterSelectComponent({ props: { ...defaultBooleanFilterSelectProps, modelValue: true } });
      const select = wrapper.findComponent<typeof USelect>({ name: "USelect" });

      expect(select.props("modelValue")).toBe("yes");
    });

    it("should pass the no value as model value to the select when the value is false.", async() => {
      wrapper = await mountBooleanFilterSelectComponent({ props: { ...defaultBooleanFilterSelectProps, modelValue: false } });
      const select = wrapper.findComponent<typeof USelect>({ name: "USelect" });

      expect(select.props("modelValue")).toBe("no");
    });
  });

  describe("Emitting model updates", () => {
    it("should emit update:modelValue with true when the select emits the yes value.", () => {
      const select = wrapper.findComponent<typeof USelect>({ name: "USelect" });

      getWrapperVm(select).$emit("update:modelValue", "yes");

      expect(wrapper.emitted("update:modelValue")).toStrictEqual([[true]]);
    });

    it("should emit update:modelValue with false when the select emits the no value.", () => {
      const select = wrapper.findComponent<typeof USelect>({ name: "USelect" });

      getWrapperVm(select).$emit("update:modelValue", "no");

      expect(wrapper.emitted("update:modelValue")).toStrictEqual([[false]]);
    });

    it("should emit update:modelValue with undefined when the select emits the any placeholder.", () => {
      const select = wrapper.findComponent<typeof USelect>({ name: "USelect" });

      getWrapperVm(select).$emit("update:modelValue", undefined);

      expect(wrapper.emitted("update:modelValue")).toStrictEqual([[undefined]]);
    });
  });
});