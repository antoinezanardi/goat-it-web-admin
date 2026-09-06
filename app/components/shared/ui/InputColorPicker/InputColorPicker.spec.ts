import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { InputColorPicker } from "#components";
import type { UColorPicker } from "#components";

describe("InputColorPicker Component", () => {
  let wrapper: VueWrapper;

  const defaultInputColorPickerProps = {} as const;

  async function mountInputColorPickerComponent(options: MountSuspendedOptions<typeof InputColorPicker> = {}): Promise<VueWrapper> {
    return mountSuspended(InputColorPicker, {
      ...defaultInputColorPickerProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountInputColorPickerComponent();
  });

  it("should render the input color picker component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Chip", () => {
    it("should apply the default black background color to the chip when no color is set.", () => {
      const chip = wrapper.find("[data-testid='input-color-picker-chip']");

      expect(chip.attributes("style")).toContain("background-color: #000000");
    });

    it("should apply the provided color to the chip background when a color is set.", async() => {
      wrapper = await mountInputColorPickerComponent({ props: { color: "#FF5733" } });

      const chip = wrapper.find("[data-testid='input-color-picker-chip']");

      expect(chip.attributes("style")).toContain("background-color: #FF5733");
    });
  });

  describe("Hash prefix", () => {
    it("should not display the hash prefix when no color is set and input is not focused.", () => {
      const hashPrefix = wrapper.find("[data-testid='input-color-picker-hash-prefix']");

      expect(hashPrefix.exists()).toBeFalsy();
    });

    it("should display the hash prefix when the input is focused.", async() => {
      const input = wrapper.find("input");
      await input.trigger("focus");

      const hashPrefix = wrapper.find("[data-testid='input-color-picker-hash-prefix']");

      expect(hashPrefix.exists()).toBeTruthy();
    });

    it("should display the hash prefix when a color is set.", async() => {
      wrapper = await mountInputColorPickerComponent({ props: { color: "#FF5733" } });

      const hashPrefix = wrapper.find("[data-testid='input-color-picker-hash-prefix']");

      expect(hashPrefix.exists()).toBeTruthy();
    });

    it("should hide the hash prefix when input loses focus and has no value.", async() => {
      const input = wrapper.find("input");
      await input.trigger("focus");
      await input.trigger("blur");

      const hashPrefix = wrapper.find("[data-testid='input-color-picker-hash-prefix']");

      expect(hashPrefix.exists()).toBeFalsy();
    });
  });

  describe("Labels and Accessibility", () => {
    it("should use the choose color translation key for the palette button aria-label when mounted.", () => {
      const paletteButton = wrapper.find("[data-testid='input-color-picker-palette-icon']");

      expect(paletteButton.attributes("aria-label")).toContain("form.chooseColor");
    });
  });

  describe("Input", () => {
    it("should display the placeholder when no color is set.", () => {
      const input = wrapper.find("input");

      expect(input.attributes("placeholder")).toContain("form.chooseColor");
    });

    it("should display the hex value without hash when a color is set.", async() => {
      wrapper = await mountInputColorPickerComponent({ props: { color: "#FF5733" } });

      const input = wrapper.find("input");

      expect(input.element.value).toBe("FF5733");
    });

    it("should display the hex value as-is when a color without hash prefix is set.", async() => {
      wrapper = await mountInputColorPickerComponent({ props: { color: "AA11BB" } });

      const input = wrapper.find("input");

      expect(input.element.value).toBe("AA11BB");
    });

    it("should reject non-hex characters when input contains invalid characters.", async() => {
      const input = wrapper.find("input");
      await input.trigger("focus");
      await input.setValue("GG5733");

      expect(input.element.value).toBe("5733");
    });

    it("should limit input to 6 characters when more than 6 characters are entered.", async() => {
      const input = wrapper.find("input");
      await input.trigger("focus");
      await input.setValue("FF5733AA");

      expect(input.element.value).toBe("FF5733");
    });

    it("should emit the color model with hash prefix when 6 valid hex characters are entered.", async() => {
      const input = wrapper.find("input");
      await input.trigger("focus");
      await input.setValue("FF5733");

      expect(wrapper.emitted("update:color")).toStrictEqual([["#FF5733"]]);
    });

    it("should emit undefined color model when input is cleared.", async() => {
      wrapper = await mountInputColorPickerComponent({ props: { color: "#FF5733" } });

      const input = wrapper.find("input");
      await input.setValue("");

      expect(wrapper.emitted("update:color")).toStrictEqual([[undefined]]);
    });

    it("should not emit a color update when the input has a partial hex value.", async() => {
      const input = wrapper.find("input");
      await input.trigger("focus");
      await input.setValue("FF5");

      expect(wrapper.emitted("update:color")).toBeUndefined();
    });
  });

  describe("Color picker popover", () => {
    it("should open the popover and render the UColorPicker when the palette icon is clicked.", async() => {
      const paletteIcon = wrapper.find("[data-testid='input-color-picker-palette-icon']");
      await paletteIcon.trigger("click");

      const colorPicker = wrapper.findComponent({ name: "UColorPicker" });

      expect(colorPicker.exists()).toBeTruthy();
    });

    it("should pass the palette icon to the color picker button when mounted.", () => {
      const popover = wrapper.findComponent({ name: "UPopover" });
      const paletteButton = popover.findComponent({ name: "UButton" });

      expect(paletteButton.props("icon")).toBe("i-lucide-palette");
    });

    it("should update the input text when the color picker emits a new value.", async() => {
      const paletteIcon = wrapper.get("[data-testid='input-color-picker-palette-icon']");
      await paletteIcon.trigger("click");

      const colorPicker = wrapper.findComponent<typeof UColorPicker>({ name: "UColorPicker" });
      getWrapperVm(colorPicker).$emit("update:modelValue", "#AABBCC");
      await wrapper.vm.$nextTick();

      const input = wrapper.find("input");

      expect(input.element.value).toBe("AABBCC");
    });

    it("should emit the color model update when the color picker emits a new value.", async() => {
      const paletteIcon = wrapper.get("[data-testid='input-color-picker-palette-icon']");
      await paletteIcon.trigger("click");

      const colorPicker = wrapper.findComponent<typeof UColorPicker>({ name: "UColorPicker" });
      getWrapperVm(colorPicker).$emit("update:modelValue", "#AABBCC");

      expect(wrapper.emitted("update:color")).toStrictEqual([["#AABBCC"]]);
    });
  });
});