import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { USelect } from "#components";
import { QuestionCategorySelector } from "#components";

import type { QuestionCategorySelectorProps } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionCategorySelector/question-category-selector.types";

describe("QuestionCategorySelector Component", () => {
  let wrapper: VueWrapper;
  const defaultQuestionCategorySelectorProps: QuestionCategorySelectorProps = {
    modelValue: undefined,
  } as const;

  async function mountQuestionCategorySelectorComponent(options: MountSuspendedOptions<typeof QuestionCategorySelector> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionCategorySelector, {
      props: defaultQuestionCategorySelectorProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionCategorySelectorComponent();
  });

  it("should render the question category selector component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Select", () => {
    it("should pass the category placeholder as placeholder to the select component when mounted.", () => {
      const select = wrapper.findComponent<typeof USelect>({ name: "USelect" });

      expect(select.props("placeholder")).toBe("questions.selectCategory");
    });

    it("should pass 4 category items to the select component when mounted.", () => {
      const select = wrapper.findComponent<typeof USelect>({ name: "USelect" });
      const items = select.props("items") as { value: string; label: string; icon: string }[];

      expect(items).toHaveLength(4);
    });

    it.each<{ index: number; value: string; label: string; icon: string }>([
      { index: 0, value: "trivia", label: "questions.category.trivia", icon: "i-lucide-lightbulb" },
      { index: 1, value: "lexicon", label: "questions.category.lexicon", icon: "i-lucide-book-open" },
      { index: 2, value: "riddle", label: "questions.category.riddle", icon: "i-lucide-puzzle" },
      { index: 3, value: "explanation", label: "questions.category.explanation", icon: "i-lucide-message-circle" },
    ])("should pass $value as item with correct icon and label key when items are rendered.", ({ index, value, label, icon }) => {
      const select = wrapper.findComponent<typeof USelect>({ name: "USelect" });
      const items = select.props("items") as { value: string; label: string; icon: string }[];

      expect(items[index]).toStrictEqual({ value, label, icon });
    });

    it("should pass undefined as model value to the select component when no category is selected.", () => {
      const select = wrapper.findComponent<typeof USelect>({ name: "USelect" });

      expect(select.props("modelValue")).toBeUndefined();
    });

    it("should pass the selected category as model value to the select component when a category is selected.", async() => {
      wrapper = await mountQuestionCategorySelectorComponent({ props: { modelValue: "trivia" } });

      const select = wrapper.findComponent<typeof USelect>({ name: "USelect" });

      expect(select.props("modelValue")).toBe("trivia");
    });

    it("should not pass an icon to the select component when no category is selected.", () => {
      const select = wrapper.findComponent<typeof USelect>({ name: "USelect" });

      expect(select.props("icon")).toBeUndefined();
    });

    it("should pass the selected category icon to the select component when a category is selected.", async() => {
      wrapper = await mountQuestionCategorySelectorComponent({ props: { modelValue: "trivia" } });

      const select = wrapper.findComponent<typeof USelect>({ name: "USelect" });

      expect(select.props("icon")).toBe("i-lucide-lightbulb");
    });

    describe("Emits", () => {
      it("should emit update:modelValue when the select value changes.", () => {
        const select = wrapper.findComponent<typeof USelect>({ name: "USelect" });

        getWrapperVm(select).$emit("update:modelValue", "lexicon");

        expect(wrapper.emitted("update:modelValue")).toStrictEqual([["lexicon"]]);
      });
    });
  });
});