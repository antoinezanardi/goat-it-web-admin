import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { UFormField, UInputTags, UKbd } from "#components";
import { InputTagsField } from "#components";

import type { InputTagsFieldProps } from "~/components/shared/form/InputTagsField/input-tags-field.types";

describe("InputTagsField Component", () => {
  let wrapper: VueWrapper;

  const defaultRemoveTooltipText = vi.fn<(item: string) => string>((item: string) => `Remove alias ${item}`);

  const defaultProperties: InputTagsFieldProps = {
    modelValue: ["nature", "ecology"],
    addHintText: "to add an alias",
    removeTooltipText: defaultRemoveTooltipText,
    label: "Aliases",
    name: "aliases.fr",
    placeholder: "e.g., ecology, fauna, flora",
    required: true,
  };

  async function mountInputTagsFieldComponent(options: MountSuspendedOptions<typeof InputTagsField> = {}): Promise<VueWrapper> {
    return mountSuspended(InputTagsField, {
      props: defaultProperties,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountInputTagsFieldComponent();
  });

  it("should render the input tags field component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Form Field", () => {
    it.each<{ formFieldProp: string; expectedValue: unknown }>([
      { formFieldProp: "label", expectedValue: "Aliases" },
      { formFieldProp: "name", expectedValue: "aliases.fr" },
      { formFieldProp: "required", expectedValue: true },
    ])("should pass $formFieldProp as $expectedValue to the form field when mounted.", ({ formFieldProp, expectedValue }) => {
      const formField = wrapper.findComponent<typeof UFormField>({ name: "UFormField" });

      expect(formField.props(formFieldProp)).toBe(expectedValue);
    });

    it("should pass error to the form field when error prop is provided.", async() => {
      wrapper = await mountInputTagsFieldComponent({
        props: { ...defaultProperties, error: "Field is required" },
      });
      const formField = wrapper.findComponent<typeof UFormField>({ name: "UFormField" });

      expect(formField.props("error")).toBe("Field is required");
    });

    it("should not pass error to the form field when error prop is not provided.", () => {
      const formField = wrapper.findComponent<typeof UFormField>({ name: "UFormField" });

      expect(formField.props("error")).toBeUndefined();
    });
  });

  describe("Description Hint", () => {
    it("should render the press translation key in the description when mounted.", () => {
      expect(wrapper.text()).toContain("common.form.press");
    });

    it("should render the kbd component in the description when mounted.", () => {
      const kbd = wrapper.findComponent<typeof UKbd>({ name: "UKbd" });

      expect(kbd.exists()).toBeTruthy();
    });

    it("should render the kbd component with the enter key translation in the description when mounted.", () => {
      const kbd = wrapper.findComponent<typeof UKbd>({ name: "UKbd" });

      expect(kbd.props("value")).toBe("common.form.enterKey");
    });

    it("should render the add hint text in the description when mounted.", () => {
      expect(wrapper.text()).toContain("to add an alias");
    });
  });

  describe("Input Tags", () => {
    it.each<{ prop: string; expectedValue: unknown }>([
      { prop: "modelValue", expectedValue: ["nature", "ecology"] },
      { prop: "placeholder", expectedValue: "e.g., ecology, fauna, flora" },
      { prop: "addOnBlur", expectedValue: true },
      { prop: "addOnTab", expectedValue: true },
      { prop: "duplicate", expectedValue: false },
    ])("should pass $prop to the input tags when mounted.", ({ prop, expectedValue }) => {
      const inputTags = wrapper.findComponent<typeof UInputTags>({ name: "UInputTags" });

      expect(inputTags.props(prop)).toStrictEqual(expectedValue);
    });

    it("should pass duplicate as true to the input tags when duplicate prop is true.", async() => {
      wrapper = await mountInputTagsFieldComponent({
        props: { ...defaultProperties, duplicate: true },
      });
      const inputTags = wrapper.findComponent<typeof UInputTags>({ name: "UInputTags" });

      expect(inputTags.props("duplicate")).toBe(true);
    });

    it("should emit update:modelValue when the input tags value changes.", () => {
      const inputTags = wrapper.findComponent<typeof UInputTags>({ name: "UInputTags" });

      getWrapperVm(inputTags).$emit("update:modelValue", ["nature", "ecology", "fauna"]);

      expect(wrapper.emitted("update:modelValue")).toStrictEqual([[["nature", "ecology", "fauna"]]]);
    });
  });
});