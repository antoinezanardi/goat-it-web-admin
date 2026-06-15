import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { QuestionsTableCategoryFilter } from "#components";

import type { QuestionsTableCategoryFilterProps } from "~/components/domain/question/QuestionsTable/QuestionsTableHeader/QuestionsTableCategoryFilter/questions-table-category-filter.types";

describe("QuestionsTableCategoryFilter Component", () => {
  const defaultProps: QuestionsTableCategoryFilterProps = { modelValue: undefined };
  let wrapper: VueWrapper;

  async function mountQuestionsTableCategoryFilterComponent(options: MountSuspendedOptions<typeof QuestionsTableCategoryFilter> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionsTableCategoryFilter, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionsTableCategoryFilterComponent();
  });

  it("should render the questions table category filter component when mounted.", () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe("Table Filter Select", () => {
    it("should render the table filter select with category label when mounted.", () => {
      const filterSelect = wrapper.findComponent({ name: "TableFilterSelect" });

      expect(filterSelect.props("label")).toBe("questions.fields.category");
    });

    it("should render the table filter select with category items including icons when mounted.", () => {
      const filterSelect = wrapper.findComponent({ name: "TableFilterSelect" });

      expect(filterSelect.props("items")).toStrictEqual([
        { label: "questions.category.trivia", value: "trivia", icon: "i-lucide-lightbulb" },
        { label: "questions.category.lexicon", value: "lexicon", icon: "i-lucide-book-open" },
        { label: "questions.category.riddle", value: "riddle", icon: "i-lucide-puzzle" },
        { label: "questions.category.explanation", value: "explanation", icon: "i-lucide-message-circle" },
      ]);
    });

    it("should pass undefined as modelValue to the table filter select when no category is selected.", () => {
      const filterSelect = wrapper.findComponent({ name: "TableFilterSelect" });

      expect(filterSelect.props("modelValue")).toBeUndefined();
    });

    it("should pass the selected value as modelValue to the table filter select when a category is selected.", async() => {
      wrapper = await mountQuestionsTableCategoryFilterComponent({ props: { modelValue: "trivia" } });
      const filterSelect = wrapper.findComponent({ name: "TableFilterSelect" });

      expect(filterSelect.props("modelValue")).toBe("trivia");
    });

    it("should emit update:modelValue when the table filter select value changes.", () => {
      const filterSelect = wrapper.findComponent({ name: "TableFilterSelect" });

      getWrapperVm(filterSelect).$emit("update:modelValue", "lexicon");

      expect(wrapper.emitted("update:modelValue")).toStrictEqual([["lexicon"]]);
    });
  });
});