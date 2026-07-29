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

      it.each([
        { category: "lexicon", expectedLabel: "questions.category.lexicon" },
        { category: "riddle", expectedLabel: "questions.category.riddle" },
        { category: "explanation", expectedLabel: "questions.category.explanation" },
      ])("should pass the $expectedLabel i18n key as label to the badge component when category is $category.", async({ category, expectedLabel }) => {
        await wrapper.setProps({ category });

        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("label")).toBe(expectedLabel);
      });
    });

    describe("Color", () => {
      it("should use the secondary color for the badge component when category is trivia.", () => {
        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("color")).toBe("secondary");
      });

      it.each([
        { category: "lexicon", expectedColor: "primary" },
        { category: "riddle", expectedColor: "warning" },
        { category: "explanation", expectedColor: "info" },
      ])("should use the $expectedColor color for the badge component when category is $category.", async({ category, expectedColor }) => {
        await wrapper.setProps({ category });

        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("color")).toBe(expectedColor);
      });
    });

    describe("Icon", () => {
      it("should use the lightbulb icon for the badge component when category is trivia.", () => {
        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("icon")).toBe("i-lucide-lightbulb");
      });

      it.each([
        { category: "lexicon", expectedIcon: "i-lucide-book-open" },
        { category: "riddle", expectedIcon: "i-lucide-puzzle" },
        { category: "explanation", expectedIcon: "i-lucide-message-circle" },
      ])("should use the $expectedIcon icon for the badge component when category is $category.", async({ category, expectedIcon }) => {
        await wrapper.setProps({ category });

        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("icon")).toBe(expectedIcon);
      });
    });
  });
});