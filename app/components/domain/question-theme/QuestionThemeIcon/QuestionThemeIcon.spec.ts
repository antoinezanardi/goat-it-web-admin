import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { UIcon } from "#components";
import { QuestionThemeIcon } from "#components";

import type { QuestionThemeIconProperties } from "~/components/domain/question-theme/QuestionThemeIcon/question-theme-icon.types";
import { QUESTION_THEME_SLUG_ICON_MAP, QUESTION_THEME_UNKNOWN_ICON } from "~/composables/domain/question-theme/question-theme.constants";

describe("QuestionThemeIcon Component", () => {
  let wrapper: VueWrapper;
  const defaultQuestionThemeIconProperties: QuestionThemeIconProperties = {
    slug: "music",
  } as const;

  async function mountQuestionThemeIconComponent(options: MountSuspendedOptions<typeof QuestionThemeIcon> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemeIcon, {
      props: defaultQuestionThemeIconProperties,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionThemeIconComponent();
  });

  it("should render the question theme icon component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Icon", () => {
    it.each<{ slug: string; expectedIcon: string }>([
      { slug: "history-civilizations", expectedIcon: "i-lucide-landmark" },
      { slug: "geography-travels", expectedIcon: "i-lucide-globe" },
      { slug: "animals", expectedIcon: "i-lucide-paw-print" },
      { slug: "nature-environment", expectedIcon: "i-lucide-tree-pine" },
      { slug: "space-astronomy", expectedIcon: "i-lucide-rocket" },
      { slug: "society-daily-life", expectedIcon: "i-lucide-users" },
      { slug: "body-health", expectedIcon: "i-lucide-heart-pulse" },
      { slug: "gastronomy", expectedIcon: "i-lucide-chef-hat" },
      { slug: "miscellaneous-facts", expectedIcon: "i-lucide-newspaper" },
      { slug: "music", expectedIcon: "i-lucide-music" },
      { slug: "cinema-series", expectedIcon: "i-lucide-clapperboard" },
      { slug: "leisure-games", expectedIcon: "i-lucide-dice-5" },
      { slug: "sports-exploits", expectedIcon: "i-lucide-trophy" },
      { slug: "books-fine-arts", expectedIcon: "i-lucide-book-open" },
      { slug: "sciences-innovations", expectedIcon: "i-lucide-flask-conical" },
      { slug: "language-words", expectedIcon: "i-lucide-message-circle" },
      { slug: "beliefs-myths", expectedIcon: "i-lucide-sparkles" },
    ])("should render the icon $expectedIcon when the slug is $slug.", async({ slug, expectedIcon }) => {
      wrapper = await mountQuestionThemeIconComponent({ props: { slug } });

      const iconComponent = wrapper.getComponent<typeof UIcon>({ name: "UIcon" });

      expect(iconComponent.props("name")).toBe(expectedIcon);
    });

    it("should render the unknown icon when the slug is not in the map.", async() => {
      wrapper = await mountQuestionThemeIconComponent({ props: { slug: "unknown-slug" } });

      const iconComponent = wrapper.getComponent<typeof UIcon>({ name: "UIcon" });

      expect(iconComponent.props("name")).toBe(QUESTION_THEME_UNKNOWN_ICON);
    });

    it(`should have exactly ${Object.keys(QUESTION_THEME_SLUG_ICON_MAP).length} entries in the slug icon map.`, () => {
      expect(Object.keys(QUESTION_THEME_SLUG_ICON_MAP)).toHaveLength(17);
    });
  });
});