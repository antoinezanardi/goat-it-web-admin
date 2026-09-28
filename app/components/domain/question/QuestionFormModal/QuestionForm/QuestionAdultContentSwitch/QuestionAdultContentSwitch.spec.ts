import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { UFormField, USwitch } from "#components";
import { QuestionAdultContentSwitch } from "#components";

import type { QuestionAdultContentSwitchProps } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionAdultContentSwitch/question-adult-content-switch.types";

describe("QuestionAdultContentSwitch Component", () => {
  let wrapper: VueWrapper;
  const defaultQuestionAdultContentSwitchProps: QuestionAdultContentSwitchProps = {
    modelValue: false,
  } as const;

  async function mountQuestionAdultContentSwitchComponent(options: MountSuspendedOptions<typeof QuestionAdultContentSwitch> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionAdultContentSwitch, {
      props: defaultQuestionAdultContentSwitchProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionAdultContentSwitchComponent();
  });

  it("should render the question adult content switch component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Form Field", () => {
    it("should render the form field when mounted.", () => {
      const formField = wrapper.findComponent<typeof UFormField>("[data-testid='question-adult-content-switch-field']");

      expect(formField.exists()).toBeTruthy();
    });

    it("should pass the isAdultContent name to the form field when mounted.", () => {
      const formField = wrapper.findComponent<typeof UFormField>("[data-testid='question-adult-content-switch-field']");

      expect(formField.props("name")).toBe("isAdultContent");
    });

    it("should not render the form field as required when mounted.", () => {
      const formField = wrapper.findComponent<typeof UFormField>("[data-testid='question-adult-content-switch-field']");

      expect(formField.props("required")).toBeFalsy();
    });

    it("should apply the w-full class to the form field when mounted.", () => {
      const formField = wrapper.findComponent<typeof UFormField>("[data-testid='question-adult-content-switch-field']");

      expect(formField.classes()).toContain("w-full");
    });
  });

  describe("Switch", () => {
    it("should render the switch when mounted.", () => {
      const switchComponent = wrapper.findComponent<typeof USwitch>("[data-testid='question-adult-content-switch']");

      expect(switchComponent.exists()).toBeTruthy();
    });

    it("should pass the adult content label key to the switch when mounted.", () => {
      const switchComponent = wrapper.findComponent<typeof USwitch>({ name: "USwitch" });

      expect(switchComponent.props("label")).toBe("questions.fields.isAdultContent");
    });

    it("should pass false as model value to the switch when modelValue is false.", () => {
      const switchComponent = wrapper.findComponent<typeof USwitch>({ name: "USwitch" });

      expect(switchComponent.props("modelValue")).toBe(false);
    });

    it("should pass true as model value to the switch when modelValue is true.", async() => {
      wrapper = await mountQuestionAdultContentSwitchComponent({ props: { modelValue: true } });

      const switchComponent = wrapper.findComponent<typeof USwitch>({ name: "USwitch" });

      expect(switchComponent.props("modelValue")).toBe(true);
    });

    it("should disable the switch when the disabled prop is true.", async() => {
      wrapper = await mountQuestionAdultContentSwitchComponent({ props: { disabled: true, modelValue: false } });

      const switchComponent = wrapper.findComponent<typeof USwitch>({ name: "USwitch" });

      expect(switchComponent.props("disabled")).toBeTruthy();
    });

    it("should not disable the switch when the disabled prop is false.", () => {
      const switchComponent = wrapper.findComponent<typeof USwitch>({ name: "USwitch" });

      expect(switchComponent.props("disabled")).toBeFalsy();
    });
  });

  describe("Emits", () => {
    it("should emit update:modelValue with true when the switch is enabled.", () => {
      const switchComponent = wrapper.findComponent<typeof USwitch>({ name: "USwitch" });

      getWrapperVm(switchComponent).$emit("update:modelValue", true);

      expect(wrapper.emitted("update:modelValue")).toStrictEqual([[true]]);
    });

    it("should emit update:modelValue with false when the switch is disabled.", () => {
      const switchComponent = wrapper.findComponent<typeof USwitch>({ name: "USwitch" });

      getWrapperVm(switchComponent).$emit("update:modelValue", false);

      expect(wrapper.emitted("update:modelValue")).toStrictEqual([[false]]);
    });
  });
});