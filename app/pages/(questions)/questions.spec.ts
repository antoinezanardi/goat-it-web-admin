import type { VueWrapper } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import QuestionPage from "@/pages/(questions)/questions.vue";

describe("Questions Page", () => {
  let wrapper: VueWrapper;

  async function mountQuestionsPage(options: MountSuspendedOptions = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionPage, {
      ...options,
    });
  }

  beforeEach(async () => {
    wrapper = await mountQuestionsPage();
  });

  it("should render the questions page when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should define page metadata when mounted.", () => {
    const expectedPageMeta: Parameters<typeof definePageMeta>[0] = {
      "icon": "i-lucide-message-circle-question-mark",
      "titleKey": "questions.pageTitle",
    };

    expect(definePageMeta).toHaveBeenCalledExactlyOnceWith(expectedPageMeta);
  });
});