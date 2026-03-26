import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { InputColorPicker } from "#components";

describe("InputColorPicker Component", () => {
  let wrapper: VueWrapper;

  async function mountInputColorPickerComponent(options: MountSuspendedOptions<typeof InputColorPicker> = {}): Promise<VueWrapper> {
    return mountSuspended(InputColorPicker, {
      attachTo: document.body,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountInputColorPickerComponent();
  });

  it("should render the input color picker component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Button label", () => {
    it("should display the choose color i18n key as label when no color is set.", () => {
      const button = wrapper.findComponent({ name: "UButton" });

      expect(button.props("label")).toBe("form.chooseColor");
    });

    it("should display the color value as label when a color is set.", async() => {
      wrapper = await mountInputColorPickerComponent({ props: { color: "#FF5733" } });

      const button = wrapper.findComponent({ name: "UButton" });

      expect(button.props("label")).toBe("#FF5733");
    });
  });

  describe("Chip style", () => {
    it("should apply the default black background color to the chip when no color is set.", () => {
      const chip = wrapper.find("span");

      expect(chip.attributes("style")).toContain("background-color: #000000");
    });

    it("should apply the provided color to the chip background when a color is set.", async() => {
      wrapper = await mountInputColorPickerComponent({ props: { color: "#FF5733" } });

      const chip = wrapper.find("span");

      expect(chip.attributes("style")).toContain("background-color: #FF5733");
    });
  });

  describe("Color picker popover", () => {
    it("should open the popover and render the UColorPicker when the button is clicked.", async() => {
      const button = wrapper.findAll("button").at(0);
      await button?.trigger("click");

      const colorPicker = wrapper.findComponent({ name: "UColorPicker" });

      expect(colorPicker.exists()).toBeTruthy();
    });

    it("should update the color model when the color picker emits a new value.", async() => {
      const button = wrapper.findAll("button").at(0);
      await button?.trigger("click");

      const colorPicker = wrapper.findComponent({ name: "UColorPicker" });
      await colorPicker.vm.$emit("update:modelValue", "#AABBCC");

      expect(wrapper.emitted("update:color")).toStrictEqual([["#AABBCC"]]);
    });
  });
});