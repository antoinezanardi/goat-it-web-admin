import { mountSuspended } from "@nuxt/test-utils/runtime";
import { flushPromises } from "@vue/test-utils";
import type { VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";
import { beforeEach, describe, expect, it } from "vitest";

import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";
import { createFakeQuestionThemeCreationDto, createFakeQuestionThemeModificationDto } from "~~/tests/unit/utils/faketories/question-themes/dto/question-theme.dto.faketory";

import { QuestionThemeFormModal } from "#components";
import type { QuestionThemeForm, DefaultModalFooter, DefaultModalTitle, QuestionThemeTranslationCompletenessIndicator } from "#components";

import { QUESTION_THEME_ICON } from "~/composables/domain/question-theme/constants/question-theme.constants";
import type { QuestionThemeFormModalProperties } from "~/components/domain/question-theme/QuestionThemeFormModal/question-theme-form-modal.types";

describe("QuestionThemeFormModal Component", () => {
  let wrapper: VueWrapper;

  const defaultQuestionThemeFormModalProperties: QuestionThemeFormModalProperties & { open: boolean } = {
    isSubmitting: false,
    existingSlugs: [],
    open: true,
  } as const;

  async function mountQuestionThemeFormModalComponent(options: MountSuspendedOptions<typeof QuestionThemeFormModal> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemeFormModal, {
      props: defaultQuestionThemeFormModalProperties,
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
          ...defaultQuestionThemeFormModalProperties,
          existingSlugs: ["slug-one", "slug-two"],
        },
      });
      const form = wrapper.findComponent<typeof QuestionThemeForm>("[data-testid='question-theme-form-modal-form']");

      expect(form.props("existingSlugs")).toStrictEqual(["slug-one", "slug-two"]);
    });
  });

  describe("Close modal", () => {
    it("should close the modal when the close button is clicked from the footer.", async() => {
      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-theme-form-modal-footer']") as VueWrapper;
      const closeButton = footer.find("[data-testid='default-modal-footer-close-button']");
      await closeButton.trigger("click");

      expect(wrapper.emitted("update:open")).toBeDefined();
    });

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
    it("should pass the editTheme i18n key as title to the default modal title when mode is edit.", async() => {
      wrapper = await mountQuestionThemeFormModalComponent({
        props: {
          ...defaultQuestionThemeFormModalProperties,
          mode: "edit",
          questionTheme: createFakeQuestionTheme(),
        },
      });
      const modalTitle = wrapper.findComponent<typeof DefaultModalTitle>("[data-testid='question-theme-form-modal-title']");

      expect(modalTitle.props("title")).toBe("questionThemes.editTheme");
    });

    it("should pass the common.edit i18n key as primaryButtonLabel to the footer when mode is edit.", async() => {
      wrapper = await mountQuestionThemeFormModalComponent({
        props: {
          ...defaultQuestionThemeFormModalProperties,
          mode: "edit",
          questionTheme: createFakeQuestionTheme(),
        },
      });
      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-theme-form-modal-footer']");

      expect(footer.props("primaryButtonLabel")).toBe("common.edit");
    });

    it("should pass the pencil icon as primaryButtonIcon to the footer when mode is edit.", async() => {
      wrapper = await mountQuestionThemeFormModalComponent({
        props: {
          ...defaultQuestionThemeFormModalProperties,
          mode: "edit",
          questionTheme: createFakeQuestionTheme(),
        },
      });
      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-theme-form-modal-footer']");

      expect(footer.props("primaryButtonIcon")).toBe("i-lucide-pencil");
    });

    it("should pass the question theme to the form when mode is edit.", async() => {
      const fakeTheme = createFakeQuestionTheme();
      wrapper = await mountQuestionThemeFormModalComponent({
        props: {
          ...defaultQuestionThemeFormModalProperties,
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
          ...defaultQuestionThemeFormModalProperties,
          mode: "edit",
          questionTheme: createFakeQuestionTheme(),
        },
      });
      const form = wrapper.findComponent<typeof QuestionThemeForm>("[data-testid='question-theme-form-modal-form']");

      expect(form.props("mode")).toBe("edit");
    });

    it("should emit submitModification when the form emits submitModification.", async() => {
      const fakeData = createFakeQuestionThemeModificationDto();
      wrapper = await mountQuestionThemeFormModalComponent({
        props: {
          ...defaultQuestionThemeFormModalProperties,
          mode: "edit",
          questionTheme: createFakeQuestionTheme(),
        },
      });
      const form = wrapper.findComponent<typeof QuestionThemeForm>("[data-testid='question-theme-form-modal-form']") as VueWrapper;

      getWrapperVm(form).$emit("submitModification", fakeData);

      expect(wrapper.emitted("submitModification")).toStrictEqual([[fakeData]]);
    });

    it("should render the question theme translation completeness indicator when mode is edit and questionTheme is provided.", async() => {
      const fakeTheme = createFakeQuestionTheme();
      wrapper = await mountQuestionThemeFormModalComponent({
        props: {
          ...defaultQuestionThemeFormModalProperties,
          mode: "edit",
          questionTheme: fakeTheme,
        },
      });
      const indicator = wrapper.findComponent<typeof QuestionThemeTranslationCompletenessIndicator>({ name: "QuestionThemeTranslationCompletenessIndicator" });

      expect(indicator.exists()).toBeTruthy();
    });

    it("should pass the question theme to the translation completeness indicator when mode is edit.", async() => {
      const fakeTheme = createFakeQuestionTheme();
      wrapper = await mountQuestionThemeFormModalComponent({
        props: {
          ...defaultQuestionThemeFormModalProperties,
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
  });
});