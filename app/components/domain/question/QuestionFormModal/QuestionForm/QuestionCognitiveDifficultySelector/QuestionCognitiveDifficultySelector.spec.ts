import type { QuestionCognitiveDifficulty } from "@goat-it/schemas/question";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { UButton } from "#components";
import { QuestionCognitiveDifficultySelector } from "#components";

import type { QuestionCognitiveDifficultySelectorProps } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionCognitiveDifficultySelector/question-cognitive-difficulty-selector.types";

describe("QuestionCognitiveDifficultySelector Component", () => {
  let wrapper: VueWrapper;
  const defaultQuestionCognitiveDifficultySelectorProps: QuestionCognitiveDifficultySelectorProps = {
    modelValue: undefined,
  } as const;

  async function mountQuestionCognitiveDifficultySelectorComponent(options: MountSuspendedOptions<typeof QuestionCognitiveDifficultySelector> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionCognitiveDifficultySelector, {
      props: defaultQuestionCognitiveDifficultySelectorProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionCognitiveDifficultySelectorComponent();
  });

  it("should render the question cognitive difficulty selector component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Difficulty Buttons", () => {
    it("should render 3 difficulty buttons when mounted.", () => {
      const buttons = wrapper.findAllComponents<typeof UButton>("[data-testid^='question-difficulty-selector-']");

      expect(buttons).toHaveLength(3);
    });

    it.each<{
      difficulty: QuestionCognitiveDifficulty;
      expectedLabel: string;
    }>([
      {
        difficulty: "easy",
        expectedLabel: "questions.difficulty.easy",
      },
      {
        difficulty: "medium",
        expectedLabel: "questions.difficulty.medium",
      },
      {
        difficulty: "hard",
        expectedLabel: "questions.difficulty.hard",
      },
    ])("should pass the $difficulty difficulty i18n key as label when button is rendered.", ({
      difficulty,
      expectedLabel,
    }) => {
      const button = wrapper.getComponent<typeof UButton>(`[data-testid='question-difficulty-selector-${difficulty}']`);

      expect(button.props("label")).toBe(expectedLabel);
    });

    describe("Icons", () => {
      it.each<{
        difficulty: QuestionCognitiveDifficulty;
        expectedIcon: string;
      }>([
        {
          difficulty: "easy",
          expectedIcon: "i-lucide-brain",
        },
        {
          difficulty: "medium",
          expectedIcon: "i-lucide-brain-cog",
        },
        {
          difficulty: "hard",
          expectedIcon: "i-lucide-brain-circuit",
        },
      ])("should pass the $expectedIcon icon for $difficulty button when mounted.", ({
        difficulty,
        expectedIcon,
      }) => {
        const button = wrapper.getComponent<typeof UButton>(`[data-testid='question-difficulty-selector-${difficulty}']`);

        expect(button.props("icon")).toBe(expectedIcon);
      });
    });

    describe("Colors", () => {
      it.each<{ difficulty: QuestionCognitiveDifficulty }>([
        { difficulty: "easy" },
        { difficulty: "medium" },
        { difficulty: "hard" },
      ])("should use neutral color for $difficulty button when no difficulty is selected.", ({ difficulty }) => {
        const button = wrapper.getComponent<typeof UButton>(`[data-testid='question-difficulty-selector-${difficulty}']`);

        expect(button.props("color")).toBe("neutral");
      });

      it.each<{
        difficulty: QuestionCognitiveDifficulty;
        expectedColor: string;
      }>([
        {
          difficulty: "easy",
          expectedColor: "success",
        },
        {
          difficulty: "medium",
          expectedColor: "warning",
        },
        {
          difficulty: "hard",
          expectedColor: "error",
        },
      ])("should use $expectedColor color for $difficulty button when $difficulty is selected.", async({
        difficulty,
        expectedColor,
      }) => {
        wrapper = await mountQuestionCognitiveDifficultySelectorComponent({ props: { modelValue: difficulty } });

        const button = wrapper.getComponent<typeof UButton>(`[data-testid='question-difficulty-selector-${difficulty}']`);

        expect(button.props("color")).toBe(expectedColor);
      });
    });

    describe("Variants", () => {
      it.each<{ difficulty: QuestionCognitiveDifficulty }>([
        { difficulty: "easy" },
        { difficulty: "medium" },
        { difficulty: "hard" },
      ])("should use outline variant for $difficulty button when no difficulty is selected.", ({ difficulty }) => {
        const button = wrapper.getComponent<typeof UButton>(`[data-testid='question-difficulty-selector-${difficulty}']`);

        expect(button.props("variant")).toBe("outline");
      });

      it.each<{ difficulty: QuestionCognitiveDifficulty }>([
        { difficulty: "easy" },
        { difficulty: "medium" },
        { difficulty: "hard" },
      ])("should use solid variant for $difficulty button when $difficulty is selected.", async({ difficulty }) => {
        wrapper = await mountQuestionCognitiveDifficultySelectorComponent({ props: { modelValue: difficulty } });

        const button = wrapper.getComponent<typeof UButton>(`[data-testid='question-difficulty-selector-${difficulty}']`);

        expect(button.props("variant")).toBe("solid");
      });

      it.each<{ otherDifficulty: "medium" | "hard" }>([
        { otherDifficulty: "medium" },
        { otherDifficulty: "hard" },
      ])("should use outline variant for $otherDifficulty button when easy is selected.", async({ otherDifficulty }) => {
        wrapper = await mountQuestionCognitiveDifficultySelectorComponent({ props: { modelValue: "easy" } });

        const button = wrapper.getComponent<typeof UButton>(`[data-testid='question-difficulty-selector-${otherDifficulty}']`);

        expect(button.props("variant")).toBe("outline");
      });
    });

    describe("Emits", () => {
      it.each<{ difficulty: QuestionCognitiveDifficulty }>([
        { difficulty: "easy" },
        { difficulty: "medium" },
        { difficulty: "hard" },
      ])("should emit update:modelValue with $difficulty when $difficulty button is clicked.", async({ difficulty }) => {
        const button = wrapper.getComponent<typeof UButton>(`[data-testid='question-difficulty-selector-${difficulty}']`);

        await button.trigger("click");

        expect(wrapper.emitted("update:modelValue")).toStrictEqual([[difficulty]]);
      });
    });
  });
});