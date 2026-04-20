import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import { DEFAULT_MOCKED_LOCALE } from "~~/tests/unit/utils/mocks/composables/nuxt/useI18n/useI18n.mock.constants";
import { createFakeQuestionThemeCreationDto, createFakeQuestionThemeModificationDto } from "~~/tests/unit/utils/faketories/question-themes/dto/question-theme.dto.faketory";
import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";
import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { ComponentVm } from "~~/tests/unit/utils/types/vtu.types";

import type { UForm, UFormField, UInput, UTextarea, UInputTags, InputColorPicker } from "#components";
import { QuestionThemeForm } from "#components";

import type { QuestionThemeFormProperties } from "~/components/domain/question-theme/QuestionThemeFormModal/QuestionThemeForm/question-theme-form.types";

type QuestionThemeFormVm = ComponentVm & {
  canSubmit: boolean;
  triggerFormSubmit: () => Promise<void>;
};

describe("QuestionThemeForm Component", () => {
  let wrapper: VueWrapper;

  const defaultQuestionThemeFormProperties: QuestionThemeFormProperties = {
    existingSlugs: [],
  } as const;

  async function mountQuestionThemeFormComponent(options: MountSuspendedOptions<typeof QuestionThemeForm> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemeForm, {
      props: defaultQuestionThemeFormProperties,
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

    it("should render the aliases form field as required when mounted.", () => {
      const aliasesFormField = wrapper.findComponent<typeof UFormField>("[data-testid='question-theme-form-aliases-field']");

      expect(aliasesFormField.props("required")).toBeTruthy();
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

  describe("Exposed canSubmit", () => {
    it("should expose canSubmit as false when no required fields are filled.", () => {
      expect(getWrapperVm<QuestionThemeFormVm>(wrapper).canSubmit).toBeFalsy();
    });

    it("should expose canSubmit as false when only slug is filled.", async() => {
      const slugFormField = wrapper.findComponent<typeof UFormField>("[data-testid='question-theme-form-slug-field']");
      const slugInput = slugFormField.findComponent<typeof UInput>({ name: "UInput" });
      getWrapperVm(slugInput).$emit("update:modelValue", "test-slug");
      await nextTick();

      expect(getWrapperVm<QuestionThemeFormVm>(wrapper).canSubmit).toBeFalsy();
    });

    it("should expose canSubmit as false when aliases are missing.", async() => {
      const slugFormField = wrapper.findComponent<typeof UFormField>("[data-testid='question-theme-form-slug-field']");
      const slugInput = slugFormField.findComponent<typeof UInput>({ name: "UInput" });
      getWrapperVm(slugInput).$emit("update:modelValue", "test-slug");

      const labelFormField = wrapper.findComponent<typeof UFormField>("[data-testid='question-theme-form-label-field']");
      const labelInput = labelFormField.findComponent<typeof UInput>({ name: "UInput" });
      getWrapperVm(labelInput).$emit("update:modelValue", "Test Label");

      const descriptionFormField = wrapper.findComponent<typeof UFormField>("[data-testid='question-theme-form-description-field']");
      const descriptionTextarea = descriptionFormField.findComponent<typeof UTextarea>({ name: "UTextarea" });
      getWrapperVm(descriptionTextarea).$emit("update:modelValue", "Test Description");
      await nextTick();

      expect(getWrapperVm<QuestionThemeFormVm>(wrapper).canSubmit).toBeFalsy();
    });

    it("should expose canSubmit as true when all required fields are filled.", async() => {
      const slugFormField = wrapper.findComponent<typeof UFormField>("[data-testid='question-theme-form-slug-field']");
      const slugInput = slugFormField.findComponent<typeof UInput>({ name: "UInput" });
      getWrapperVm(slugInput).$emit("update:modelValue", "test-slug");

      const labelFormField = wrapper.findComponent<typeof UFormField>("[data-testid='question-theme-form-label-field']");
      const labelInput = labelFormField.findComponent<typeof UInput>({ name: "UInput" });
      getWrapperVm(labelInput).$emit("update:modelValue", "Test Label");

      const descriptionFormField = wrapper.findComponent<typeof UFormField>("[data-testid='question-theme-form-description-field']");
      const descriptionTextarea = descriptionFormField.findComponent<typeof UTextarea>({ name: "UTextarea" });
      getWrapperVm(descriptionTextarea).$emit("update:modelValue", "Test Description");

      const aliasesFormField = wrapper.findComponent<typeof UFormField>("[data-testid='question-theme-form-aliases-field']");
      const aliasesInputTags = aliasesFormField.findComponent<typeof UInputTags>({ name: "UInputTags" });
      getWrapperVm(aliasesInputTags).$emit("update:modelValue", ["alias1"]);
      await nextTick();

      expect(getWrapperVm<QuestionThemeFormVm>(wrapper).canSubmit).toBeTruthy();
    });
  });

  describe("Slug uniqueness validation", () => {
    it("should pass the validate function to the UForm when mounted.", () => {
      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });

      expect(uForm.props("validate")).toBeDefined();
    });

    it("should return a slug error when the slug matches an existing slug.", async() => {
      wrapper = await mountQuestionThemeFormComponent({
        props: {
          existingSlugs: ["existing-slug"],
        },
      });
      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const validateFunction = uForm.props("validate") as (state: Record<string, unknown>) => { name: string; message: string }[];
      const errors = validateFunction({ slug: "existing-slug" });

      expect(errors).toStrictEqual([{ name: "slug", message: "validation.slugAlreadyTaken" }]);
    });

    it("should return no errors when the slug does not match any existing slug.", async() => {
      wrapper = await mountQuestionThemeFormComponent({
        props: {
          existingSlugs: ["existing-slug"],
        },
      });
      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const validateFunction = uForm.props("validate") as (state: Record<string, unknown>) => { name: string; message: string }[];
      const errors = validateFunction({ slug: "new-slug" });

      expect(errors).toStrictEqual([]);
    });

    it("should return no errors when the slug is undefined.", () => {
      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const validateFunction = uForm.props("validate") as (state: Record<string, unknown>) => { name: string; message: string }[];
      const errors = validateFunction({ slug: undefined });

      expect(errors).toStrictEqual([]);
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

  describe("Edit mode", () => {
    const editThemeProperties = {
      slug: "existing-slug",
      color: "#123456",
      label: { [DEFAULT_MOCKED_LOCALE]: "Existing Label" },
      description: { [DEFAULT_MOCKED_LOCALE]: "Existing Description" },
      aliases: { [DEFAULT_MOCKED_LOCALE]: ["alias-one", "alias-two"] },
    };

    async function mountEditModeComponent(): Promise<VueWrapper> {
      const fakeTheme = createFakeQuestionTheme(editThemeProperties);

      return mountQuestionThemeFormComponent({
        props: {
          mode: "edit",
          questionTheme: fakeTheme,
          existingSlugs: ["existing-slug"],
        },
      });
    }

    it("should initialize the slug from the provided question theme when mode is edit.", async() => {
      wrapper = await mountEditModeComponent();
      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;

      expect(state.slug).toBe("existing-slug");
    });

    it("should initialize the color from the provided question theme when mode is edit.", async() => {
      wrapper = await mountEditModeComponent();
      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;

      expect(state.color).toBe("#123456");
    });

    it("should initialize the label from the provided question theme when mode is edit.", async() => {
      wrapper = await mountEditModeComponent();
      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;
      const label = state.label as Record<string, unknown>;

      expect(label[DEFAULT_MOCKED_LOCALE]).toBe("Existing Label");
    });

    it("should initialize the description from the provided question theme when mode is edit.", async() => {
      wrapper = await mountEditModeComponent();
      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;
      const description = state.description as Record<string, unknown>;

      expect(description[DEFAULT_MOCKED_LOCALE]).toBe("Existing Description");
    });

    it("should initialize the aliases from the provided question theme when mode is edit.", async() => {
      wrapper = await mountEditModeComponent();
      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;
      const aliases = state.aliases as Record<string, unknown>;

      expect(aliases[DEFAULT_MOCKED_LOCALE]).toStrictEqual(["alias-one", "alias-two"]);
    });

    it("should not return a slug error when the slug equals the edited theme's own slug.", async() => {
      const fakeTheme = createFakeQuestionTheme({ slug: "existing-slug" });
      wrapper = await mountQuestionThemeFormComponent({
        props: {
          mode: "edit",
          questionTheme: fakeTheme,
          existingSlugs: ["existing-slug", "another-slug"],
        },
      });
      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const validateFunction = uForm.props("validate") as (state: Record<string, unknown>) => { name: string; message: string }[];
      const errors = validateFunction({ slug: "existing-slug" });

      expect(errors).toStrictEqual([]);
    });

    it("should return a slug error when the slug matches another existing slug in edit mode.", async() => {
      const fakeTheme = createFakeQuestionTheme({ slug: "existing-slug" });
      wrapper = await mountQuestionThemeFormComponent({
        props: {
          mode: "edit",
          questionTheme: fakeTheme,
          existingSlugs: ["existing-slug", "another-slug"],
        },
      });
      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const validateFunction = uForm.props("validate") as (state: Record<string, unknown>) => { name: string; message: string }[];
      const errors = validateFunction({ slug: "another-slug" });

      expect(errors).toStrictEqual([{ name: "slug", message: "validation.slugAlreadyTaken" }]);
    });

    it("should emit submitModification with the form data when the form is submitted in edit mode.", async() => {
      const fakeTheme = createFakeQuestionTheme({ slug: "existing-slug" });
      const fakeModificationDto = createFakeQuestionThemeModificationDto();
      wrapper = await mountQuestionThemeFormComponent({
        props: {
          mode: "edit",
          questionTheme: fakeTheme,
          existingSlugs: [],
        },
      });
      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;
      state.slug = fakeModificationDto.slug;
      state.label = fakeModificationDto.label;
      state.description = fakeModificationDto.description;
      state.aliases = fakeModificationDto.aliases;
      state.color = fakeModificationDto.color;

      await getWrapperVm<QuestionThemeFormVm>(wrapper).triggerFormSubmit();

      expect(wrapper.emitted("submitModification")).toStrictEqual([[state]]);
    });

    it("should not emit submitCreation when the form is submitted in edit mode.", async() => {
      const fakeTheme = createFakeQuestionTheme({ slug: "existing-slug" });
      const fakeModificationDto = createFakeQuestionThemeModificationDto();
      wrapper = await mountQuestionThemeFormComponent({
        props: {
          mode: "edit",
          questionTheme: fakeTheme,
          existingSlugs: [],
        },
      });
      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;
      state.slug = fakeModificationDto.slug;
      state.label = fakeModificationDto.label;
      state.description = fakeModificationDto.description;
      state.aliases = fakeModificationDto.aliases;

      await getWrapperVm<QuestionThemeFormVm>(wrapper).triggerFormSubmit();

      expect(wrapper.emitted("submitCreation")).toBeUndefined();
    });
  });
});