import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { UButton } from "#components";
import { QuestionDifficultySelector } from "#components";

import type { QuestionDifficultySelectorProperties } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionDifficultySelector/question-difficulty-selector.types";

describe("QuestionDifficultySelector Component", () => {
  let wrapper: VueWrapper;
  const defaultProperties: QuestionDifficultySelectorProperties = {
    modelValue: undefined,
  } as const;

  async function mountQuestionDifficultySelectorComponent(options: MountSuspendedOptions<typeof QuestionDifficultySelector> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionDifficultySelector, {
      props: defaultProperties,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionDifficultySelectorComponent();
  });

  it("should render the question difficulty selector component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Difficulty Buttons", () => {
    it("should render 3 difficulty buttons.", () => {
      const buttons = wrapper.findAllComponents<typeof UButton>("[data-testid^='question-difficulty-selector-']");

      expect(buttons).toHaveLength(3);
    });

    it("should pass the easy difficulty i18n key as label to the first button.", () => {
      const button = wrapper.getComponent<typeof UButton>("[data-testid='question-difficulty-selector-easy']");

      expect(button.props("label")).toBe("questions.difficulty.easy");
    });

    it("should pass the medium difficulty i18n key as label to the second button.", () => {
      const button = wrapper.getComponent<typeof UButton>("[data-testid='question-difficulty-selector-medium']");

      expect(button.props("label")).toBe("questions.difficulty.medium");
    });

    it("should pass the hard difficulty i18n key as label to the third button.", () => {
      const button = wrapper.getComponent<typeof UButton>("[data-testid='question-difficulty-selector-hard']");

      expect(button.props("label")).toBe("questions.difficulty.hard");
    });

    describe("Colors", () => {
      it("should use neutral color for all buttons when no difficulty is selected.", () => {
        const easyButton = wrapper.getComponent<typeof UButton>("[data-testid='question-difficulty-selector-easy']");
        const mediumButton = wrapper.getComponent<typeof UButton>("[data-testid='question-difficulty-selector-medium']");
        const hardButton = wrapper.getComponent<typeof UButton>("[data-testid='question-difficulty-selector-hard']");

        expect(easyButton.props("color")).toBe("neutral");
        expect(mediumButton.props("color")).toBe("neutral");
        expect(hardButton.props("color")).toBe("neutral");
      });

      it("should use success color for easy button when easy is selected.", async() => {
        wrapper = await mountQuestionDifficultySelectorComponent({ props: { modelValue: "easy" } });

        const easyButton = wrapper.getComponent<typeof UButton>("[data-testid='question-difficulty-selector-easy']");

        expect(easyButton.props("color")).toBe("success");
      });

      it("should use warning color for medium button when medium is selected.", async() => {
        wrapper = await mountQuestionDifficultySelectorComponent({ props: { modelValue: "medium" } });

        const mediumButton = wrapper.getComponent<typeof UButton>("[data-testid='question-difficulty-selector-medium']");

        expect(mediumButton.props("color")).toBe("warning");
      });

      it("should use error color for hard button when hard is selected.", async() => {
        wrapper = await mountQuestionDifficultySelectorComponent({ props: { modelValue: "hard" } });

        const hardButton = wrapper.getComponent<typeof UButton>("[data-testid='question-difficulty-selector-hard']");

        expect(hardButton.props("color")).toBe("error");
      });
    });

    describe("Variants", () => {
      it("should use outline variant for all buttons when no difficulty is selected.", () => {
        const easyButton = wrapper.getComponent<typeof UButton>("[data-testid='question-difficulty-selector-easy']");
        const mediumButton = wrapper.getComponent<typeof UButton>("[data-testid='question-difficulty-selector-medium']");
        const hardButton = wrapper.getComponent<typeof UButton>("[data-testid='question-difficulty-selector-hard']");

        expect(easyButton.props("variant")).toBe("outline");
        expect(mediumButton.props("variant")).toBe("outline");
        expect(hardButton.props("variant")).toBe("outline");
      });

      it("should use solid variant for easy button when easy is selected.", async() => {
        wrapper = await mountQuestionDifficultySelectorComponent({ props: { modelValue: "easy" } });

        const easyButton = wrapper.getComponent<typeof UButton>("[data-testid='question-difficulty-selector-easy']");

        expect(easyButton.props("variant")).toBe("solid");
      });

      it("should use outline variant for non-selected buttons when easy is selected.", async() => {
        wrapper = await mountQuestionDifficultySelectorComponent({ props: { modelValue: "easy" } });

        const mediumButton = wrapper.getComponent<typeof UButton>("[data-testid='question-difficulty-selector-medium']");
        const hardButton = wrapper.getComponent<typeof UButton>("[data-testid='question-difficulty-selector-hard']");

        expect(mediumButton.props("variant")).toBe("outline");
        expect(hardButton.props("variant")).toBe("outline");
      });
    });

    describe("Emits", () => {
      it("should emit update:modelValue with easy when easy button is clicked.", async() => {
        const easyButton = wrapper.getComponent<typeof UButton>("[data-testid='question-difficulty-selector-easy']");

        await easyButton.trigger("click");

        expect(wrapper.emitted("update:modelValue")).toStrictEqual([["easy"]]);
      });

      it("should emit update:modelValue with medium when medium button is clicked.", async() => {
        const mediumButton = wrapper.getComponent<typeof UButton>("[data-testid='question-difficulty-selector-medium']");

        await mediumButton.trigger("click");

        expect(wrapper.emitted("update:modelValue")).toStrictEqual([["medium"]]);
      });

      it("should emit update:modelValue with hard when hard button is clicked.", async() => {
        const hardButton = wrapper.getComponent<typeof UButton>("[data-testid='question-difficulty-selector-hard']");

        await hardButton.trigger("click");

        expect(wrapper.emitted("update:modelValue")).toStrictEqual([["hard"]]);
      });
    });
  });
});