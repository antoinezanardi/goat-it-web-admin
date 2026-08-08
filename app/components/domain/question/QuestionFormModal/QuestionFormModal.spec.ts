import { mountSuspended } from "@nuxt/test-utils/runtime";
import { createTestingPinia } from "@pinia/testing";
import type { TestingPinia } from "@pinia/testing";
import { flushPromises } from "@vue/test-utils";
import type { VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createFakeQuestionCreationDto, createFakeQuestionModificationDto, createFakeQuestionThemeAssignmentCreationDto } from "@goat-it/schemas/testing/question";
import { createFakeLocalizedText } from "@goat-it/schemas/testing/shared";

import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";
import { DEFAULT_MOCKED_LOCALE } from "~~/tests/unit/utils/mocks/composables/nuxt/useI18n/useI18n.mock.constants";
import { createFakeQuestionContent } from "~~/tests/unit/utils/faketories/questions/entity/question-content/question-content.entity.faketory";
import { createFakeQuestion } from "~~/tests/unit/utils/faketories/questions/entity/question.entity.faketory";
import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import { mockStore } from "~~/tests/unit/utils/mocks/stores/store.mock";
import type { ComponentVm } from "~~/tests/unit/utils/types/vtu.types";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { QuestionFormModal } from "#components";
import type { QuestionForm, DefaultModalFooter, DefaultModalTitle, UFormField, UInput } from "#components";

import type { QuestionFormModalProps } from "~/components/domain/question/QuestionFormModal/question-form-modal.types";
import { QUESTION_ICON } from "~/composables/domain/question/question.constants";

type QuestionFormModalVm = ComponentVm & {
  isDirty: boolean;
  forceClose: () => void;
};

describe("QuestionFormModal Component", () => {
  let wrapper: VueWrapper;
  let pinia: TestingPinia;
  let questionThemesStore: ReturnType<typeof mockStore<typeof useQuestionThemesStore>>;

  const defaultQuestionFormModalProps: QuestionFormModalProps & { open: boolean } = {
    isSubmitting: false,
    open: true,
  } as const;

  async function mountQuestionFormModalComponent(options: MountSuspendedOptions<typeof QuestionFormModal> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionFormModal, {
      props: defaultQuestionFormModalProps,
      global: {
        plugins: [pinia],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    pinia = createTestingPinia();
    questionThemesStore = mockStore(useQuestionThemesStore);
    questionThemesStore.questionThemes = [createFakeQuestionTheme(), createFakeQuestionTheme()];
    wrapper = await mountQuestionFormModalComponent();
  });

  it("should render the question form modal component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Modal title", () => {
    it("should pass the question icon to the default modal title when mounted.", () => {
      const modalTitle = wrapper.findComponent<typeof DefaultModalTitle>("[data-testid='question-form-modal-title']");

      expect(modalTitle.props("icon")).toBe(QUESTION_ICON);
    });

    it("should pass the createNew i18n key as title to the default modal title when mounted.", () => {
      const modalTitle = wrapper.findComponent<typeof DefaultModalTitle>("[data-testid='question-form-modal-title']");

      expect(modalTitle.props("title")).toBe("questions.createNew");
    });
  });

  describe("Available themes", () => {
    it("should pass question themes from the store to the form component when mounted.", () => {
      const form = wrapper.findComponent<typeof QuestionForm>("[data-testid='question-form-modal-form']");

      expect(form.props("availableThemes")).toStrictEqual(questionThemesStore.questionThemes);
    });
  });

  describe("Modal footer", () => {
    it("should pass isSubmitting as isCloseButtonDisabled to the footer when isSubmitting is false.", () => {
      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-form-modal-footer']");

      expect(footer.props("isCloseButtonDisabled")).toBeFalsy();
    });

    it("should pass isSubmitting as isCloseButtonDisabled to the footer when isSubmitting is true.", async() => {
      await wrapper.setProps({ isSubmitting: true });

      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-form-modal-footer']");

      expect(footer.props("isCloseButtonDisabled")).toBeTruthy();
    });

    it("should pass isSubmitting as isPrimaryButtonLoading to the footer when isSubmitting is false.", () => {
      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-form-modal-footer']");

      expect(footer.props("isPrimaryButtonLoading")).toBeFalsy();
    });

    it("should pass isSubmitting as isPrimaryButtonLoading to the footer when isSubmitting is true.", async() => {
      await wrapper.setProps({ isSubmitting: true });

      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-form-modal-footer']");

      expect(footer.props("isPrimaryButtonLoading")).toBeTruthy();
    });

    it("should pass the common.create i18n key as primaryButtonLabel to the footer when mode is create.", () => {
      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-form-modal-footer']");

      expect(footer.props("primaryButtonLabel")).toBe("common.create");
    });

    it("should pass the primary button create icon to the footer when mode is create.", () => {
      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-form-modal-footer']");

      expect(footer.props("primaryButtonIcon")).toBe("i-lucide-circle-plus");
    });

    it("should pass true as isPrimaryButtonDisabled to the footer when canSubmit is false on the form.", () => {
      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-form-modal-footer']");

      expect(footer.props("isPrimaryButtonDisabled")).toBeTruthy();
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
    it("should call triggerFormSubmit on the form when primaryButtonClick is emitted from the footer.", async() => {
      const formReference = getWrapperVm(wrapper).$.refs.formReference as unknown as ComponentVm & { triggerFormSubmit: () => Promise<void> };
      const triggerFormSubmitSpy = vi.spyOn(formReference, "triggerFormSubmit");

      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-form-modal-footer']") as VueWrapper;
      getWrapperVm(footer).$emit("primaryButtonClick");
      await flushPromises();

      expect(triggerFormSubmitSpy).toHaveBeenCalledOnce();
    });

    it("should not trigger form submission when primaryButtonClick is emitted and form reference is null.", async() => {
      getWrapperVm(wrapper).$.refs.formReference = null;

      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-form-modal-footer']") as VueWrapper;
      getWrapperVm(footer).$emit("primaryButtonClick");
      await flushPromises();

      expect(wrapper.emitted("submitCreation")).toBeUndefined();
    });
  });

  describe("Submit creation", () => {
    it("should emit submitCreation when the form emits submitCreation.", () => {
      const fakeData = createFakeQuestionCreationDto({ themes: [createFakeQuestionThemeAssignmentCreationDto({ isPrimary: true })] });
      const form = wrapper.findComponent<typeof QuestionForm>("[data-testid='question-form-modal-form']") as VueWrapper;

      getWrapperVm(form).$emit("submitCreation", fakeData);

      expect(wrapper.emitted("submitCreation")).toStrictEqual([[fakeData]]);
    });
  });

  describe("Auto-focus", () => {
    type QuestionFormVm = ComponentVm & {
      focusFirstField: () => Promise<void>;
    };

    it("should call focusFirstField on the form when open becomes true.", async() => {
      wrapper = await mountQuestionFormModalComponent({
        props: {
          ...defaultQuestionFormModalProps,
          open: false,
        },
      });

      await wrapper.setProps({ open: true });

      const formReference = getWrapperVm(wrapper).$.refs.formReference as unknown as QuestionFormVm;
      const focusFirstFieldSpy = vi.spyOn(formReference, "focusFirstField").mockResolvedValue();
      await flushPromises();

      expect(focusFirstFieldSpy).toHaveBeenCalledExactlyOnceWith();
    });

    it("should not call focusFirstField on the form when open becomes false.", async() => {
      wrapper = await mountQuestionFormModalComponent({
        props: {
          ...defaultQuestionFormModalProps,
          open: true,
        },
      });

      const formReference = getWrapperVm(wrapper).$.refs.formReference as unknown as QuestionFormVm;
      const focusFirstFieldSpy = vi.spyOn(formReference, "focusFirstField").mockResolvedValue();
      await flushPromises();

      await wrapper.setProps({ open: false });
      await flushPromises();

      expect(focusFirstFieldSpy).not.toHaveBeenCalled();
    });

    it("should not throw when open becomes true and form reference is null.", async() => {
      wrapper = await mountQuestionFormModalComponent({
        props: {
          ...defaultQuestionFormModalProps,
          open: false,
        },
      });

      getWrapperVm(wrapper).$.refs.formReference = null;

      await expect(wrapper.setProps({ open: true })).resolves.toBeUndefined();
    });
  });

  describe("Edit mode", () => {
    const fakeQuestion = createFakeQuestion({
      content: createFakeQuestionContent({
        statement: createFakeLocalizedText({ [DEFAULT_MOCKED_LOCALE]: "Existing Statement" }),
        answer: createFakeLocalizedText({ [DEFAULT_MOCKED_LOCALE]: "Existing Answer" }),
      }),
    });

    it("should pass the editQuestion i18n key as title to the default modal title when mode is edit.", async() => {
      wrapper = await mountQuestionFormModalComponent({
        props: {
          ...defaultQuestionFormModalProps,
          mode: "edit",
          question: fakeQuestion,
        },
      });
      const modalTitle = wrapper.findComponent<typeof DefaultModalTitle>("[data-testid='question-form-modal-title']");

      expect(modalTitle.props("title")).toBe("questions.editQuestion");
    });

    it("should pass the common.edit i18n key as primaryButtonLabel to the footer when mode is edit.", async() => {
      wrapper = await mountQuestionFormModalComponent({
        props: {
          ...defaultQuestionFormModalProps,
          mode: "edit",
          question: fakeQuestion,
        },
      });
      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-form-modal-footer']");

      expect(footer.props("primaryButtonLabel")).toBe("common.edit");
    });

    it("should pass the pencil icon as primaryButtonIcon to the footer when mode is edit.", async() => {
      wrapper = await mountQuestionFormModalComponent({
        props: {
          ...defaultQuestionFormModalProps,
          mode: "edit",
          question: fakeQuestion,
        },
      });
      const footer = wrapper.findComponent<typeof DefaultModalFooter>("[data-testid='question-form-modal-footer']");

      expect(footer.props("primaryButtonIcon")).toBe("i-lucide-pencil");
    });

    it("should pass the question to the form when mode is edit.", async() => {
      wrapper = await mountQuestionFormModalComponent({
        props: {
          ...defaultQuestionFormModalProps,
          mode: "edit",
          question: fakeQuestion,
        },
      });
      const form = wrapper.findComponent<typeof QuestionForm>("[data-testid='question-form-modal-form']");

      expect(form.props("question")).toStrictEqual(fakeQuestion);
    });

    it("should pass the mode to the form when mode is edit.", async() => {
      wrapper = await mountQuestionFormModalComponent({
        props: {
          ...defaultQuestionFormModalProps,
          mode: "edit",
          question: fakeQuestion,
        },
      });
      const form = wrapper.findComponent<typeof QuestionForm>("[data-testid='question-form-modal-form']");

      expect(form.props("mode")).toBe("edit");
    });

    it("should emit submitModification when the form emits submitModification.", async() => {
      const fakeData = createFakeQuestionModificationDto();
      wrapper = await mountQuestionFormModalComponent({
        props: {
          ...defaultQuestionFormModalProps,
          mode: "edit",
          question: fakeQuestion,
        },
      });
      const form = wrapper.findComponent<typeof QuestionForm>("[data-testid='question-form-modal-form']") as VueWrapper;

      getWrapperVm(form).$emit("submitModification", fakeData);

      expect(wrapper.emitted("submitModification")).toStrictEqual([[fakeData]]);
    });
  });

  describe("Dirty guard", () => {
    it("should pass dismissible as true to UModal when the form is dirty and not submitting.", async() => {
      const form = wrapper.findComponent<typeof QuestionForm>("[data-testid='question-form-modal-form']");
      const statementField = form.findComponent<typeof UFormField>("[data-testid='question-form-statement-field']");
      const statementInput = statementField.findComponent<typeof UInput>({ name: "UInput" });
      getWrapperVm(statementInput).$emit("update:modelValue", "New statement");
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
      const isDirty = getWrapperVm<QuestionFormModalVm>(wrapper).isDirty;

      expect(isDirty).toBe(false);
    });

    it("should expose isDirty as true when the form is dirty.", async() => {
      const form = wrapper.findComponent<typeof QuestionForm>("[data-testid='question-form-modal-form']");
      const statementField = form.findComponent<typeof UFormField>("[data-testid='question-form-statement-field']");
      const statementInput = statementField.findComponent<typeof UInput>({ name: "UInput" });
      getWrapperVm(statementInput).$emit("update:modelValue", "New statement");
      await nextTick();

      const isDirty = getWrapperVm<QuestionFormModalVm>(wrapper).isDirty;

      expect(isDirty).toBe(true);
    });

    it("should expose isDirty as false when the form reference is null.", async() => {
      wrapper = await mountQuestionFormModalComponent({
        props: {
          ...defaultQuestionFormModalProps,
          open: false,
        },
      });

      const isDirty = getWrapperVm<QuestionFormModalVm>(wrapper).isDirty;

      expect(isDirty).toBe(false);
    });
  });
});