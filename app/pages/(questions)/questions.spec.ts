import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { PageHeader } from "#components";

import { QUESTIONS_PAGE_ICON, QUESTIONS_PAGE_TITLE_KEY } from "@/pages/(questions)/questions.constants";
import QuestionPage from "@/pages/(questions)/questions.vue";

describe("Questions Page", () => {
  let wrapper: VueWrapper;

  async function mountQuestionsPage(options: MountSuspendedOptions<typeof QuestionPage> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionPage, {
      shallow: true,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionsPage();
  });

  it("should render the questions page when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should define page metadata when mounted.", () => {
    const expectedPageMeta: Parameters<typeof definePageMeta>[0] = {
      icon: QUESTIONS_PAGE_ICON,
      titleKey: QUESTIONS_PAGE_TITLE_KEY,
    };

    expect(definePageMeta).toHaveBeenCalledExactlyOnceWith(expectedPageMeta);
  });

  describe("Page Header", () => {
    it("should pass the translated page title to the page header component when mounted.", () => {
      const pageHeader = wrapper.getComponent<typeof PageHeader>({ name: "PageHeader" });

      expect(pageHeader.props("title")).toBe(QUESTIONS_PAGE_TITLE_KEY);
    });

    it("should pass the page icon to the page header component when mounted.", () => {
      const pageHeader = wrapper.getComponent<typeof PageHeader>({ name: "PageHeader" });

      expect(pageHeader.props("icon")).toBe(QUESTIONS_PAGE_ICON);
    });
  });
});