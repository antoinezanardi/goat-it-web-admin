import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import { DEFAULT_MOCKED_LOCALE } from "~~/tests/unit/utils/mocks/composables/nuxt/useI18n/useI18n.mock.constants";
import { createFakeQuestionThemeCreationDto } from "~~/tests/unit/utils/faketories/question-themes/dto/question-theme.dto.faketory";

import type { UForm } from "#components";
import { QuestionThemeForm } from "#components";

type QuestionThemeFormVm = {
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
      const formFields = wrapper.findAllComponents({ name: "UFormField" });
      const labelField = formFields[0];

      expect(labelField?.props("label")).toBe("questionThemes.fields.label");
    });

    it("should render the label form field with the current locale in the name when mounted.", () => {
      const formFields = wrapper.findAllComponents({ name: "UFormField" });
      const labelField = formFields[0];

      expect(labelField?.props("name")).toBe(`label.${DEFAULT_MOCKED_LOCALE}`);
    });

    it("should render the slug form field with the correct i18n key when mounted.", () => {
      const formFields = wrapper.findAllComponents({ name: "UFormField" });
      const slugField = formFields[1];

      expect(slugField?.props("label")).toBe("questionThemes.fields.slug");
    });

    it("should render the color form field with the correct i18n key when mounted.", () => {
      const formFields = wrapper.findAllComponents({ name: "UFormField" });
      const colorField = formFields[2];

      expect(colorField?.props("label")).toBe("questionThemes.fields.color");
    });

    it("should render the description form field with the correct i18n key when mounted.", () => {
      const formFields = wrapper.findAllComponents({ name: "UFormField" });
      const descriptionField = formFields[3];

      expect(descriptionField?.props("label")).toBe("questionThemes.fields.description");
    });

    it("should render the description form field with the current locale in the name when mounted.", () => {
      const formFields = wrapper.findAllComponents({ name: "UFormField" });
      const descriptionField = formFields[3];

      expect(descriptionField?.props("name")).toBe(`description.${DEFAULT_MOCKED_LOCALE}`);
    });

    it("should render the aliases form field with the correct i18n key when mounted.", () => {
      const formFields = wrapper.findAllComponents({ name: "UFormField" });
      const aliasesField = formFields[4];

      expect(aliasesField?.props("label")).toBe("questionThemes.fields.aliases");
    });

    it("should render the aliases form field with the current locale in the name when mounted.", () => {
      const formFields = wrapper.findAllComponents({ name: "UFormField" });
      const aliasesField = formFields[4];

      expect(aliasesField?.props("name")).toBe(`aliases.${DEFAULT_MOCKED_LOCALE}`);
    });
  });

  describe("Exposed isFormValid", () => {
    it("should expose isFormValid as false initially when mounted.", () => {
      expect((wrapper.vm as unknown as QuestionThemeFormVm).isFormValid).toBeFalsy();
    });
  });

  describe("Exposed triggerFormSubmit", () => {
    it("should trigger UForm submission when triggerFormSubmit is called.", async() => {
      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });

      await (wrapper.vm as unknown as QuestionThemeFormVm).triggerFormSubmit();

      expect(uForm.emitted("error")).toBeDefined();
    });
  });

  describe("Form submission", () => {
    it("should emit submitCreation with the form data when the form is submitted with valid data.", async() => {
      const fakeCreationDto = createFakeQuestionThemeCreationDto();
      const uForm = wrapper.findComponent({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;
      state.slug = fakeCreationDto.slug;
      state.label = fakeCreationDto.label;
      state.description = fakeCreationDto.description;
      state.aliases = fakeCreationDto.aliases;

      await (wrapper.vm as unknown as QuestionThemeFormVm).triggerFormSubmit();
      await nextTick();

      expect(wrapper.emitted("submitCreation")).toBeDefined();
    });
  });

  describe("Form validation", () => {
    it("should set isFormValid to false when form has invalid data and blur is triggered.", async() => {
      const form = wrapper.find("form");
      await form.trigger("blur");
      await nextTick();

      expect((wrapper.vm as unknown as QuestionThemeFormVm).isFormValid).toBeFalsy();
    });

    it("should set isFormValid to true when form has valid data and blur is triggered.", async() => {
      const fakeCreationDto = createFakeQuestionThemeCreationDto();
      const uForm = wrapper.findComponent({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;
      state.slug = fakeCreationDto.slug;
      state.label = fakeCreationDto.label;
      state.description = fakeCreationDto.description;
      state.aliases = fakeCreationDto.aliases;

      const form = wrapper.find("form");
      await form.trigger("blur");
      await nextTick();

      expect((wrapper.vm as unknown as QuestionThemeFormVm).isFormValid).toBeTruthy();
    });

    it("should also validate when the form triggers change event.", async() => {
      const form = wrapper.find("form");
      await form.trigger("change");
      await nextTick();

      expect((wrapper.vm as unknown as QuestionThemeFormVm).isFormValid).toBeFalsy();
    });
  });
});