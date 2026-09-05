import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import type { QuestionCognitiveDifficulty } from "@goat-it/schemas/question";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { UBadge } from "#components";
import { QuestionCognitiveDifficultyBadge } from "#components";

import type { QuestionCognitiveDifficultyBadgeProps } from "~/components/domain/question/QuestionCognitiveDifficultyBadge/question-cognitive-difficulty-badge.types";

describe("QuestionCognitiveDifficultyBadge Component", () => {
  let wrapper: VueWrapper;
  const defaultQuestionCognitiveDifficultyBadgeProps: QuestionCognitiveDifficultyBadgeProps = {
    difficulty: "easy",
  } as const;

  async function mountQuestionCognitiveDifficultyBadgeComponent(options: MountSuspendedOptions<typeof QuestionCognitiveDifficultyBadge> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionCognitiveDifficultyBadge, {
      props: defaultQuestionCognitiveDifficultyBadgeProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionCognitiveDifficultyBadgeComponent();
  });

  it("should render the question cognitive difficulty badge component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Badge", () => {
    describe("Label", () => {
      it.each<{ difficulty: QuestionCognitiveDifficulty; expectedLabel: string }>([
        { difficulty: "easy", expectedLabel: "questions.difficulty.easy" },
        { difficulty: "medium", expectedLabel: "questions.difficulty.medium" },
        { difficulty: "hard", expectedLabel: "questions.difficulty.hard" },
      ])("should pass the $expectedLabel i18n key as label to the badge component when difficulty is $difficulty.", async({ difficulty, expectedLabel }) => {
        await wrapper.setProps({ difficulty });

        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("label")).toBe(expectedLabel);
      });
    });

    describe("Color", () => {
      it.each<{ difficulty: QuestionCognitiveDifficulty; expectedColor: string }>([
        { difficulty: "easy", expectedColor: "success" },
        { difficulty: "medium", expectedColor: "warning" },
        { difficulty: "hard", expectedColor: "error" },
      ])("should use the $expectedColor color for the badge component when difficulty is $difficulty.", async({ difficulty, expectedColor }) => {
        await wrapper.setProps({ difficulty });

        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("color")).toBe(expectedColor);
      });
    });

    describe("Icon", () => {
      it.each<{ difficulty: QuestionCognitiveDifficulty; expectedIcon: string }>([
        { difficulty: "easy", expectedIcon: "i-lucide-brain" },
        { difficulty: "medium", expectedIcon: "i-lucide-brain-cog" },
        { difficulty: "hard", expectedIcon: "i-lucide-brain-circuit" },
      ])("should use the $expectedIcon icon for the badge component when difficulty is $difficulty.", async({ difficulty, expectedIcon }) => {
        await wrapper.setProps({ difficulty });

        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("icon")).toBe(expectedIcon);
      });
    });
  });
});