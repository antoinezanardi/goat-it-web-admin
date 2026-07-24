import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createFakeQuestionThemeCreationDto, createFakeQuestionThemeModificationDto } from "@goat-it/schemas/testing/question-theme";
import { createFakeLocalizedText, createFakeLocalizedTexts } from "@goat-it/schemas/testing/shared";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import { DEFAULT_MOCKED_LOCALE } from "~~/tests/unit/utils/mocks/composables/nuxt/useI18n/useI18n.mock.constants";
import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";
import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { ComponentVm } from "~~/tests/unit/utils/types/vtu.types";

import type { UForm, UFormField, UInput, UTextarea, UInputTags, InputColorPicker, TranslationFieldContext } from "#components";
import { QuestionThemeForm } from "#components";

import type { QuestionThemeFormProps } from "~/components/domain/question-theme/QuestionThemeFormModal/QuestionThemeForm/question-theme-form.types";

type QuestionThemeFormVm = ComponentVm & {
  canSubmit: boolean;
  focusFirstField: () => Promise<void>;
  triggerFormSubmit: () => Promise<void>;
};

describe("QuestionThemeForm Component", () => {
  let wrapper: VueWrapper;

  const defaultQuestionThemeFormProps: QuestionThemeFormProps = {
    existingSlugs: [],
  } as const;

  async function mountQuestionThemeFormComponent(options: MountSuspendedOptions<typeof QuestionThemeForm> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemeForm, {
      props: defaultQuestionThemeFormProps,
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

  describe("Exposed focusFirstField", () => {
    it("should focus the label input when focusFirstField is called.", async() => {
      const vm = getWrapperVm<QuestionThemeFormVm>(wrapper);
      const focusSpy = vi.fn<() => void>();
      vm.$.refs.labelInput = { inputRef: { focus: focusSpy } } as unknown as Element;
      await vm.focusFirstField();

      expect(focusSpy).toHaveBeenCalledExactlyOnceWith();
    });

    it("should not throw when focusFirstField is called and label input ref is null.", async() => {
      const vm = getWrapperVm<QuestionThemeFormVm>(wrapper);
      vm.$.refs.labelInput = null;

      await expect(vm.focusFirstField()).resolves.toBeUndefined();
    });
  });

  describe("Edit mode", () => {
    const editThemeProperties = {
      slug: "existing-slug",
      color: "#123456",
      label: createFakeLocalizedText({ [DEFAULT_MOCKED_LOCALE]: "Existing Label" }),
      description: createFakeLocalizedText({ [DEFAULT_MOCKED_LOCALE]: "Existing Description" }),
      aliases: createFakeLocalizedTexts({ [DEFAULT_MOCKED_LOCALE]: ["alias-one", "alias-two"] }),
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

    it("should initialize aliases as empty array when the theme has no aliases for the current locale.", async() => {
      const fakeTheme = createFakeQuestionTheme({
        ...editThemeProperties,
        aliases: createFakeLocalizedTexts({ fr: ["alias-fr"], [DEFAULT_MOCKED_LOCALE]: undefined }),
      });
      wrapper = await mountQuestionThemeFormComponent({
        props: {
          mode: "edit",
          questionTheme: fakeTheme,
          existingSlugs: ["existing-slug"],
        },
      });
      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;
      const aliases = state.aliases as Record<string, unknown>;

      expect(aliases[DEFAULT_MOCKED_LOCALE]).toStrictEqual([]);
    });

    it("should not return a slug error when the slug equals the edited theme's own slug.", async() => {
      const fakeTheme = createFakeQuestionTheme(editThemeProperties);
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
      const fakeTheme = createFakeQuestionTheme(editThemeProperties);
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
      const fakeTheme = createFakeQuestionTheme(editThemeProperties);
      const fakeModificationDto = createFakeQuestionThemeModificationDto({
        slug: "modified-slug",
        label: createFakeLocalizedText({ [DEFAULT_MOCKED_LOCALE]: "Modified Label" }),
        description: createFakeLocalizedText({ [DEFAULT_MOCKED_LOCALE]: "Modified Description" }),
        aliases: createFakeLocalizedTexts({ [DEFAULT_MOCKED_LOCALE]: ["modified-alias"] }),
        color: "#FF0000",
      });
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
      const fakeTheme = createFakeQuestionTheme(editThemeProperties);
      const fakeModificationDto = createFakeQuestionThemeModificationDto({
        slug: "modified-slug",
        label: createFakeLocalizedText({ [DEFAULT_MOCKED_LOCALE]: "Modified Label" }),
        description: createFakeLocalizedText({ [DEFAULT_MOCKED_LOCALE]: "Modified Description" }),
        aliases: createFakeLocalizedTexts({ [DEFAULT_MOCKED_LOCALE]: ["modified-alias"] }),
        color: "#FF0000",
      });
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

    describe("Translation field contexts", () => {
      const fakeTheme = createFakeQuestionTheme({
        label: createFakeLocalizedText({ [DEFAULT_MOCKED_LOCALE]: "Existing Label" }),
        description: createFakeLocalizedText({ [DEFAULT_MOCKED_LOCALE]: "Existing Description" }),
        aliases: createFakeLocalizedTexts({ [DEFAULT_MOCKED_LOCALE]: ["alias-one", "alias-two"] }),
      });

      beforeEach(async() => {
        wrapper = await mountQuestionThemeFormComponent({
          props: {
            mode: "edit",
            questionTheme: fakeTheme,
            existingSlugs: [],
          },
        });
      });

      it("should render translation field context for label with localized text from question theme label when mode is edit.", () => {
        const labelContext = wrapper.findComponent<typeof TranslationFieldContext>("[data-testid='translation-field-context-label']");

        expect(labelContext.props("localizedText")).toStrictEqual(fakeTheme.label);
      });

      it("should render translation field context for description with localized text from question theme description when mode is edit.", () => {
        const descriptionContext = wrapper.findComponent<typeof TranslationFieldContext>("[data-testid='translation-field-context-description']");

        expect(descriptionContext.props("localizedText")).toStrictEqual(fakeTheme.description);
      });

      it("should render translation field context for aliases with localized texts from question theme aliases when mode is edit.", () => {
        const aliasesContext = wrapper.findComponent<typeof TranslationFieldContext>("[data-testid='translation-field-context-aliases']");

        expect(aliasesContext.props("localizedTexts")).toStrictEqual(fakeTheme.aliases);
      });

      it.each([
        { field: "label", expectedLabel: "questionThemes.fields.label" },
        { field: "description", expectedLabel: "questionThemes.fields.description" },
        { field: "aliases", expectedLabel: "questionThemes.fields.aliases" },
      ])("should pass the $field field name to translation field context for $field when mode is edit.", ({ field, expectedLabel }) => {
        const context = wrapper.findComponent<typeof TranslationFieldContext>(`[data-testid='translation-field-context-${field}']`);

        expect(context.props("label")).toBe(expectedLabel);
      });

      it("should not render any translation field context when mode is create.", async() => {
        wrapper = await mountQuestionThemeFormComponent({
          props: {
            mode: "create",
            questionTheme: fakeTheme,
            existingSlugs: [],
          },
        });
        const translationFieldContexts = wrapper.findAll("[data-testid^='translation-field-context-']");

        expect(translationFieldContexts).toHaveLength(0);
      });
    });
  });
});