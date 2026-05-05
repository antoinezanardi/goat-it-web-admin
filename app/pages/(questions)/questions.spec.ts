import { mountSuspended } from "@nuxt/test-utils/runtime";
import { createTestingPinia } from "@pinia/testing";
import type { TestingPinia } from "@pinia/testing";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { mockStore } from "~~/tests/unit/utils/mocks/stores/store.mock";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { PageHeader } from "#components";

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

  describe("Loading state", () => {
    it("should render the loading spinner when fetching is true.", async() => {
      questionsStore.isFetchingQuestions = true;
      wrapper = await mountQuestionsPage();

      const spinner = wrapper.find("#questions-fetching-spinner");

      expect(spinner.exists()).toBeTruthy();
    });

    it("should not render the loading spinner when fetching is false.", async() => {
      questionsStore.isFetchingQuestions = false;
      wrapper = await mountQuestionsPage();

      const spinner = wrapper.find("#questions-fetching-spinner");

      expect(spinner.exists()).toBeFalsy();
    });

    it("should render the questions table when fetching is false.", async() => {
      questionsStore.isFetchingQuestions = false;
      wrapper = await mountQuestionsPage();

      const table = wrapper.find("#questions-table");

      expect(table.exists()).toBeTruthy();
    });

    it("should not render the questions table when fetching is true.", async() => {
      questionsStore.isFetchingQuestions = true;
      wrapper = await mountQuestionsPage();

      const table = wrapper.find("#questions-table");

      expect(table.exists()).toBeFalsy();
    });
  });
});