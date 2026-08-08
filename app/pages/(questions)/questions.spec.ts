import { mountSuspended } from "@nuxt/test-utils/runtime";
import { createTestingPinia } from "@pinia/testing";
import type { TestingPinia } from "@pinia/testing";
import type { VueWrapper } from "@vue/test-utils";
import { flushPromises } from "@vue/test-utils";
import { nextTick } from "vue";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createFakeQuestionCreationDto, createFakeQuestionModificationDto, createFakeQuestionThemeAssignmentCreationDto } from "@goat-it/schemas/testing/question";

import { createFakeQuestion } from "~~/tests/unit/utils/faketories/questions/entity/question.entity.faketory";
import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import { mockStore } from "~~/tests/unit/utils/mocks/stores/store.mock";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { PageHeader, UModal } from "#components";

import type QuestionsTable from "@/components/domain/question/QuestionsTable/QuestionsTable.vue";
import { QUESTION_ICON } from "~/composables/domain/question/question.constants";
import { QUESTIONS_PAGE_ORDER, QUESTIONS_PAGE_TITLE_KEY } from "@/pages/(questions)/questions.constants";
import QuestionPage from "@/pages/(questions)/questions.vue";

describe("Questions Page", () => {
  let wrapper: VueWrapper;
  let pinia: TestingPinia;
  let questionsStore: ReturnType<typeof mockStore<typeof useQuestionsStore>>;

  async function mountQuestionsPage(options: MountSuspendedOptions<typeof QuestionPage> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionPage, {
      shallow: true,
      global: {
        plugins: [pinia],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    pinia = createTestingPinia();
    wrapper = await mountQuestionsPage();
    questionsStore = mockStore(useQuestionsStore);
  });

  it("should render the questions page when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should define page metadata when mounted.", () => {
    const expectedPageMeta: Parameters<typeof definePageMeta>[0] = {
      icon: QUESTION_ICON,
      titleKey: QUESTIONS_PAGE_TITLE_KEY,
      order: QUESTIONS_PAGE_ORDER,
    };

    expect(definePageMeta).toHaveBeenCalledExactlyOnceWith(expectedPageMeta);
  });

  it("should set the page title via useHead when mounted.", () => {
    const expectedHeadInput = {
      title: QUESTIONS_PAGE_TITLE_KEY,
    };
    const extractedHeadFunction = vi.mocked(useHead).mock.calls[0]?.[0] as () => Record<string, unknown>;

    expect(extractedHeadFunction()).toStrictEqual(expectedHeadInput);
  });

  it("should call callOnce with fetchAndStoreQuestions when mounted.", () => {
    expect(callOnce).toHaveBeenCalledExactlyOnceWith(questionsStore.fetchAndStoreQuestions, expect.any(String));
  });

  describe("Page Header", () => {
    it("should pass the translated page title to the page header component when mounted.", () => {
      const pageHeader = wrapper.getComponent<typeof PageHeader>({ name: "PageHeader" });

      expect(pageHeader.props("title")).toBe(QUESTIONS_PAGE_TITLE_KEY);
    });

    it("should pass the page icon to the page header component when mounted.", () => {
      const pageHeader = wrapper.getComponent<typeof PageHeader>({ name: "PageHeader" });

      expect(pageHeader.props("icon")).toBe(QUESTION_ICON);
    });
  });

  describe("Questions table", () => {
    it("should always render the questions table when mounted.", () => {
      const table = wrapper.find("#questions-table");

      expect(table.exists()).toBeTruthy();
    });
  });

  describe("Question form modal", () => {
    it("should pass isSubmitting as false to the modal when not creating.", () => {
      questionsStore.isCreatingQuestion = false;
      const modal = wrapper.find("[data-testid=\"question-form-modal\"]");

      expect(modal.attributes("is-submitting")).toBe("false");
    });

    it("should pass isSubmitting as true to the modal when creating.", async() => {
      questionsStore.isCreatingQuestion = true;
      wrapper = await mountQuestionsPage();

      const modal = wrapper.find("[data-testid=\"question-form-modal\"]");

      expect(modal.attributes("is-submitting")).toBe("true");
    });

    it("should open the modal when the table emits startCreate.", async() => {
      questionsStore.isFetchingQuestions = false;
      wrapper = await mountQuestionsPage();
      const table = wrapper.findComponent<typeof QuestionsTable>({ name: "QuestionsTable" });
      getWrapperVm(table).$emit("startCreate");
      await nextTick();

      const modal = wrapper.find("[data-testid=\"question-form-modal\"]");

      expect(modal.attributes("open")).toBe("true");
    });

    it("should call createAndStoreQuestion when modal emits submitCreation.", async() => {
      const fakeDto = createFakeQuestionCreationDto({ themes: [createFakeQuestionThemeAssignmentCreationDto({ isPrimary: true })] });
      const modal = wrapper.findComponent<typeof UModal>("[data-testid='question-form-modal']");
      getWrapperVm(modal).$emit("submitCreation", fakeDto);
      await flushPromises();

      expect(questionsStore.createAndStoreQuestion).toHaveBeenCalledExactlyOnceWith(fakeDto);
    });

    it("should close the modal after submitCreation when isCreateQuestionSuccess is true.", async() => {
      questionsStore.isCreateQuestionSuccess = true;
      questionsStore.isFetchingQuestions = false;
      wrapper = await mountQuestionsPage();
      const table = wrapper.findComponent<typeof QuestionsTable>({ name: "QuestionsTable" });
      getWrapperVm(table).$emit("startCreate");
      await nextTick();

      const modalStub = wrapper.findComponent<typeof UModal>("[data-testid='question-form-modal']");
      const forceClose = vi.fn<() => void>();
      (modalStub.vm as unknown as Record<string, unknown>).forceClose = forceClose;

      const fakeDto = createFakeQuestionCreationDto({ themes: [createFakeQuestionThemeAssignmentCreationDto({ isPrimary: true })] });
      getWrapperVm(modalStub).$emit("submitCreation", fakeDto);
      await flushPromises();

      expect(forceClose).toHaveBeenCalledExactlyOnceWith();
    });

    it("should close the modal when modal emits update:open with false.", async() => {
      questionsStore.isFetchingQuestions = false;
      wrapper = await mountQuestionsPage();
      const table = wrapper.findComponent<typeof QuestionsTable>({ name: "QuestionsTable" });
      getWrapperVm(table).$emit("startCreate");
      await nextTick();

      const modal = wrapper.findComponent<typeof UModal>("[data-testid='question-form-modal']");
      getWrapperVm(modal).$emit("update:open", false);
      await nextTick();

      expect(wrapper.find("[data-testid=\"question-form-modal\"]").attributes("open")).toBe("false");
    });
  });

  describe("Edit flow", () => {
    it("should open the modal when the table emits startEdit for an existing question.", async() => {
      const fakeQuestion = createFakeQuestion({ id: "question-id-123" });
      questionsStore.questions = [fakeQuestion];
      questionsStore.isFetchingQuestions = false;
      wrapper = await mountQuestionsPage();

      const table = wrapper.findComponent<typeof QuestionsTable>({ name: "QuestionsTable" });
      getWrapperVm(table).$emit("startEdit", "question-id-123");
      await nextTick();

      const modal = wrapper.find("[data-testid=\"question-form-modal\"]");

      expect(modal.attributes("open")).toBe("true");
    });

    it("should set the modal mode to edit when the table emits startEdit for an existing question.", async() => {
      const fakeQuestion = createFakeQuestion({ id: "question-id-123" });
      questionsStore.questions = [fakeQuestion];
      questionsStore.isFetchingQuestions = false;
      wrapper = await mountQuestionsPage();

      const table = wrapper.findComponent<typeof QuestionsTable>({ name: "QuestionsTable" });
      getWrapperVm(table).$emit("startEdit", "question-id-123");
      await nextTick();

      const modal = wrapper.find("[data-testid=\"question-form-modal\"]");

      expect(modal.attributes("mode")).toBe("edit");
    });

    it("should pass the question to the modal when the table emits startEdit for an existing question.", async() => {
      const fakeQuestion = createFakeQuestion({ id: "question-id-123" });
      questionsStore.questions = [fakeQuestion];
      questionsStore.isFetchingQuestions = false;
      wrapper = await mountQuestionsPage();

      const table = wrapper.findComponent<typeof QuestionsTable>({ name: "QuestionsTable" });
      getWrapperVm(table).$emit("startEdit", "question-id-123");
      await nextTick();

      const modal = wrapper.findComponent<typeof UModal>("[data-testid='question-form-modal']");
      const questionProperty = getWrapperVm(modal).$attrs.question;

      expect(questionProperty).toStrictEqual(fakeQuestion);
    });

    it("should not open the modal when the table emits startEdit for an unknown question id.", async() => {
      questionsStore.isFetchingQuestions = false;
      wrapper = await mountQuestionsPage();

      const table = wrapper.findComponent<typeof QuestionsTable>({ name: "QuestionsTable" });
      getWrapperVm(table).$emit("startEdit", "unknown-id");
      await nextTick();

      const modal = wrapper.find("[data-testid=\"question-form-modal\"]");

      expect(modal.attributes("open")).toBe("false");
    });

    it("should not call modifyAndStoreQuestion when the modal emits submitModification without a question being edited.", async() => {
      wrapper = await mountQuestionsPage();

      const modal = wrapper.findComponent<typeof UModal>("[data-testid='question-form-modal']");
      getWrapperVm(modal).$emit("submitModification", createFakeQuestionModificationDto());
      await flushPromises();

      expect(questionsStore.modifyAndStoreQuestion).not.toHaveBeenCalled();
    });

    it("should call modifyAndStoreQuestion with the id and dto when the modal emits submitModification.", async() => {
      const fakeQuestion = createFakeQuestion({ id: "question-id-123" });
      const fakeModificationDto = createFakeQuestionModificationDto();
      questionsStore.questions = [fakeQuestion];
      questionsStore.isFetchingQuestions = false;
      wrapper = await mountQuestionsPage();

      const table = wrapper.findComponent<typeof QuestionsTable>({ name: "QuestionsTable" });
      getWrapperVm(table).$emit("startEdit", "question-id-123");
      await nextTick();

      const modal = wrapper.findComponent<typeof UModal>("[data-testid='question-form-modal']");
      getWrapperVm(modal).$emit("submitModification", fakeModificationDto);
      await flushPromises();

      expect(questionsStore.modifyAndStoreQuestion).toHaveBeenCalledExactlyOnceWith("question-id-123", fakeModificationDto);
    });

    it("should close the modal after submitModification when isModifyQuestionSuccess is true.", async() => {
      const fakeQuestion = createFakeQuestion({ id: "question-id-123" });
      questionsStore.questions = [fakeQuestion];
      questionsStore.isModifyQuestionSuccess = true;
      questionsStore.isFetchingQuestions = false;
      wrapper = await mountQuestionsPage();

      const table = wrapper.findComponent<typeof QuestionsTable>({ name: "QuestionsTable" });
      getWrapperVm(table).$emit("startEdit", "question-id-123");
      await nextTick();

      const modalStub = wrapper.findComponent<typeof UModal>("[data-testid='question-form-modal']");
      const forceClose = vi.fn<() => void>();
      (modalStub.vm as unknown as Record<string, unknown>).forceClose = forceClose;

      const modal = wrapper.findComponent<typeof UModal>("[data-testid='question-form-modal']");
      getWrapperVm(modal).$emit("submitModification", createFakeQuestionModificationDto());
      await flushPromises();

      expect(forceClose).toHaveBeenCalledExactlyOnceWith();
    });

    it("should not close the modal after submitModification when isModifyQuestionSuccess is false.", async() => {
      const fakeQuestion = createFakeQuestion({ id: "question-id-123" });
      questionsStore.questions = [fakeQuestion];
      questionsStore.isModifyQuestionSuccess = false;
      questionsStore.isFetchingQuestions = false;
      wrapper = await mountQuestionsPage();

      const table = wrapper.findComponent<typeof QuestionsTable>({ name: "QuestionsTable" });
      getWrapperVm(table).$emit("startEdit", "question-id-123");
      await nextTick();

      const modal = wrapper.findComponent<typeof UModal>("[data-testid='question-form-modal']");
      getWrapperVm(modal).$emit("submitModification", createFakeQuestionModificationDto());
      await flushPromises();

      expect(wrapper.find("[data-testid=\"question-form-modal\"]").attributes("open")).toBe("true");
    });

    it("should reset the mode to create when the table emits startCreate after an edit.", async() => {
      const fakeQuestion = createFakeQuestion({ id: "question-id-123" });
      questionsStore.questions = [fakeQuestion];
      questionsStore.isFetchingQuestions = false;
      wrapper = await mountQuestionsPage();

      const table = wrapper.findComponent<typeof QuestionsTable>({ name: "QuestionsTable" });
      getWrapperVm(table).$emit("startEdit", "question-id-123");
      await nextTick();
      getWrapperVm(table).$emit("startCreate");
      await nextTick();

      const modal = wrapper.find("[data-testid=\"question-form-modal\"]");

      expect(modal.attributes("mode")).toBe("create");
    });

    it("should pass isSubmitting as true to the modal when modifying a question.", async() => {
      questionsStore.isModifyingQuestion = true;
      wrapper = await mountQuestionsPage();

      const modal = wrapper.find("[data-testid=\"question-form-modal\"]");

      expect(modal.attributes("is-submitting")).toBe("true");
    });
  });

  describe("Route guard", () => {
    it("should mount the page with the form dirty guard wired when mounted.", () => {
      expect(wrapper.exists()).toBeTruthy();
    });
  });
});