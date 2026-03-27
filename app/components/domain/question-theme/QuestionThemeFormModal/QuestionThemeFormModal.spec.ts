import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import type { ComponentVmWithEmit } from "~~/tests/unit/utils/types/mock.types";
import { createFakeQuestionThemeCreationDto } from "~~/tests/unit/utils/faketories/question-themes/dto/question-theme.dto.faketory";

import { DefaultModalFooter, DefaultModalTitle, QuestionThemeFormModal } from "#components";

import type { QuestionThemeFormModalProperties } from "~/components/domain/question-theme/QuestionThemeFormModal/question-theme-form-modal.types";
import { QUESTION_THEME_ICON } from "~/composables/domain/question-theme/question-theme.constants";

describe("QuestionThemeFormModal Component", () => {
  let wrapper: VueWrapper;

  const defaultQuestionThemeFormModalProperties: QuestionThemeFormModalProperties = {
    isCreating: false,
  } as const;

  async function mountQuestionThemeFormModalComponent(options: MountSuspendedOptions<typeof QuestionThemeFormModal> = {}): Promise<VueWrapper> {
    const { props: optionProperties, ...restOptions } = options;

    return mountSuspended(QuestionThemeFormModal, {
      props: {
        ...defaultQuestionThemeFormModalProperties,
        open: true,
        ...(optionProperties as object),
      },
      ...restOptions,
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
      const modalTitle = wrapper.findComponent(DefaultModalTitle);

      expect(modalTitle.props("icon")).toBe(QUESTION_THEME_ICON);
    });

    it("should pass the createNew i18n key as title to the default modal title when mounted.", () => {
      const modalTitle = wrapper.findComponent(DefaultModalTitle);

      expect(modalTitle.props("title")).toBe("questionThemes.createNew");
    });
  });

  describe("Modal footer", () => {
    it("should pass isCreating as isCloseButtonDisabled to the footer when isCreating is false.", () => {
      const footer = wrapper.findComponent(DefaultModalFooter);

      expect(footer.props("isCloseButtonDisabled")).toBeFalsy();
    });

    it("should pass isCreating as isCloseButtonDisabled to the footer when isCreating is true.", async() => {
      wrapper = await mountQuestionThemeFormModalComponent({ props: { isCreating: true } });

      const footer = wrapper.findComponent(DefaultModalFooter);

      expect(footer.props("isCloseButtonDisabled")).toBeTruthy();
    });

    it("should pass isCreating as isPrimaryButtonLoading to the footer when isCreating is false.", () => {
      const footer = wrapper.findComponent(DefaultModalFooter);

      expect(footer.props("isPrimaryButtonLoading")).toBeFalsy();
    });

    it("should pass isCreating as isPrimaryButtonLoading to the footer when isCreating is true.", async() => {
      wrapper = await mountQuestionThemeFormModalComponent({ props: { isCreating: true } });

      const footer = wrapper.findComponent(DefaultModalFooter);

      expect(footer.props("isPrimaryButtonLoading")).toBeTruthy();
    });

    it("should pass the common.create i18n key as primaryButtonLabel to the footer when mounted.", () => {
      const footer = wrapper.findComponent(DefaultModalFooter);

      expect(footer.props("primaryButtonLabel")).toBe("common.create");
    });

    it("should pass the primary button icon to the footer when mounted.", () => {
      const footer = wrapper.findComponent(DefaultModalFooter);

      expect(footer.props("primaryButtonIcon")).toBe("i-lucide-circle-plus");
    });
  });

  describe("Close modal", () => {
    it("should close the modal when closeModal is emitted from the footer and isCreating is false.", async() => {
      wrapper = await mountQuestionThemeFormModalComponent({
        props: { isCreating: false },
      });

      const footer = wrapper.findComponent({ name: "DefaultModalFooter" });
      (footer.vm as unknown as ComponentVmWithEmit).$emit("closeModal");
      await nextTick();

      expect(wrapper.emitted("update:open")).toBeDefined();
    });

    it("should not close the modal when closeModal is emitted from the footer and isCreating is true.", async() => {
      wrapper = await mountQuestionThemeFormModalComponent({
        props: { isCreating: true },
      });

      const footer = wrapper.findComponent({ name: "DefaultModalFooter" });
      (footer.vm as unknown as ComponentVmWithEmit).$emit("closeModal");
      await nextTick();

      expect(wrapper.emitted("update:open")).toBeUndefined();
    });
  });

  describe("Primary button click", () => {
    it("should trigger form submission when primaryButtonClick is emitted from the footer.", async() => {
      const footer = wrapper.findComponent({ name: "DefaultModalFooter" });
      (footer.vm as unknown as ComponentVmWithEmit).$emit("primaryButtonClick");
      await nextTick();

      const form = wrapper.findComponent({ name: "QuestionThemeForm" });

      expect(form.exists()).toBeTruthy();
    });
  });

  describe("Submit creation", () => {
    it("should emit submitCreation when the form emits submitCreation.", async() => {
      const fakeData = createFakeQuestionThemeCreationDto();
      const form = wrapper.findComponent({ name: "QuestionThemeForm" });

      (form.vm as unknown as ComponentVmWithEmit).$emit("submitCreation", fakeData);
      await nextTick();

      expect(wrapper.emitted("submitCreation")).toStrictEqual([[fakeData]]);
    });
  });
});