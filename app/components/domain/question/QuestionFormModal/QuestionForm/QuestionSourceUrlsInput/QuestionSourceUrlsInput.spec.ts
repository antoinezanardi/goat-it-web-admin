import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";
import { beforeEach, describe, expect, it } from "vitest";

import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { UFormField, UInputTags, UTooltip } from "#components";
import { QuestionSourceUrlsInput } from "#components";

import type { QuestionSourceUrlsInputProps } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionSourceUrlsInput/question-source-urls-input.types";

describe("QuestionSourceUrlsInput Component", () => {
  let wrapper: VueWrapper;

  const defaultQuestionSourceUrlsInputProps: QuestionSourceUrlsInputProps = {
    modelValue: [],
  } as const;

  async function mountQuestionSourceUrlsInputComponent(options: MountSuspendedOptions<typeof QuestionSourceUrlsInput> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionSourceUrlsInput, {
      props: defaultQuestionSourceUrlsInputProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionSourceUrlsInputComponent();
  });

  it("should render the question source urls input component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Input Tags", () => {
    it("should pass the model value to the input tags when mounted.", () => {
      const inputTags = wrapper.findComponent<typeof UInputTags>({ name: "UInputTags" });

      expect(inputTags.props("modelValue")).toStrictEqual([]);
    });

    it("should pass the placeholder to the input tags when mounted.", () => {
      const inputTags = wrapper.findComponent<typeof UInputTags>({ name: "UInputTags" });

      expect(inputTags.props("placeholder")).toBe("questions.placeholders.sourceUrls");
    });

    it("should not disable the input tags when the maximum is not reached.", () => {
      const inputTags = wrapper.findComponent<typeof UInputTags>({ name: "UInputTags" });

      expect(inputTags.props("disabled")).toBeFalsy();
    });

    it("should not disable the input tags when the maximum number of source urls is reached.", async() => {
      wrapper = await mountQuestionSourceUrlsInputComponent({
        props: {
          modelValue: [
            "https://example.com/1",
            "https://example.com/2",
            "https://example.com/3",
            "https://example.com/4",
            "https://example.com/5",
          ],
        },
      });

      const inputTags = wrapper.findComponent<typeof UInputTags>({ name: "UInputTags" });

      expect(inputTags.props("disabled")).toBeFalsy();
    });
  });

  describe("Labels and Hints", () => {
    it("should pass the source urls label to the form field when mounted.", () => {
      const inputTagsField = wrapper.findComponent({ name: "InputTagsField" });

      expect(inputTagsField.props("label")).toBe("questions.fields.sourceUrls");
    });

    it("should pass the add source url hint to the input tags field when mounted.", () => {
      const inputTagsField = wrapper.findComponent({ name: "InputTagsField" });

      expect(inputTagsField.props("addHintText")).toBe("questions.form.addSourceUrlHint");
    });
  });

  describe("Source URL Tags", () => {
    it("should render a QuestionSourceUrlTag for each URL when model value has multiple URLs.", async() => {
      wrapper = await mountQuestionSourceUrlsInputComponent({
        props: {
          modelValue: ["https://example.com", "https://docs.google.com/sheet"],
        },
      });

      const tags = wrapper.findAllComponents({ name: "QuestionSourceUrlTag" });

      expect(tags).toHaveLength(2);
    });

    it("should pass the URL to QuestionSourceUrlTag when rendered.", async() => {
      wrapper = await mountQuestionSourceUrlsInputComponent({
        props: {
          modelValue: ["https://example.com"],
        },
      });

      const tag = wrapper.findComponent({ name: "QuestionSourceUrlTag" });

      expect(tag.props("url")).toBe("https://example.com");
    });
  });

  describe("Delete Tooltip", () => {
    it("should render a tooltip on the delete button with the remove source text when URLs are present.", async() => {
      wrapper = await mountQuestionSourceUrlsInputComponent({
        props: {
          modelValue: ["https://example.com"],
        },
      });

      const tooltips = wrapper.findAllComponents<typeof UTooltip>({ name: "UTooltip" });
      const tooltipTexts = tooltips.map(t => t.props("text"));

      expect(tooltipTexts).toContainEqual(expect.stringContaining("questions.form.removeSource"));
    });
  });

  describe("Adding URLs", () => {
    it("should emit update:modelValue when a valid url is added.", () => {
      const inputTags = wrapper.findComponent<typeof UInputTags>({ name: "UInputTags" });

      getWrapperVm(inputTags).$emit("update:modelValue", ["https://example.com"]);

      expect(wrapper.emitted("update:modelValue")).toStrictEqual([[["https://example.com"]]]);
    });

    it("should not emit update:modelValue when an invalid url is added.", () => {
      const inputTags = wrapper.findComponent<typeof UInputTags>({ name: "UInputTags" });

      getWrapperVm(inputTags).$emit("update:modelValue", ["not-a-url"]);

      expect(wrapper.emitted("update:modelValue")).toBeUndefined();
    });

    it("should not emit update:modelValue when a duplicate url is added.", async() => {
      wrapper = await mountQuestionSourceUrlsInputComponent({
        props: { modelValue: ["https://example.com"] },
      });

      const inputTags = wrapper.findComponent<typeof UInputTags>({ name: "UInputTags" });

      getWrapperVm(inputTags).$emit("update:modelValue", ["https://example.com", "https://example.com"]);

      expect(wrapper.emitted("update:modelValue")).toBeUndefined();
    });

    it("should not emit update:modelValue when the added url is an empty string.", () => {
      const inputTags = wrapper.findComponent<typeof UInputTags>({ name: "UInputTags" });

      getWrapperVm(inputTags).$emit("update:modelValue", [""]);

      expect(wrapper.emitted("update:modelValue")).toBeUndefined();
    });

    it("should emit update:modelValue when a url is removed.", async() => {
      wrapper = await mountQuestionSourceUrlsInputComponent({
        props: { modelValue: ["https://example.com", "https://other.com"] },
      });

      const inputTags = wrapper.findComponent<typeof UInputTags>({ name: "UInputTags" });

      getWrapperVm(inputTags).$emit("update:modelValue", ["https://example.com"]);

      expect(wrapper.emitted("update:modelValue")).toStrictEqual([[["https://example.com"]]]);
    });
  });

  describe("Error Messages", () => {
    it("should not pass an error to the form field when mounted.", () => {
      const formField = wrapper.findComponent<typeof UFormField>("[data-testid='question-source-urls-input']");

      expect(formField.props("error")).toBeUndefined();
    });

    it("should pass the invalid url error to the form field when an invalid url is added.", async() => {
      const inputTags = wrapper.findComponent<typeof UInputTags>({ name: "UInputTags" });

      getWrapperVm(inputTags).$emit("update:modelValue", ["not-a-url"]);
      await nextTick();

      const formField = wrapper.findComponent<typeof UFormField>("[data-testid='question-source-urls-input']");

      expect(formField.props("error")).toBe("questions.errors.invalidUrl");
    });

    it("should pass the duplicate url error to the form field when a duplicate url is added.", async() => {
      wrapper = await mountQuestionSourceUrlsInputComponent({
        props: { modelValue: ["https://example.com"] },
      });

      const inputTags = wrapper.findComponent<typeof UInputTags>({ name: "UInputTags" });

      getWrapperVm(inputTags).$emit("update:modelValue", ["https://example.com", "https://example.com"]);
      await nextTick();

      const formField = wrapper.findComponent<typeof UFormField>("[data-testid='question-source-urls-input']");

      expect(formField.props("error")).toBe("questions.errors.duplicateUrl");
    });

    it("should clear the error from the form field when a valid url is added after an invalid one.", async() => {
      const inputTags = wrapper.findComponent<typeof UInputTags>({ name: "UInputTags" });

      getWrapperVm(inputTags).$emit("update:modelValue", ["not-a-url"]);
      await nextTick();

      getWrapperVm(inputTags).$emit("update:modelValue", ["https://valid.com"]);
      await nextTick();

      const formField = wrapper.findComponent<typeof UFormField>("[data-testid='question-source-urls-input']");

      expect(formField.props("error")).toBeUndefined();
    });

    it("should clear the error from the form field when a url is removed.", async() => {
      wrapper = await mountQuestionSourceUrlsInputComponent({
        props: { modelValue: ["https://example.com"] },
      });

      const inputTags = wrapper.findComponent<typeof UInputTags>({ name: "UInputTags" });

      getWrapperVm(inputTags).$emit("update:modelValue", ["https://example.com", "bad"]);
      await nextTick();

      getWrapperVm(inputTags).$emit("update:modelValue", []);
      await nextTick();

      const formField = wrapper.findComponent<typeof UFormField>("[data-testid='question-source-urls-input']");

      expect(formField.props("error")).toBeUndefined();
    });

    it("should pass the max source urls error to the form field when the maximum number of source urls is reached.", async() => {
      wrapper = await mountQuestionSourceUrlsInputComponent({
        props: {
          modelValue: [
            "https://example.com/1",
            "https://example.com/2",
            "https://example.com/3",
            "https://example.com/4",
            "https://example.com/5",
          ],
        },
      });

      const inputTags = wrapper.findComponent<typeof UInputTags>({ name: "UInputTags" });

      getWrapperVm(inputTags).$emit("update:modelValue", [
        "https://example.com/1",
        "https://example.com/2",
        "https://example.com/3",
        "https://example.com/4",
        "https://example.com/5",
        "https://example.com/6",
      ]);
      await nextTick();

      const formField = wrapper.findComponent<typeof UFormField>("[data-testid='question-source-urls-input']");

      expect(formField.props("error")).toBe("questions.errors.maxSourceUrls");
    });
  });
});