import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";
import { beforeEach, describe, expect, it } from "vitest";

import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";
import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import { DEFAULT_MOCKED_LOCALE } from "~~/tests/unit/utils/mocks/composables/nuxt/useI18n/useI18n.mock.constants";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import type { ComponentVm } from "~~/tests/unit/utils/types/vtu.types";

import type { UForm, UFormField, UInput, UInputTags, UTextarea, QuestionCategorySelector, QuestionDifficultySelector, QuestionThemeSelector } from "#components";
import { QuestionForm } from "#components";

import type { QuestionFormProperties } from "~/components/domain/question/QuestionFormModal/QuestionForm/question-form.types";

type QuestionFormVm = ComponentVm & {
  canSubmit: boolean;
  triggerFormSubmit: () => Promise<void>;
};

describe("QuestionForm Component", () => {
  let wrapper: VueWrapper;
  const fakeThemes = [
    createFakeQuestionTheme({ id: "theme-1" }),
    createFakeQuestionTheme({ id: "theme-2" }),
  ];

  const defaultProperties: QuestionFormProperties = {
    availableThemes: fakeThemes,
  };

  async function mountQuestionFormComponent(options: MountSuspendedOptions<typeof QuestionForm> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionForm, {
      props: defaultProperties,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionFormComponent();
  });

  it("should render the question form component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Form Fields", () => {
    it("should render the statement form field with the correct i18n key when mounted.", () => {
      const statementField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-statement-field']");

      expect(statementField.props("label")).toBe("questions.fields.statement");
    });

    it("should render the statement form field with the current locale in the name when mounted.", () => {
      const statementField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-statement-field']");

      expect(statementField.props("name")).toBe(`content.statement.${DEFAULT_MOCKED_LOCALE}`);
    });

    it("should render the answer form field with the correct i18n key when mounted.", () => {
      const answerField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-answer-field']");

      expect(answerField.props("label")).toBe("questions.fields.answer");
    });

    it("should render the answer form field with the current locale in the name when mounted.", () => {
      const answerField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-answer-field']");

      expect(answerField.props("name")).toBe(`content.answer.${DEFAULT_MOCKED_LOCALE}`);
    });

    it("should render the context form field with the correct i18n key when mounted.", () => {
      const contextField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-context-field']");

      expect(contextField.props("label")).toBe("questions.fields.context");
    });

    it("should render the difficulty form field with the correct i18n key when mounted.", () => {
      const difficultyField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-difficulty-field']");

      expect(difficultyField.props("label")).toBe("questions.fields.cognitiveDifficulty");
    });

    it("should render the category form field with the correct i18n key when mounted.", () => {
      const categoryField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-category-field']");

      expect(categoryField.props("label")).toBe("questions.fields.category");
    });

    it("should render the themes form field with the correct i18n key when mounted.", () => {
      const themesField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-themes-field']");

      expect(themesField.props("label")).toBe("questions.fields.themes");
    });

    it("should render the source urls form field with the correct i18n key when mounted.", () => {
      const sourceUrlsField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-source-urls-field']");

      expect(sourceUrlsField.props("label")).toBe("questions.fields.sourceUrls");
    });
  });

  describe("Form v-model bindings", () => {
    it("should update the statement in the form state when the statement input value changes.", async() => {
      const statementField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-statement-field']");
      const statementInput = statementField.findComponent<typeof UInput>({ name: "UInput" });
      getWrapperVm(statementInput).$emit("update:modelValue", "What is the capital of France?");
      await nextTick();

      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;
      const content = state.content as { statement: Record<string, unknown>; answer: Record<string, unknown>; context: Record<string, unknown> };

      expect(content.statement[DEFAULT_MOCKED_LOCALE]).toBe("What is the capital of France?");
    });

    it("should update the answer in the form state when the answer input value changes.", async() => {
      const answerField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-answer-field']");
      const answerInput = answerField.findComponent<typeof UInput>({ name: "UInput" });
      getWrapperVm(answerInput).$emit("update:modelValue", "Paris");
      await nextTick();

      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;
      const content = state.content as { statement: Record<string, unknown>; answer: Record<string, unknown>; context: Record<string, unknown> };

      expect(content.answer[DEFAULT_MOCKED_LOCALE]).toBe("Paris");
    });

    it("should update the context in the form state when the context textarea value changes.", async() => {
      const contextField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-context-field']");
      const contextTextarea = contextField.findComponent<typeof UTextarea>({ name: "UTextarea" });
      getWrapperVm(contextTextarea).$emit("update:modelValue", "Geography trivia");
      await nextTick();

      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;
      const content = state.content as { statement: Record<string, unknown>; answer: Record<string, unknown>; context: Record<string, unknown> };

      expect(content.context[DEFAULT_MOCKED_LOCALE]).toBe("Geography trivia");
    });

    it("should update the difficulty in the form state when the difficulty selector emits.", async() => {
      const difficultySelector = wrapper.findComponent<typeof QuestionDifficultySelector>("[data-testid='question-difficulty-selector']");
      getWrapperVm(difficultySelector).$emit("update:modelValue", "medium");
      await nextTick();

      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;

      expect(state.cognitiveDifficulty).toBe("medium");
    });

    it("should update the category in the form state when the category selector emits.", async() => {
      const categorySelector = wrapper.findComponent<typeof QuestionCategorySelector>({ name: "QuestionCategorySelector" });
      getWrapperVm(categorySelector).$emit("update:modelValue", "trivia");
      await nextTick();

      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;

      expect(state.category).toBe("trivia");
    });

    it("should update the themes in the form state when the theme selector emits.", async() => {
      const themeSelector = wrapper.findComponent<typeof QuestionThemeSelector>("[data-testid='question-theme-selector']");
      const themes = [{ themeId: "theme-1", isPrimary: true, isHint: false }];
      getWrapperVm(themeSelector).$emit("update:modelValue", themes);
      await nextTick();

      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;

      expect(state.themes).toStrictEqual(themes);
    });

    it("should update the source urls in the form state when the source urls input tags value changes.", async() => {
      const sourceUrlsField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-source-urls-field']");
      const sourceUrlsInputTags = sourceUrlsField.findComponent<typeof UInputTags>({ name: "UInputTags" });
      getWrapperVm(sourceUrlsInputTags).$emit("update:modelValue", ["https://example.com"]);
      await nextTick();

      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;

      expect(state.sourceUrls).toStrictEqual(["https://example.com"]);
    });
  });

  describe("Exposed canSubmit", () => {
    it("should expose canSubmit as false when no required fields are filled.", () => {
      expect(getWrapperVm<QuestionFormVm>(wrapper).canSubmit).toBeFalsy();
    });

    it("should expose canSubmit as false when only statement is filled.", async() => {
      const statementField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-statement-field']");
      const statementInput = statementField.findComponent<typeof UInput>({ name: "UInput" });
      getWrapperVm(statementInput).$emit("update:modelValue", "Test");
      await nextTick();

      expect(getWrapperVm<QuestionFormVm>(wrapper).canSubmit).toBeFalsy();
    });

    it("should expose canSubmit as true when all required fields are filled.", async() => {
      const statementField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-statement-field']");
      const statementInput = statementField.findComponent<typeof UInput>({ name: "UInput" });
      getWrapperVm(statementInput).$emit("update:modelValue", "What is the capital?");

      const answerField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-answer-field']");
      const answerInput = answerField.findComponent<typeof UInput>({ name: "UInput" });
      getWrapperVm(answerInput).$emit("update:modelValue", "Paris");

      const difficultySelector = wrapper.findComponent<typeof QuestionDifficultySelector>("[data-testid='question-difficulty-selector']");
      getWrapperVm(difficultySelector).$emit("update:modelValue", "easy");

      const categorySelector = wrapper.findComponent<typeof QuestionCategorySelector>({ name: "QuestionCategorySelector" });
      getWrapperVm(categorySelector).$emit("update:modelValue", "trivia");

      const themeSelector = wrapper.findComponent<typeof QuestionThemeSelector>("[data-testid='question-theme-selector']");
      getWrapperVm(themeSelector).$emit("update:modelValue", [{ themeId: "theme-1", isPrimary: true, isHint: false }]);

      const sourceUrlsField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-source-urls-field']");
      const sourceUrlsInputTags = sourceUrlsField.findComponent<typeof UInputTags>({ name: "UInputTags" });
      getWrapperVm(sourceUrlsInputTags).$emit("update:modelValue", ["https://example.com"]);
      await nextTick();

      expect(getWrapperVm<QuestionFormVm>(wrapper).canSubmit).toBeTruthy();
    });
  });

  describe("Exposed triggerFormSubmit", () => {
    it("should not emit submitCreation when form is not submitted.", () => {
      expect(wrapper.emitted("submitCreation")).toBeUndefined();
    });

    it("should not submit when triggerFormSubmit is called and form ref is null.", async() => {
      const vm = getWrapperVm<QuestionFormVm>(wrapper);
      vm.$.refs.form = null;
      await vm.triggerFormSubmit();

      expect(wrapper.emitted("submitCreation")).toBeUndefined();
    });
  });

  describe("Available Themes", () => {
    it("should pass available themes to the theme selector component when mounted.", () => {
      const themeSelector = wrapper.findComponent<typeof QuestionThemeSelector>("[data-testid='question-theme-selector']");

      expect(themeSelector.props("availableThemes")).toStrictEqual(fakeThemes);
    });
  });
});