import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import QuestionThemesPage from "@/pages/(questions-themes)/question-themes.vue";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

describe("Question Themes Page", () => {
  let wrapper: VueWrapper;

  async function mountQuestionThemesPage(options: MountSuspendedOptions = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemesPage, {
      ...options,
    });
  }

  beforeEach(async () => {
    wrapper = await mountQuestionThemesPage();
  });

  it("should render the question themes page when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should define page metadata when mounted.", () => {
    const expectedPageMeta: Parameters<typeof definePageMeta>[0] = {
      "icon": "i-lucide-palette",
      "titleKey": "questionThemes.pageTitle",
    };

    expect(definePageMeta).toHaveBeenCalledExactlyOnceWith(expectedPageMeta);
  });
});
