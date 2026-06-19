import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { UBadge } from "#components";
import { QuestionCategoryBadge } from "#components";

import type { QuestionCategoryBadgeProps } from "~/components/domain/question/QuestionCategoryBadge/question-category-badge.types";

describe("QuestionCategoryBadge Component", () => {
  let wrapper: VueWrapper;
  const defaultQuestionCategoryBadgeProps: QuestionCategoryBadgeProps = {
    category: "trivia",
  } as const;

  async function mountQuestionCategoryBadgeComponent(options: MountSuspendedOptions<typeof QuestionCategoryBadge> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionCategoryBadge, {
      props: defaultQuestionCategoryBadgeProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionCategoryBadgeComponent();
  });

  it("should render the question category badge component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Badge", () => {
    describe("Label", () => {
      it("should pass the trivia category i18n key as label to the badge component when category is trivia.", () => {
        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("label")).toBe("questions.category.trivia");
      });

      it("should pass the lexicon category i18n key as label to the badge component when category is lexicon.", async() => {
        await wrapper.setProps({ category: "lexicon" });

        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("label")).toBe("questions.category.lexicon");
      });

      it("should pass the riddle category i18n key as label to the badge component when category is riddle.", async() => {
        await wrapper.setProps({ category: "riddle" });

        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("label")).toBe("questions.category.riddle");
      });

      it("should pass the explanation category i18n key as label to the badge component when category is explanation.", async() => {
        await wrapper.setProps({ category: "explanation" });

        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("label")).toBe("questions.category.explanation");
      });
    });

    describe("Color", () => {
      it("should use the secondary color for the badge component when category is trivia.", () => {
        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("color")).toBe("secondary");
      });

      it("should use the primary color for the badge component when category is lexicon.", async() => {
        await wrapper.setProps({ category: "lexicon" });

        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("color")).toBe("primary");
      });

      it("should use the warning color for the badge component when category is riddle.", async() => {
        await wrapper.setProps({ category: "riddle" });

        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("color")).toBe("warning");
      });

      it("should use the info color for the badge component when category is explanation.", async() => {
        await wrapper.setProps({ category: "explanation" });

        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("color")).toBe("info");
      });
    });

    describe("Icon", () => {
      it("should use the lightbulb icon for the badge component when category is trivia.", () => {
        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("icon")).toBe("i-lucide-lightbulb");
      });

      it("should use the book-open icon for the badge component when category is lexicon.", async() => {
        await wrapper.setProps({ category: "lexicon" });

        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("icon")).toBe("i-lucide-book-open");
      });

      it("should use the puzzle icon for the badge component when category is riddle.", async() => {
        await wrapper.setProps({ category: "riddle" });

        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("icon")).toBe("i-lucide-puzzle");
      });

      it("should use the message-circle icon for the badge component when category is explanation.", async() => {
        await wrapper.setProps({ category: "explanation" });

        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("icon")).toBe("i-lucide-message-circle");
      });
    });
  });
});