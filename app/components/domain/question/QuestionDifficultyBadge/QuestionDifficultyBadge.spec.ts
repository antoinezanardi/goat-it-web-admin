import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { UBadge } from "#components";
import { QuestionDifficultyBadge } from "#components";

import type { QuestionDifficultyBadgeProperties } from "~/components/domain/question/QuestionDifficultyBadge/question-difficulty-badge.types";

describe("QuestionDifficultyBadge Component", () => {
  let wrapper: VueWrapper;
  const defaultQuestionDifficultyBadgeProperties: QuestionDifficultyBadgeProperties = {
    difficulty: "easy",
  } as const;

  async function mountQuestionDifficultyBadgeComponent(options: MountSuspendedOptions<typeof QuestionDifficultyBadge> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionDifficultyBadge, {
      props: defaultQuestionDifficultyBadgeProperties,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionDifficultyBadgeComponent();
  });

  it("should render the question difficulty badge component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Badge", () => {
    describe("Label", () => {
      it("should pass the easy difficulty i18n key as label to the badge component when difficulty is easy.", () => {
        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("label")).toBe("questions.difficulty.easy");
      });

      it("should pass the medium difficulty i18n key as label to the badge component when difficulty is medium.", async() => {
        await wrapper.setProps({ difficulty: "medium" });

        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("label")).toBe("questions.difficulty.medium");
      });

      it("should pass the hard difficulty i18n key as label to the badge component when difficulty is hard.", async() => {
        await wrapper.setProps({ difficulty: "hard" });

        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("label")).toBe("questions.difficulty.hard");
      });
    });

    describe("Color", () => {
      it("should use the success color for the badge component when difficulty is easy.", () => {
        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("color")).toBe("success");
      });

      it("should use the warning color for the badge component when difficulty is medium.", async() => {
        await wrapper.setProps({ difficulty: "medium" });

        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("color")).toBe("warning");
      });

      it("should use the error color for the badge component when difficulty is hard.", async() => {
        await wrapper.setProps({ difficulty: "hard" });

        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("color")).toBe("error");
      });
    });

    describe("Icon", () => {
      it("should use the brain icon for the badge component when difficulty is easy.", () => {
        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("icon")).toBe("i-lucide-brain");
      });

      it("should use the brain-cog icon for the badge component when difficulty is medium.", async() => {
        await wrapper.setProps({ difficulty: "medium" });

        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("icon")).toBe("i-lucide-brain-cog");
      });

      it("should use the brain-circuit icon for the badge component when difficulty is hard.", async() => {
        await wrapper.setProps({ difficulty: "hard" });

        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("icon")).toBe("i-lucide-brain-circuit");
      });
    });
  });
});