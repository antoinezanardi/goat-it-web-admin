import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";

import { TableGlobalSearchInput } from "#components";
import type { UButton, UInput, UTooltip } from "#components";

import type { TableGlobalSearchInputProps } from "~/components/shared/table/TableGlobalSearchInput/table-global-search-input.types";

describe("TableGlobalSearchInput Component", () => {
  const defaultProps: TableGlobalSearchInputProps = { modelValue: "" };
  let wrapper: VueWrapper;

  async function mountTableGlobalSearchInputComponent(options: MountSuspendedOptions<typeof TableGlobalSearchInput> = {}): Promise<VueWrapper> {
    return mountSuspended(TableGlobalSearchInput, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountTableGlobalSearchInputComponent();
  });

  it("should render the table global search input component when mounted.", () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe("Input", () => {
    it("should render the input with the default placeholder from i18n when no placeholder prop is provided.", () => {
      const input = wrapper.findComponent<typeof UInput>({ name: "UInput" });

      expect(input.props("placeholder")).toBe("common.table.search.placeholder");
    });

    it("should render the input with the custom placeholder when a placeholder prop is provided.", async() => {
      wrapper = await mountTableGlobalSearchInputComponent({ props: { ...defaultProps, placeholder: "Search themes..." } });

      const input = wrapper.findComponent<typeof UInput>({ name: "UInput" });

      expect(input.props("placeholder")).toBe("Search themes...");
    });

    it("should render the input with search icon when mounted.", () => {
      const input = wrapper.findComponent<typeof UInput>({ name: "UInput" });

      expect(input.props("icon")).toBe("i-lucide-search");
    });

    it("should pass the modelValue to the input when mounted.", async() => {
      wrapper = await mountTableGlobalSearchInputComponent({ props: { modelValue: "test search" } });

      const input = wrapper.findComponent<typeof UInput>({ name: "UInput" });

      expect(input.props("modelValue")).toBe("test search");
    });

    it("should emit update:modelValue when the input value changes.", () => {
      const input = wrapper.findComponent<typeof UInput>({ name: "UInput" });

      getWrapperVm(input).$emit("update:modelValue", "new value");

      expect(wrapper.emitted("update:modelValue")).toStrictEqual([["new value"]]);
    });
  });

  describe("Clear button", () => {
    it("should not render the clear button when modelValue is empty.", () => {
      const clearButton = wrapper.findComponent<typeof UButton>("[data-testid='table-global-search-clear-button']");

      expect(clearButton.exists()).toBe(false);
    });

    it("should render the clear button when modelValue is not empty.", async() => {
      wrapper = await mountTableGlobalSearchInputComponent({ props: { modelValue: "search text" } });

      const clearButton = wrapper.findComponent<typeof UButton>("[data-testid='table-global-search-clear-button']");

      expect(clearButton.exists()).toBe(true);
    });

    it("should render the clear button with the correct aria-label i18n key when modelValue is not empty.", async() => {
      wrapper = await mountTableGlobalSearchInputComponent({ props: { modelValue: "search text" } });

      const clearButton = wrapper.find("[data-testid='table-global-search-clear-button']");

      expect(clearButton.attributes("aria-label")).toBe("common.table.search.clear");
    });

    it("should wrap the clear button in a tooltip with the correct i18n key when modelValue is not empty.", async() => {
      wrapper = await mountTableGlobalSearchInputComponent({ props: { modelValue: "search text" } });

      const tooltip = wrapper.findComponent<typeof UTooltip>({ name: "UTooltip" });

      expect(tooltip.props("text")).toBe("common.table.search.clear");
    });

    it("should emit update:modelValue with empty string when the clear button is clicked.", async() => {
      wrapper = await mountTableGlobalSearchInputComponent({ props: { modelValue: "search text" } });

      const clearButton = wrapper.find("[data-testid='table-global-search-clear-button']");
      await clearButton.trigger("click");

      expect(wrapper.emitted("update:modelValue")).toStrictEqual([[""]]);
    });
  });
});