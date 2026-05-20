import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import { DEFAULT_MOCKED_LOCALE } from "~~/tests/unit/utils/mocks/composables/nuxt/useI18n/useI18n.mock.constants";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { UFormField, UInputTags } from "#components";
import { QuestionTriviaInput } from "#components";

import { QUESTION_TRIVIA_INPUT_UI } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionTriviaInput/question-trivia-input.constants";
import type { QuestionTriviaInputProperties } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionTriviaInput/question-trivia-input.types";

describe("QuestionTriviaInput Component", () => {
  let wrapper: VueWrapper;

  const defaultProperties: QuestionTriviaInputProperties = {
    modelValue: ["Existing trivia"],
  };

  async function mountQuestionTriviaInputComponent(options: MountSuspendedOptions<typeof QuestionTriviaInput> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionTriviaInput, {
      props: defaultProperties,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionTriviaInputComponent();
  });

  it("should render the question trivia input component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Form Field", () => {
    it("should render the form field with the trivia label when mounted.", () => {
      const formField = wrapper.findComponent<typeof UFormField>("[data-testid='question-trivia-input']");

      expect(formField.props("label")).toBe("questions.fields.trivia");
    });

    it("should render the form field with the current locale in the name when mounted.", () => {
      const formField = wrapper.findComponent<typeof UFormField>("[data-testid='question-trivia-input']");

      expect(formField.props("name")).toBe(`content.trivia.${DEFAULT_MOCKED_LOCALE}`);
    });

    it("should render the form field as not required when mounted.", () => {
      const formField = wrapper.findComponent<typeof UFormField>("[data-testid='question-trivia-input']");

      expect(formField.props("required")).toBeFalsy();
    });
  });

  describe("Input Tags", () => {
    it("should pass an empty array to the input tags when model value is not provided.", async() => {
      wrapper = await mountQuestionTriviaInputComponent({
        props: {},
      });

      const inputTags = wrapper.findComponent<typeof UInputTags>({ name: "UInputTags" });

      expect(inputTags.props("modelValue")).toStrictEqual([]);
    });

    it("should pass the model value to the input tags when provided.", () => {
      const inputTags = wrapper.findComponent<typeof UInputTags>({ name: "UInputTags" });

      expect(inputTags.props("modelValue")).toStrictEqual(["Existing trivia"]);
    });

    it("should pass the placeholder to the input tags when mounted.", () => {
      const inputTags = wrapper.findComponent<typeof UInputTags>({ name: "UInputTags" });

      expect(inputTags.props("placeholder")).toBe("questions.fields.trivia");
    });

    it("should pass the ui overrides to the input tags when mounted.", () => {
      const inputTags = wrapper.findComponent<typeof UInputTags>({ name: "UInputTags" });

      expect(inputTags.props("ui")).toStrictEqual(QUESTION_TRIVIA_INPUT_UI);
    });

    it("should emit update:modelValue when the input tags value changes.", () => {
      const inputTags = wrapper.findComponent<typeof UInputTags>({ name: "UInputTags" });

      getWrapperVm(inputTags).$emit("update:modelValue", ["New trivia fact"]);

      expect(wrapper.emitted("update:modelValue")).toStrictEqual([[["New trivia fact"]]]);
    });
  });
});