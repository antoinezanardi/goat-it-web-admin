import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { UIcon } from "#components";
import { QuestionThemeIcon } from "#components";

import { QUESTION_THEME_UNKNOWN_ICON } from "~/composables/domain/question-theme/constants/question-theme.constants";
import type { QuestionThemeIconProps } from "~/components/domain/question-theme/QuestionThemeIcon/question-theme-icon.types";

describe("QuestionThemeIcon Component", () => {
  let wrapper: VueWrapper;
  const defaultQuestionThemeIconProps: QuestionThemeIconProps = {
    slug: "music",
  } as const;

  async function mountQuestionThemeIconComponent(options: MountSuspendedOptions<typeof QuestionThemeIcon> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemeIcon, {
      props: defaultQuestionThemeIconProps,
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
  });

  describe("Size", () => {
    it("should not pass a size to the icon component when the size prop is not provided.", () => {
      const iconComponent = wrapper.getComponent<typeof UIcon>({ name: "UIcon" });

      expect(iconComponent.props("size")).toBeUndefined();
    });

    it("should pass the size to the icon component when the size prop is provided.", async() => {
      wrapper = await mountQuestionThemeIconComponent({ props: { slug: "music", size: 24 } });

      const iconComponent = wrapper.getComponent<typeof UIcon>({ name: "UIcon" });

      expect(iconComponent.props("size")).toBe(24);
    });
  });

  describe("Color container", () => {
    it("should render the icon inside a container element when mounted.", () => {
      const container = wrapper.find("[data-testid='question-theme-icon-container-music']");

      expect(container.exists()).toBeTruthy();
    });

    it("should apply border color style on the container when color is provided.", async() => {
      wrapper = await mountQuestionThemeIconComponent({ props: { slug: "music", color: "#FF0000" } });

      const container = wrapper.find("[data-testid='question-theme-icon-container-music']");

      expect(container.attributes("style")).toContain("border-color");
    });

    it("should apply color style on the container when color is provided.", async() => {
      wrapper = await mountQuestionThemeIconComponent({ props: { slug: "music", color: "#FF0000" } });

      const container = wrapper.find("[data-testid='question-theme-icon-container-music']");

      expect(container.attributes("style")).toMatch(/(?:^|;\s*)color:\s*#[\dA-Fa-f]{6}(?:;|$)/u);
    });

    it("should render the container with neutral styling when no color is provided.", () => {
      const container = wrapper.find("[data-testid='question-theme-icon-container-music']");

      expect(container.attributes("style")).toContain("border-color");
    });
  });
});