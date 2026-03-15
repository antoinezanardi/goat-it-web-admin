import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { PageHeader } from "#components";

import { QUESTION_THEMES_PAGE_ICON, QUESTION_THEMES_PAGE_TITLE_KEY } from "~/pages/(questions-themes)/question-themes.constants";
import QuestionThemesPage from "@/pages/(questions-themes)/question-themes.vue";

describe("Question Themes Page", () => {
  let wrapper: VueWrapper;

  async function mountQuestionThemesPage(options: MountSuspendedOptions<typeof QuestionThemesPage> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemesPage, {
      shallow: true,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionThemesPage();
  });

  it("should render the question themes page when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should define page metadata when mounted.", () => {
    const expectedPageMeta: Parameters<typeof definePageMeta>[0] = {
      icon: QUESTION_THEMES_PAGE_ICON,
      titleKey: QUESTION_THEMES_PAGE_TITLE_KEY,
    };

    expect(definePageMeta).toHaveBeenCalledExactlyOnceWith(expectedPageMeta);
  });

  describe("Page Header", () => {
    it("should pass the translated page title to the page header component when mounted.", () => {
      const pageHeader = wrapper.getComponent<typeof PageHeader>({ name: "PageHeader" });

      expect(pageHeader.props("title")).toBe(QUESTION_THEMES_PAGE_TITLE_KEY);
    });

    it("should pass the page icon to the page header component when mounted.", () => {
      const pageHeader = wrapper.getComponent<typeof PageHeader>({ name: "PageHeader" });

      expect(pageHeader.props("icon")).toBe(QUESTION_THEMES_PAGE_ICON);
    });
  });
});