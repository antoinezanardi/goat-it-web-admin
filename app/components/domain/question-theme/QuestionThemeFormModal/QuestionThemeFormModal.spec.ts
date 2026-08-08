import { mountSuspended } from "@nuxt/test-utils/runtime";
import { flushPromises } from "@vue/test-utils";
import type { VueWrapper } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createFakeQuestionThemeCreationDto, createFakeQuestionThemeModificationDto } from "@goat-it/schemas/testing/question-theme";
import { createFakeLocalizedText, createFakeLocalizedTexts } from "@goat-it/schemas/testing/shared";

import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import type { ComponentVm } from "~~/tests/unit/utils/types/vtu.types";
import { DEFAULT_MOCKED_LOCALE } from "~~/tests/unit/utils/mocks/composables/nuxt/useI18n/useI18n.mock.constants";
import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";

import { QuestionThemeFormModal } from "#components";
import type { QuestionThemeForm, DefaultModalFooter, DefaultModalTitle, QuestionThemeTranslationCompletenessIndicator, UFormField, UInput } from "#components";

import { QUESTION_THEME_ICON } from "~/composables/domain/question-theme/constants/question-theme.constants";
import type { QuestionThemeFormModalProps } from "~/components/domain/question-theme/QuestionThemeFormModal/question-theme-form-modal.types";

type QuestionThemeFormModalVm = ComponentVm & {
  isDirty: boolean;
  forceClose: () => void;
};

describe("QuestionThemeFormModal Component", () => {
  let wrapper: VueWrapper;

  const defaultQuestionThemeFormModalProps: QuestionThemeFormModalProps & { open: boolean } = {
    isSubmitting: false,
    existingSlugs: [],
    open: true,
  } as const;

  async function mountQuestionThemeFormModalComponent(options: MountSuspendedOptions<typeof QuestionThemeFormModal> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemeFormModal, {
      props: defaultQuestionThemeFormModalProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionThemeFormModalComponent();
  });

  it("should render the question theme form modal component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Modal title", () => {
    it("should pass the question theme icon to the default modal title when mounted.", () => {
      const modalTitle = wrapper.findComponent<typeof DefaultModalTitle>("[data-testid='question-theme-form-modal-title']");

      expect(modalTitle.props("icon")).toBe(QUESTION_THEME_ICON);
    });

    it("should pass the createNew i18n key as title to the default modal title when mounted.", () => {
      const modalTitle = wrapper.findComponent<typeof DefaultModalTitle>("[data-testid='question-theme-form-modal-title']");

      expect(modalTitle.props("title")).toBe("questionThemes.createNew");
    });
  });

  describe("Modal footer", () => {
    it("should pass isSubmitting as isCloseButtonDisabled to the footer when isSubmitting is false.", () => {
      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-theme-form-modal-footer']");

      expect(footer.props("isCloseButtonDisabled")).toBeFalsy();
    });

    it("should pass isSubmitting as isCloseButtonDisabled to the footer when isSubmitting is true.", async() => {
      await wrapper.setProps({ isSubmitting: true });

      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-theme-form-modal-footer']");

      expect(footer.props("isCloseButtonDisabled")).toBeTruthy();
    });

    it("should pass isSubmitting as isPrimaryButtonLoading to the footer when isSubmitting is false.", () => {
      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-theme-form-modal-footer']");

      expect(footer.props("isPrimaryButtonLoading")).toBeFalsy();
    });

    it("should pass isSubmitting as isPrimaryButtonLoading to the footer when isSubmitting is true.", async() => {
      await wrapper.setProps({ isSubmitting: true });

      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-theme-form-modal-footer']");

      expect(footer.props("isPrimaryButtonLoading")).toBeTruthy();
    });

    it("should pass the common.create i18n key as primaryButtonLabel to the footer when mode is create.", () => {
      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-theme-form-modal-footer']");

      expect(footer.props("primaryButtonLabel")).toBe("common.create");
    });

    it("should pass the primary button create icon to the footer when mode is create.", () => {
      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-theme-form-modal-footer']");

      expect(footer.props("primaryButtonIcon")).toBe("i-lucide-circle-plus");
    });

    it("should pass true as isPrimaryButtonDisabled to the footer when canSubmit is false on the form.", () => {
      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-theme-form-modal-footer']");

      expect(footer.props("isPrimaryButtonDisabled")).toBeTruthy();
    });
  });

  describe("Existing slugs", () => {
    it("should pass an empty existingSlugs array to the QuestionThemeForm component when no existing slugs are provided.", () => {
      const form = wrapper.findComponent<typeof QuestionThemeForm>("[data-testid='question-theme-form-modal-form']");

      expect(form.props("existingSlugs")).toStrictEqual([]);
    });

    it("should pass the provided existingSlugs to the QuestionThemeForm component when existingSlugs are provided.", async() => {
      wrapper = await mountQuestionThemeFormModalComponent({
        props: {
          ...defaultQuestionThemeFormModalProps,
          existingSlugs: ["slug-one", "slug-two"],
        },
      });
      const form = wrapper.findComponent<typeof QuestionThemeForm>("[data-testid='question-theme-form-modal-form']");

      expect(form.props("existingSlugs")).toStrictEqual(["slug-one", "slug-two"]);
    });
  });

  describe("Close modal", () => {
    it("should emit update:open when the modal itself emits update:open.", async() => {
      const modal = wrapper.findComponent({ name: "UModal" });
      getWrapperVm(modal).$emit("update:open", false);
      await nextTick();

      expect(wrapper.emitted("update:open")).toStrictEqual([[false]]);
    });
  });

  describe("Primary button click", () => {
    it("should trigger form submission when primaryButtonClick is emitted from the footer.", async() => {
      const fakeData = createFakeQuestionThemeCreationDto();
      const form = wrapper.findComponent<typeof QuestionThemeForm>("[data-testid='question-theme-form-modal-form']") as VueWrapper;
      const uForm = form.findComponent({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;
      state.slug = fakeData.slug;
      state.label = fakeData.label;
      state.description = fakeData.description;
      state.aliases = fakeData.aliases;

      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-theme-form-modal-footer']") as VueWrapper;
      getWrapperVm(footer).$emit("primaryButtonClick");
      await flushPromises();

      expect(wrapper.emitted("submitCreation")).toBeDefined();
    });

    it("should not trigger form submission when primaryButtonClick is emitted and form reference is null.", async() => {
      getWrapperVm(wrapper).$.refs.formReference = null;

      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-theme-form-modal-footer']") as VueWrapper;
      getWrapperVm(footer).$emit("primaryButtonClick");
      await flushPromises();

      expect(wrapper.emitted("submitCreation")).toBeUndefined();
    });
  });

  describe("Submit creation", () => {
    it("should emit submitCreation when the form emits submitCreation.", () => {
      const fakeData = createFakeQuestionThemeCreationDto();
      const form = wrapper.findComponent<typeof QuestionThemeForm>("[data-testid='question-theme-form-modal-form']") as VueWrapper;

      getWrapperVm(form).$emit("submitCreation", fakeData);

      expect(wrapper.emitted("submitCreation")).toStrictEqual([[fakeData]]);
    });
  });

  describe("Edit mode", () => {
    const defaultThemeLocaleOverrides = {
      label: createFakeLocalizedText({ [DEFAULT_MOCKED_LOCALE]: "Existing Label" }),
      description: createFakeLocalizedText({ [DEFAULT_MOCKED_LOCALE]: "Existing Description" }),
      aliases: createFakeLocalizedTexts({ [DEFAULT_MOCKED_LOCALE]: ["alias-one", "alias-two"] }),
    };

    it("should pass the editTheme i18n key as title to the default modal title when mode is edit.", async() => {
      wrapper = await mountQuestionThemeFormModalComponent({
        props: {
          ...defaultQuestionThemeFormModalProps,
          mode: "edit",
          questionTheme: createFakeQuestionTheme(defaultThemeLocaleOverrides),
        },
      });
      const modalTitle = wrapper.findComponent<typeof DefaultModalTitle>("[data-testid='question-theme-form-modal-title']");

      expect(modalTitle.props("title")).toBe("questionThemes.editTheme");
    });

    it("should pass the common.edit i18n key as primaryButtonLabel to the footer when mode is edit.", async() => {
      wrapper = await mountQuestionThemeFormModalComponent({
        props: {
          ...defaultQuestionThemeFormModalProps,
          mode: "edit",
          questionTheme: createFakeQuestionTheme(defaultThemeLocaleOverrides),
        },
      });
      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-theme-form-modal-footer']");

      expect(footer.props("primaryButtonLabel")).toBe("common.edit");
    });

    it("should pass the pencil icon as primaryButtonIcon to the footer when mode is edit.", async() => {
      wrapper = await mountQuestionThemeFormModalComponent({
        props: {
          ...defaultQuestionThemeFormModalProps,
          mode: "edit",
          questionTheme: createFakeQuestionTheme(defaultThemeLocaleOverrides),
        },
      });
      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-theme-form-modal-footer']");

      expect(footer.props("primaryButtonIcon")).toBe("i-lucide-pencil");
    });

    it("should pass the question theme to the form when mode is edit.", async() => {
      const fakeTheme = createFakeQuestionTheme(defaultThemeLocaleOverrides);
      wrapper = await mountQuestionThemeFormModalComponent({
        props: {
          ...defaultQuestionThemeFormModalProps,
          mode: "edit",
          questionTheme: fakeTheme,
        },
      });
      const form = wrapper.findComponent<typeof QuestionThemeForm>("[data-testid='question-theme-form-modal-form']");

      expect(form.props("questionTheme")).toStrictEqual(fakeTheme);
    });

    it("should pass the mode to the form when mode is edit.", async() => {
      wrapper = await mountQuestionThemeFormModalComponent({
        props: {
          ...defaultQuestionThemeFormModalProps,
          mode: "edit",
          questionTheme: createFakeQuestionTheme(defaultThemeLocaleOverrides),
        },
      });
      const form = wrapper.findComponent<typeof QuestionThemeForm>("[data-testid='question-theme-form-modal-form']");

      expect(form.props("mode")).toBe("edit");
    });

    it("should emit submitModification when the form emits submitModification.", async() => {
      const fakeData = createFakeQuestionThemeModificationDto();
      wrapper = await mountQuestionThemeFormModalComponent({
        props: {
          ...defaultQuestionThemeFormModalProps,
          mode: "edit",
          questionTheme: createFakeQuestionTheme(defaultThemeLocaleOverrides),
        },
      });
      const form = wrapper.findComponent<typeof QuestionThemeForm>("[data-testid='question-theme-form-modal-form']") as VueWrapper;

      getWrapperVm(form).$emit("submitModification", fakeData);

      expect(wrapper.emitted("submitModification")).toStrictEqual([[fakeData]]);
    });

    it("should render the question theme translation completeness indicator when mode is edit and questionTheme is provided.", async() => {
      const fakeTheme = createFakeQuestionTheme(defaultThemeLocaleOverrides);
      wrapper = await mountQuestionThemeFormModalComponent({
        props: {
          ...defaultQuestionThemeFormModalProps,
          mode: "edit",
          questionTheme: fakeTheme,
        },
      });
      const indicator = wrapper.findComponent<typeof QuestionThemeTranslationCompletenessIndicator>({ name: "QuestionThemeTranslationCompletenessIndicator" });

      expect(indicator.exists()).toBeTruthy();
    });

    it("should pass the question theme to the translation completeness indicator when mode is edit.", async() => {
      const fakeTheme = createFakeQuestionTheme(defaultThemeLocaleOverrides);
      wrapper = await mountQuestionThemeFormModalComponent({
        props: {
          ...defaultQuestionThemeFormModalProps,
          mode: "edit",
          questionTheme: fakeTheme,
        },
      });
      const indicator = wrapper.findComponent<typeof QuestionThemeTranslationCompletenessIndicator>({ name: "QuestionThemeTranslationCompletenessIndicator" });

      expect(indicator.props("questionTheme")).toStrictEqual(fakeTheme);
    });

    it("should not render the question theme translation completeness indicator when mode is create.", () => {
      const indicator = wrapper.findComponent({ name: "QuestionThemeTranslationCompletenessIndicator" });

      expect(indicator.exists()).toBeFalsy();
    });

    it("should not render the question theme translation completeness indicator when mode is edit without a question theme.", async() => {
      wrapper = await mountQuestionThemeFormModalComponent({
        props: {
          ...defaultQuestionThemeFormModalProps,
          mode: "edit",
          questionTheme: undefined,
        },
      });
      const indicator = wrapper.findComponent({ name: "QuestionThemeTranslationCompletenessIndicator" });

      expect(indicator.exists()).toBeFalsy();
    });
  });

  describe("Auto-focus", () => {
    type QuestionThemeFormVm = ComponentVm & {
      focusFirstField: () => Promise<void>;
    };

    it("should call focusFirstField on the form when open becomes true.", async() => {
      wrapper = await mountQuestionThemeFormModalComponent({
        props: {
          ...defaultQuestionThemeFormModalProps,
          open: false,
        },
      });

      await wrapper.setProps({ open: true });

      const formReference = getWrapperVm(wrapper).$.refs.formReference as unknown as QuestionThemeFormVm;
      const focusFirstFieldSpy = vi.spyOn(formReference, "focusFirstField").mockResolvedValue();
      await flushPromises();

      expect(focusFirstFieldSpy).toHaveBeenCalledExactlyOnceWith();
    });

    it("should not call focusFirstField on the form when open becomes false.", async() => {
      wrapper = await mountQuestionThemeFormModalComponent({
        props: {
          ...defaultQuestionThemeFormModalProps,
          open: true,
        },
      });

      const formReference = getWrapperVm(wrapper).$.refs.formReference as unknown as QuestionThemeFormVm;
      const focusFirstFieldSpy = vi.spyOn(formReference, "focusFirstField").mockResolvedValue();
      await flushPromises();

      await wrapper.setProps({ open: false });
      await flushPromises();

      expect(focusFirstFieldSpy).not.toHaveBeenCalled();
    });

    it("should not throw when open becomes true and form reference is null.", async() => {
      wrapper = await mountQuestionThemeFormModalComponent({
        props: {
          ...defaultQuestionThemeFormModalProps,
          open: false,
        },
      });

      getWrapperVm(wrapper).$.refs.formReference = null;

      await expect(wrapper.setProps({ open: true })).resolves.toBeUndefined();
    });
  });

  describe("Dirty guard", () => {
    it("should pass dismissible as true to UModal when the form is dirty and not submitting.", async() => {
      const form = wrapper.findComponent<typeof QuestionThemeForm>("[data-testid='question-theme-form-modal-form']");
      const labelField = form.findComponent<typeof UFormField>("[data-testid='question-theme-form-label-field']");
      const labelInput = labelField.findComponent<typeof UInput>({ name: "UInput" });
      getWrapperVm(labelInput).$emit("update:modelValue", "New Label");
      await nextTick();

      const modal = wrapper.findComponent({ name: "UModal" });

      expect(modal.props("dismissible")).toBe(true);
    });

    it("should pass dismissible as true to UModal when the form is clean and not submitting.", () => {
      const modal = wrapper.findComponent({ name: "UModal" });

      expect(modal.props("dismissible")).toBe(true);
    });

    it("should pass dismissible as false to UModal when isSubmitting is true.", async() => {
      await wrapper.setProps({ isSubmitting: true });

      const modal = wrapper.findComponent({ name: "UModal" });

      expect(modal.props("dismissible")).toBe(false);
    });

    it("should expose isDirty as false when the form is clean.", () => {
      const isDirty = getWrapperVm<QuestionThemeFormModalVm>(wrapper).isDirty;

      expect(isDirty).toBe(false);
    });

    it("should expose isDirty as true when the form is dirty.", async() => {
      const form = wrapper.findComponent<typeof QuestionThemeForm>("[data-testid='question-theme-form-modal-form']");
      const labelField = form.findComponent<typeof UFormField>("[data-testid='question-theme-form-label-field']");
      const labelInput = labelField.findComponent<typeof UInput>({ name: "UInput" });
      getWrapperVm(labelInput).$emit("update:modelValue", "New Label");
      await nextTick();

      const isDirty = getWrapperVm<QuestionThemeFormModalVm>(wrapper).isDirty;

      expect(isDirty).toBe(true);
    });

    it("should expose isDirty as false when the form reference is null.", async() => {
      wrapper = await mountQuestionThemeFormModalComponent({
        props: {
          ...defaultQuestionThemeFormModalProps,
          open: false,
        },
      });

      const isDirty = getWrapperVm<QuestionThemeFormModalVm>(wrapper).isDirty;

      expect(isDirty).toBe(false);
    });

    it("should pass isGuardDialogOpen as disableShortcuts to the footer when isGuardDialogOpen is false.", () => {
      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-theme-form-modal-footer']");

      expect(footer.props("disableShortcuts")).toBeFalsy();
    });

    it("should pass true as disableShortcuts to the footer when isGuardDialogOpen is true.", async() => {
      const guardMock = useFormDirtyGuard(ref(true), ref(false), { titleKey: "", descriptionKey: "" });
      guardMock.isGuardDialogOpen.value = true;
      await nextTick();

      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-theme-form-modal-footer']");

      expect(footer.props("disableShortcuts")).toBeTruthy();
    });
  });
});