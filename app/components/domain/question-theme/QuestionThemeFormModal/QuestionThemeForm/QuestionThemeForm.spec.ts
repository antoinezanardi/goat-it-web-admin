import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import { DEFAULT_MOCKED_LOCALE } from "~~/tests/unit/utils/mocks/composables/nuxt/useI18n/useI18n.mock.constants";
import { createFakeQuestionThemeCreationDto } from "~~/tests/unit/utils/faketories/question-themes/dto/question-theme.dto.faketory";
import { getWrapperWm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { ComponentVm } from "~~/tests/unit/utils/types/vtu.types";

import type { UForm, UFormField } from "#components";
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

  describe("Exposed isFormValid", () => {
    it("should expose isFormValid as false initially when mounted.", () => {
      expect(getWrapperWm<QuestionThemeFormVm>(wrapper).isFormValid).toBeFalsy();
    });
  });

  describe("Form submission", () => {
    it("should emit submitCreation with the form data when the form is submitted with valid data.", async() => {
      const fakeCreationDto = createFakeQuestionThemeCreationDto();
      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;
      state.slug = fakeCreationDto.slug;
      state.label = fakeCreationDto.label;

      await getWrapperWm<QuestionThemeFormVm>(wrapper).triggerFormSubmit();

      expect(wrapper.emitted("submitCreation")).toBeDefined();
    });
  });

  describe("Form validation", () => {
    it("should set isFormValid to false when form has invalid data and blur is triggered.", async() => {
      const form = wrapper.find<HTMLFormElement>("form");
      await form.trigger("blur");

      expect(getWrapperWm<QuestionThemeFormVm>(wrapper).isFormValid).toBeFalsy();
    });

    it("should set isFormValid to true when form has valid data and blur is triggered.", async() => {
      const fakeCreationDto = createFakeQuestionThemeCreationDto();
      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;
      state.slug = fakeCreationDto.slug;
      state.label = fakeCreationDto.label;

      const form = wrapper.find<HTMLFormElement>("form");
      await form.trigger("blur");
      await nextTick();

      expect(getWrapperWm<QuestionThemeFormVm>(wrapper).isFormValid).toBeTruthy();
    });

    it("should also validate when the form triggers change event.", async() => {
      const form = wrapper.find("form");
      await form.trigger("change");

      expect(getWrapperWm<QuestionThemeFormVm>(wrapper).isFormValid).toBeFalsy();
    });
  });
});