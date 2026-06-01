import { mountSuspended } from "@nuxt/test-utils/runtime";
import { createTestingPinia } from "@pinia/testing";
import type { TestingPinia } from "@pinia/testing";
import type { VueWrapper } from "@vue/test-utils";
import { flushPromises } from "@vue/test-utils";
import { nextTick } from "vue";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import { mockStore } from "~~/tests/unit/utils/mocks/stores/store.mock";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";
import { createFakeQuestionThemeCreationDto, createFakeQuestionThemeModificationDto } from "~~/tests/unit/utils/faketories/question-themes/dto/question-theme.dto.faketory";

import type { PageHeader, UModal } from "#components";

import { QUESTION_THEME_ICON } from "~/composables/domain/question-theme/constants/question-theme.constants";
import type QuestionThemeFormModal from "@/components/domain/question-theme/QuestionThemeFormModal/QuestionThemeFormModal.vue";
import type QuestionThemesTable from "@/components/domain/question-theme/QuestionThemesTable/QuestionThemesTable.vue";
import { QUESTION_THEMES_PAGE_ORDER, QUESTION_THEMES_PAGE_TITLE_KEY } from "~/pages/(questions-themes)/question-themes.constants";
import QuestionThemesPage from "@/pages/(questions-themes)/question-themes.vue";

describe("Question Themes Page", () => {
  let wrapper: VueWrapper;
  let pinia: TestingPinia;
  let questionThemesStore: ReturnType<typeof mockStore<typeof useQuestionThemesStore>>;

  async function mountQuestionThemesPage(options: MountSuspendedOptions<typeof QuestionThemesPage> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemesPage, {
      shallow: true,
      global: {
        plugins: [pinia],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    pinia = createTestingPinia();
    wrapper = await mountQuestionThemesPage();
    questionThemesStore = mockStore(useQuestionThemesStore);
  });

  it("should render the question themes page when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should define page metadata when mounted.", () => {
    const expectedPageMeta: Parameters<typeof definePageMeta>[0] = {
      icon: QUESTION_THEME_ICON,
      titleKey: QUESTION_THEMES_PAGE_TITLE_KEY,
      order: QUESTION_THEMES_PAGE_ORDER,
    };

    expect(definePageMeta).toHaveBeenCalledExactlyOnceWith(expectedPageMeta);
  });

  it("should set the page title via useHead when mounted.", () => {
    const expectedHeadInput = {
      title: QUESTION_THEMES_PAGE_TITLE_KEY,
    };
    const extractedHeadFunction = vi.mocked(useHead).mock.calls[0]?.[0] as () => Record<string, unknown>;

    expect(extractedHeadFunction()).toStrictEqual(expectedHeadInput);
  });

  describe("Page Header", () => {
    it("should pass the translated page title to the page header component when mounted.", () => {
      const pageHeader = wrapper.getComponent<typeof PageHeader>({ name: "PageHeader" });

      expect(pageHeader.props("title")).toBe(QUESTION_THEMES_PAGE_TITLE_KEY);
    });

    it("should pass the page icon to the page header component when mounted.", () => {
      const pageHeader = wrapper.getComponent<typeof PageHeader>({ name: "PageHeader" });

      expect(pageHeader.props("icon")).toBe(QUESTION_THEME_ICON);
    });
  });

  describe("Loading state", () => {
    it("should always render the question themes table when mounted.", () => {
      const table = wrapper.find("#question-themes-table");

      expect(table.exists()).toBeTruthy();
    });
  });

  describe("Question theme form modal", () => {
    it("should pass isSubmitting as false to the modal when not creating and not modifying.", () => {
      questionThemesStore.isCreatingQuestionTheme = false;
      questionThemesStore.isModifyingQuestionTheme = false;
      const modal = wrapper.find("[data-testid=\"question-theme-form-modal\"]");

      expect(modal.attributes("is-submitting")).toBe("false");
    });

    it("should pass isSubmitting as true to the modal when creating.", async() => {
      questionThemesStore.isCreatingQuestionTheme = true;
      wrapper = await mountQuestionThemesPage();

      const modal = wrapper.find("[data-testid=\"question-theme-form-modal\"]");

      expect(modal.attributes("is-submitting")).toBe("true");
    });

    it("should pass isSubmitting as true to the modal when modifying.", async() => {
      questionThemesStore.isModifyingQuestionTheme = true;
      wrapper = await mountQuestionThemesPage();

      const modal = wrapper.find("[data-testid=\"question-theme-form-modal\"]");

      expect(modal.attributes("is-submitting")).toBe("true");
    });

    it("should open the modal when the table emits startCreate.", async() => {
      const table = wrapper.findComponent<typeof QuestionThemesTable>({ name: "QuestionThemesTable" });
      getWrapperVm(table).$emit("startCreate");
      await nextTick();

      const modal = wrapper.find("[data-testid=\"question-theme-form-modal\"]");

      expect(modal.attributes("open")).toBe("true");
    });

    it("should call createAndStoreQuestionTheme when the modal emits submitCreation.", async() => {
      const fakeCreationDto = createFakeQuestionThemeCreationDto();
      const modal = wrapper.findComponent<typeof UModal>("[data-testid='question-theme-form-modal']");
      getWrapperVm(modal).$emit("submitCreation", fakeCreationDto);
      await flushPromises();

      expect(questionThemesStore.createAndStoreQuestionTheme).toHaveBeenCalledExactlyOnceWith(fakeCreationDto);
    });

    it("should close the modal after submitCreation when isCreateQuestionThemeSuccess is true.", async() => {
      questionThemesStore.isCreateQuestionThemeSuccess = true;
      const table = wrapper.findComponent<typeof QuestionThemesTable>({ name: "QuestionThemesTable" });
      getWrapperVm(table).$emit("startCreate");

      const fakeCreationDto = createFakeQuestionThemeCreationDto();
      const modal = wrapper.findComponent<typeof UModal>("[data-testid='question-theme-form-modal']");
      getWrapperVm(modal).$emit("submitCreation", fakeCreationDto);
      await flushPromises();

      expect(wrapper.find("[data-testid=\"question-theme-form-modal\"]").attributes("open")).toBe("false");
    });

    it("should not close the modal after submitCreation when isCreateQuestionThemeSuccess is false.", async() => {
      questionThemesStore.isCreateQuestionThemeSuccess = false;
      const table = wrapper.findComponent<typeof QuestionThemesTable>({ name: "QuestionThemesTable" });
      getWrapperVm(table).$emit("startCreate");

      const fakeCreationDto = createFakeQuestionThemeCreationDto();
      const modal = wrapper.findComponent<typeof UModal>("[data-testid='question-theme-form-modal']");
      getWrapperVm(modal).$emit("submitCreation", fakeCreationDto);
      await flushPromises();

      expect(wrapper.find("[data-testid=\"question-theme-form-modal\"]").attributes("open")).toBe("true");
    });

    it("should update the modal open state when the modal emits update:open.", async() => {
      const table = wrapper.findComponent<typeof QuestionThemesTable>({ name: "QuestionThemesTable" });
      getWrapperVm(table).$emit("startCreate");
      await nextTick();

      const modal = wrapper.findComponent<typeof UModal>("[data-testid='question-theme-form-modal']");
      getWrapperVm(modal).$emit("update:open", false);
      await nextTick();

      expect(wrapper.find("[data-testid=\"question-theme-form-modal\"]").attributes("open")).toBe("false");
    });

    it("should pass the question theme slugs from the store as existingSlugs to the modal when there are slugs.", async() => {
      questionThemesStore.questionThemeSlugs = ["slug-one", "slug-two"];
      wrapper = await mountQuestionThemesPage();

      const modal = wrapper.find("[data-testid=\"question-theme-form-modal\"]");

      expect(modal.attributes("existing-slugs")).toBe("slug-one,slug-two");
    });

    it("should pass an empty existingSlugs to the modal when there are no question theme slugs.", () => {
      const modal = wrapper.find("[data-testid=\"question-theme-form-modal\"]");

      expect(modal.attributes("existing-slugs")).toBe("");
    });
  });

  describe("Edit flow", () => {
    it("should open the modal when the table emits startEdit for an existing theme.", async() => {
      const fakeTheme = createFakeQuestionTheme({ id: "theme-id-123" });
      questionThemesStore.questionThemes = [fakeTheme];
      wrapper = await mountQuestionThemesPage();

      const table = wrapper.findComponent<typeof QuestionThemesTable>({ name: "QuestionThemesTable" });
      getWrapperVm(table).$emit("startEdit", "theme-id-123");
      await nextTick();

      const modal = wrapper.find("[data-testid=\"question-theme-form-modal\"]");

      expect(modal.attributes("open")).toBe("true");
    });

    it("should set the modal mode to edit when the table emits startEdit for an existing theme.", async() => {
      const fakeTheme = createFakeQuestionTheme({ id: "theme-id-123" });
      questionThemesStore.questionThemes = [fakeTheme];
      wrapper = await mountQuestionThemesPage();

      const table = wrapper.findComponent<typeof QuestionThemesTable>({ name: "QuestionThemesTable" });
      getWrapperVm(table).$emit("startEdit", "theme-id-123");
      await nextTick();

      const modal = wrapper.find("[data-testid=\"question-theme-form-modal\"]");

      expect(modal.attributes("mode")).toBe("edit");
    });

    it("should pass the question theme to the modal when the table emits startEdit for an existing theme.", async() => {
      const fakeTheme = createFakeQuestionTheme({ id: "theme-id-123" });
      questionThemesStore.questionThemes = [fakeTheme];
      wrapper = await mountQuestionThemesPage();

      const table = wrapper.findComponent<typeof QuestionThemesTable>({ name: "QuestionThemesTable" });
      getWrapperVm(table).$emit("startEdit", "theme-id-123");
      await nextTick();

      const modal = wrapper.findComponent<typeof QuestionThemeFormModal>("[data-testid='question-theme-form-modal']");
      const questionThemeProperty = getWrapperVm(modal).$attrs["question-theme"];

      expect(questionThemeProperty).toStrictEqual(fakeTheme);
    });

    it("should not open the modal when the table emits startEdit for an unknown theme id.", async() => {
      wrapper = await mountQuestionThemesPage();
      const table = wrapper.findComponent<typeof QuestionThemesTable>({ name: "QuestionThemesTable" });
      getWrapperVm(table).$emit("startEdit", "unknown-id");
      await nextTick();

      const modal = wrapper.find("[data-testid=\"question-theme-form-modal\"]");

      expect(modal.attributes("open")).toBe("false");
    });

    it("should not call modifyAndStoreQuestionTheme when the modal emits submitModification without a theme being edited.", async() => {
      wrapper = await mountQuestionThemesPage();

      const modal = wrapper.findComponent<typeof UModal>("[data-testid='question-theme-form-modal']");
      getWrapperVm(modal).$emit("submitModification", createFakeQuestionThemeModificationDto());
      await flushPromises();

      expect(questionThemesStore.modifyAndStoreQuestionTheme).not.toHaveBeenCalled();
    });

    it("should call modifyAndStoreQuestionTheme with the id and dto when the modal emits submitModification.", async() => {
      const fakeTheme = createFakeQuestionTheme({ id: "theme-id-123" });
      const fakeModificationDto = createFakeQuestionThemeModificationDto();
      questionThemesStore.questionThemes = [fakeTheme];
      wrapper = await mountQuestionThemesPage();

      const table = wrapper.findComponent<typeof QuestionThemesTable>({ name: "QuestionThemesTable" });
      getWrapperVm(table).$emit("startEdit", "theme-id-123");
      await nextTick();

      const modal = wrapper.findComponent<typeof UModal>("[data-testid='question-theme-form-modal']");
      getWrapperVm(modal).$emit("submitModification", fakeModificationDto);
      await flushPromises();

      expect(questionThemesStore.modifyAndStoreQuestionTheme).toHaveBeenCalledExactlyOnceWith("theme-id-123", fakeModificationDto);
    });

    it("should close the modal after submitModification when isModifyQuestionThemeSuccess is true.", async() => {
      const fakeTheme = createFakeQuestionTheme({ id: "theme-id-123" });
      questionThemesStore.questionThemes = [fakeTheme];
      questionThemesStore.isModifyQuestionThemeSuccess = true;
      wrapper = await mountQuestionThemesPage();

      const table = wrapper.findComponent<typeof QuestionThemesTable>({ name: "QuestionThemesTable" });
      getWrapperVm(table).$emit("startEdit", "theme-id-123");
      await nextTick();

      const modal = wrapper.findComponent<typeof UModal>("[data-testid='question-theme-form-modal']");
      getWrapperVm(modal).$emit("submitModification", createFakeQuestionThemeModificationDto());
      await flushPromises();

      expect(wrapper.find("[data-testid=\"question-theme-form-modal\"]").attributes("open")).toBe("false");
    });

    it("should not close the modal after submitModification when isModifyQuestionThemeSuccess is false.", async() => {
      const fakeTheme = createFakeQuestionTheme({ id: "theme-id-123" });
      questionThemesStore.questionThemes = [fakeTheme];
      questionThemesStore.isModifyQuestionThemeSuccess = false;
      wrapper = await mountQuestionThemesPage();

      const table = wrapper.findComponent<typeof QuestionThemesTable>({ name: "QuestionThemesTable" });
      getWrapperVm(table).$emit("startEdit", "theme-id-123");
      await nextTick();

      const modal = wrapper.findComponent<typeof UModal>("[data-testid='question-theme-form-modal']");
      getWrapperVm(modal).$emit("submitModification", createFakeQuestionThemeModificationDto());
      await flushPromises();

      expect(wrapper.find("[data-testid=\"question-theme-form-modal\"]").attributes("open")).toBe("true");
    });

    it("should reset the mode to create when the table emits startCreate after an edit.", async() => {
      const fakeTheme = createFakeQuestionTheme({ id: "theme-id-123" });
      questionThemesStore.questionThemes = [fakeTheme];
      wrapper = await mountQuestionThemesPage();

      const table = wrapper.findComponent<typeof QuestionThemesTable>({ name: "QuestionThemesTable" });
      getWrapperVm(table).$emit("startEdit", "theme-id-123");
      await nextTick();
      getWrapperVm(table).$emit("startCreate");
      await nextTick();

      const modal = wrapper.find("[data-testid=\"question-theme-form-modal\"]");

      expect(modal.attributes("mode")).toBe("create");
    });
  });
});