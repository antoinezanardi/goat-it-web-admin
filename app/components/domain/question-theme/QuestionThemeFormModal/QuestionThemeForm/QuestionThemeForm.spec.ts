import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import { DEFAULT_MOCKED_LOCALE } from "~~/tests/unit/utils/mocks/composables/nuxt/useI18n/useI18n.mock.constants";
import { createFakeQuestionThemeCreationDto } from "~~/tests/unit/utils/faketories/question-themes/dto/question-theme.dto.faketory";
import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { ComponentVm } from "~~/tests/unit/utils/types/vtu.types";

import type { UForm, UFormField, UInput, UTextarea, UInputTags, InputColorPicker } from "#components";
import { QuestionThemeForm } from "#components";

type QuestionThemeFormVm = ComponentVm & {
  isFormValid: boolean;
  triggerFormSubmit: () => Promise<void>;
};

describe("QuestionThemeForm Component", () => {
  let wrapper: VueWrapper;

  async function mountQuestionThemeFormComponent(options: MountSuspendedOptions<typeof QuestionThemeForm> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemeForm, {
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionThemeFormComponent();
  });

  it("should render the question theme form component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Form fields", () => {
    it("should render the label form field with the correct i18n key when mounted.", () => {
      const labelFormField = wrapper.findComponent<typeof UFormField>("[data-testid='question-theme-form-label-field']");

      expect(labelFormField.props("label")).toBe("questionThemes.fields.label");
    });

    it("should render the label form field with the current locale in the name when mounted.", () => {
      const labelFormField = wrapper.findComponent<typeof UFormField>("[data-testid='question-theme-form-label-field']");

      expect(labelFormField.props("name")).toBe(`label.${DEFAULT_MOCKED_LOCALE}`);
    });

    it("should render the slug form field with the correct i18n key when mounted.", () => {
      const slugFormField = wrapper.findComponent<typeof UFormField>("[data-testid='question-theme-form-slug-field']");

      expect(slugFormField.props("label")).toBe("questionThemes.fields.slug");
    });

    it("should render the color form field with the correct i18n key when mounted.", () => {
      const colorFormField = wrapper.findComponent<typeof UFormField>("[data-testid='question-theme-form-color-field']");

      expect(colorFormField.props("label")).toBe("questionThemes.fields.color");
    });

    it("should render the description form field with the correct i18n key when mounted.", () => {
      const descriptionFormField = wrapper.findComponent<typeof UFormField>("[data-testid='question-theme-form-description-field']");

      expect(descriptionFormField.props("label")).toBe("questionThemes.fields.description");
    });

    it("should render the description form field with the current locale in the name when mounted.", () => {
      const descriptionFormField = wrapper.findComponent<typeof UFormField>("[data-testid='question-theme-form-description-field']");

      expect(descriptionFormField.props("name")).toBe(`description.${DEFAULT_MOCKED_LOCALE}`);
    });

    it("should render the aliases form field with the correct i18n key when mounted.", () => {
      const aliasesFormField = wrapper.findComponent<typeof UFormField>("[data-testid='question-theme-form-aliases-field']");

      expect(aliasesFormField.props("label")).toBe("questionThemes.fields.aliases");
    });

    it("should render the aliases form field with the current locale in the name when mounted.", () => {
      const aliasesFormField = wrapper.findComponent<typeof UFormField>("[data-testid='question-theme-form-aliases-field']");

      expect(aliasesFormField.props("name")).toBe(`aliases.${DEFAULT_MOCKED_LOCALE}`);
    });
  });

  describe("Form v-model bindings", () => {
    it("should update the label in the form state when the label input value changes.", async() => {
      const labelFormField = wrapper.findComponent<typeof UFormField>("[data-testid='question-theme-form-label-field']");
      const labelInput = labelFormField.findComponent<typeof UInput>({ name: "UInput" });
      getWrapperVm(labelInput).$emit("update:modelValue", "new-label");
      await nextTick();

      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;
      const label = state.label as Record<string, unknown>;

      expect(label[DEFAULT_MOCKED_LOCALE]).toBe("new-label");
    });

    it("should update the slug in the form state when the slug input value changes.", async() => {
      const slugFormField = wrapper.findComponent<typeof UFormField>("[data-testid='question-theme-form-slug-field']");
      const slugInput = slugFormField.findComponent<typeof UInput>({ name: "UInput" });
      getWrapperVm(slugInput).$emit("update:modelValue", "new-slug");
      await nextTick();

      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;

      expect(state.slug).toBe("new-slug");
    });

    it("should update the color in the form state when the color picker value changes.", async() => {
      const colorFormField = wrapper.findComponent<typeof UFormField>("[data-testid='question-theme-form-color-field']");
      const colorPicker = colorFormField.findComponent<typeof InputColorPicker>({ name: "InputColorPicker" });
      getWrapperVm(colorPicker).$emit("update:color", "#FF0000");
      await nextTick();

      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;

      expect(state.color).toBe("#FF0000");
    });

    it("should update the description in the form state when the description textarea value changes.", async() => {
      const descriptionFormField = wrapper.findComponent<typeof UFormField>("[data-testid='question-theme-form-description-field']");
      const descriptionTextarea = descriptionFormField.findComponent<typeof UTextarea>({ name: "UTextarea" });
      getWrapperVm(descriptionTextarea).$emit("update:modelValue", "new description");
      await nextTick();

      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;
      const description = state.description as Record<string, unknown>;

      expect(description[DEFAULT_MOCKED_LOCALE]).toBe("new description");
    });

    it("should update the aliases in the form state when the aliases input tags value changes.", async() => {
      const aliasesFormField = wrapper.findComponent<typeof UFormField>("[data-testid='question-theme-form-aliases-field']");
      const aliasesInputTags = aliasesFormField.findComponent<typeof UInputTags>({ name: "UInputTags" });
      getWrapperVm(aliasesInputTags).$emit("update:modelValue", ["alias1", "alias2"]);
      await nextTick();

      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;
      const aliases = state.aliases as Record<string, unknown>;

      expect(aliases[DEFAULT_MOCKED_LOCALE]).toStrictEqual(["alias1", "alias2"]);
    });
  });

  describe("Exposed isFormValid", () => {
    it("should expose isFormValid as false initially when mounted.", () => {
      expect(getWrapperVm<QuestionThemeFormVm>(wrapper).isFormValid).toBeFalsy();
    });
  });

  describe("Form submission", () => {
    it("should emit submitCreation with the form data when the form is submitted with valid data.", async() => {
      const fakeCreationDto = createFakeQuestionThemeCreationDto();
      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;
      state.slug = fakeCreationDto.slug;
      state.label = fakeCreationDto.label;
      state.description = fakeCreationDto.description;
      state.aliases = fakeCreationDto.aliases;

      await getWrapperVm<QuestionThemeFormVm>(wrapper).triggerFormSubmit();

      expect(wrapper.emitted("submitCreation")).toStrictEqual([[state]]);
    });

    it("should not submit when the form reference is null.", async() => {
      const vm = getWrapperVm<QuestionThemeFormVm>(wrapper);
      vm.$.refs.form = null;

      await vm.triggerFormSubmit();

      expect(wrapper.emitted("submitCreation")).toBeUndefined();
    });
  });

  describe("Form validation", () => {
    it("should not validate when the form reference is null.", async() => {
      const vm = getWrapperVm<QuestionThemeFormVm>(wrapper);
      vm.$.refs.form = null;

      const form = wrapper.find<HTMLFormElement>("form");
      await form.trigger("blur");

      expect(vm.isFormValid).toBeFalsy();
    });

    it("should set isFormValid to false when form has invalid data and blur is triggered.", async() => {
      const form = wrapper.find<HTMLFormElement>("form");
      await form.trigger("blur");

      expect(getWrapperVm<QuestionThemeFormVm>(wrapper).isFormValid).toBeFalsy();
    });

    it("should set isFormValid to true when form has valid data and blur is triggered.", async() => {
      const fakeCreationDto = createFakeQuestionThemeCreationDto();
      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;
      state.slug = fakeCreationDto.slug;
      state.label = fakeCreationDto.label;
      state.description = fakeCreationDto.description;
      state.aliases = fakeCreationDto.aliases;

      const form = wrapper.find<HTMLFormElement>("form");
      await form.trigger("blur");
      await nextTick();

      expect(getWrapperVm<QuestionThemeFormVm>(wrapper).isFormValid).toBeTruthy();
    });

    it("should also validate when the form triggers change event.", async() => {
      const form = wrapper.find("form");
      await form.trigger("change");

      expect(getWrapperVm<QuestionThemeFormVm>(wrapper).isFormValid).toBeFalsy();
    });
  });
});