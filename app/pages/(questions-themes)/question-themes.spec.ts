import QuestionThemesPage from "@/pages/(questions-themes)/question-themes.vue";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import { definePageMetaMock } from "~~/tests/unit/utils/mocks/nuxt/definePageMeta.mock";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

describe("Question Themes Page", () => {
  let wrapper: VueWrapper;

  async function mountQuestionThemesPage(options: MountSuspendedOptions = {}): Promise<VueWrapper> {
    return await mountSuspended(QuestionThemesPage, {
      ...options,
    });
  }

  beforeEach(async () => {
    wrapper = await mountQuestionThemesPage();
  });

  it("should render the question themes page when mounted.", async () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should define page metadata when mounted.", async () => {
    const expectedPageMeta: Parameters<typeof definePageMeta>[0] = {
      "icon": "i-lucide-palette",
      "titleKey": "questionThemes.pageTitle",
    };

    expect(definePageMetaMock).toHaveBeenCalledExactlyOnceWith(expectedPageMeta);
  });
});
