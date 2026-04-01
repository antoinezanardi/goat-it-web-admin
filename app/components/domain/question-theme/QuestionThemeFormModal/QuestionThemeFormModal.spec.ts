import { mountSuspended } from "@nuxt/test-utils/runtime";
import { flushPromises } from "@vue/test-utils";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import { createFakeQuestionThemeCreationDto } from "~~/tests/unit/utils/faketories/question-themes/dto/question-theme.dto.faketory";

import { QuestionThemeFormModal } from "#components";
import type { QuestionThemeForm, DefaultModalFooter, DefaultModalTitle } from "#components";

import type { QuestionThemeFormModalProperties } from "~/components/domain/question-theme/QuestionThemeFormModal/question-theme-form-modal.types";
import { QUESTION_THEME_ICON } from "~/composables/domain/question-theme/question-theme.constants";

describe("QuestionThemeFormModal Component", () => {
  let wrapper: VueWrapper;

  const defaultQuestionThemeFormModalProperties: QuestionThemeFormModalProperties & { open: boolean } = {
    isCreating: false,
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
    it("should pass isCreating as isCloseButtonDisabled to the footer when isCreating is false.", () => {
      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-theme-form-modal-footer']");

      expect(footer.props("isCloseButtonDisabled")).toBeFalsy();
    });

    it("should pass isCreating as isCloseButtonDisabled to the footer when isCreating is true.", async() => {
      await wrapper.setProps({ isCreating: true });

      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-theme-form-modal-footer']");

      expect(footer.props("isCloseButtonDisabled")).toBeTruthy();
    });

    it("should pass isCreating as isPrimaryButtonLoading to the footer when isCreating is false.", () => {
      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-theme-form-modal-footer']");

      expect(footer.props("isPrimaryButtonLoading")).toBeFalsy();
    });

    it("should pass isCreating as isPrimaryButtonLoading to the footer when isCreating is true.", async() => {
      await wrapper.setProps({ isCreating: true });

      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-theme-form-modal-footer']");

      expect(footer.props("isPrimaryButtonLoading")).toBeTruthy();
    });

    it("should pass the common.create i18n key as primaryButtonLabel to the footer when mounted.", () => {
      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-theme-form-modal-footer']");

      expect(footer.props("primaryButtonLabel")).toBe("common.create");
    });

    it("should pass the primary button icon to the footer when mounted.", () => {
      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-theme-form-modal-footer']");

      expect(footer.props("primaryButtonIcon")).toBe("i-lucide-circle-plus");
    });
  });

  describe("Close modal", () => {
    it("should close the modal when closeModal is emitted from the footer and isCreating is false.", async() => {
      await wrapper.setProps({ isCreating: false });

      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-theme-form-modal-footer']") as VueWrapper;
      getWrapperVm(footer).$emit("closeModal");

      expect(wrapper.emitted("update:open")).toBeDefined();
    });

    it("should not close the modal when closeModal is emitted from the footer and isCreating is true.", async() => {
      await wrapper.setProps({ isCreating: true });

      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-theme-form-modal-footer']") as VueWrapper;
      getWrapperVm(footer).$emit("closeModal");

      expect(wrapper.emitted("update:open")).toBeUndefined();
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

      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-theme-form-modal-footer']") as VueWrapper;
      getWrapperVm(footer).$emit("primaryButtonClick");
      await flushPromises();

      expect(wrapper.emitted("submitCreation")).toBeDefined();
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
});