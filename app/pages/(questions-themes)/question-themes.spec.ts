import { mountSuspended } from "@nuxt/test-utils/runtime";
import { createTestingPinia } from "@pinia/testing";
import type { TestingPinia } from "@pinia/testing";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { mockStore } from "~~/tests/unit/utils/mocks/stores/store.mock";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { PageHeader } from "#components";

import { QUESTION_THEME_ICON } from "~/composables/domain/question-theme/question-theme.constants";
import { QUESTION_THEMES_PAGE_TITLE_KEY } from "~/pages/(questions-themes)/question-themes.constants";
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
    it("should render the loading spinner when fetching is true.", async() => {
      questionThemesStore.isFetchingQuestionThemes = true;
      wrapper = await mountQuestionThemesPage();

      const spinner = wrapper.find("#question-themes-fetching-spinner");

      expect(spinner.exists()).toBeTruthy();
    });

    it("should not render the loading spinner when fetching is false.", async() => {
      questionThemesStore.isFetchingQuestionThemes = false;
      wrapper = await mountQuestionThemesPage();

      const spinner = wrapper.find("#question-themes-fetching-spinner");

      expect(spinner.exists()).toBeFalsy();
    });

    it("should render the question themes table when fetching is false.", async() => {
      questionThemesStore.isFetchingQuestionThemes = false;

      wrapper = await mountQuestionThemesPage();

      const table = wrapper.find("#question-themes-table");

      expect(table.exists()).toBeTruthy();
    });

    it("should not render the question themes table when fetching is true.", async() => {
      questionThemesStore.isFetchingQuestionThemes = true;
      wrapper = await mountQuestionThemesPage();

      const table = wrapper.find("#question-themes-table");

      expect(table.exists()).toBeFalsy();
    });
  });
});