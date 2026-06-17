import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import { createFakeTableFilterSelectItem } from "~~/tests/unit/utils/faketories/shared/table-filter-select/table-filter-select-item.faketory";

import { QuestionsTableCognitiveDifficultyFilter } from "#components";

import type { QuestionsTableCognitiveDifficultyFilterProps } from "~/components/domain/question/QuestionsTable/QuestionsTableHeader/QuestionsTableCognitiveDifficultyFilter/questions-table-cognitive-difficulty-filter.types";

describe("QuestionsTableCognitiveDifficultyFilter Component", () => {
  const defaultProps: QuestionsTableCognitiveDifficultyFilterProps = { modelValue: undefined };
  let wrapper: VueWrapper;

  async function mountQuestionsTableCognitiveDifficultyFilterComponent(options: MountSuspendedOptions<typeof QuestionsTableCognitiveDifficultyFilter> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionsTableCognitiveDifficultyFilter, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionsTableCognitiveDifficultyFilterComponent();
  });

  it("should render the questions table cognitive difficulty filter component when mounted.", () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe("Table Filter Select", () => {
    it("should render the table filter select with cognitive difficulty label when mounted.", () => {
      const filterSelect = wrapper.findComponent({ name: "TableFilterSelect" });

      expect(filterSelect.props("label")).toBe("questions.fields.cognitiveDifficulty");
    });

    it("should render the table filter select with cognitive difficulty items including icons when mounted.", () => {
      const filterSelect = wrapper.findComponent({ name: "TableFilterSelect" });

      expect(filterSelect.props("items")).toStrictEqual([
        createFakeTableFilterSelectItem({ label: "questions.difficulty.easy", value: "easy", icon: "i-lucide-brain" }),
        createFakeTableFilterSelectItem({ label: "questions.difficulty.medium", value: "medium", icon: "i-lucide-brain-cog" }),
        createFakeTableFilterSelectItem({ label: "questions.difficulty.hard", value: "hard", icon: "i-lucide-brain-circuit" }),
      ]);
    });

    it("should pass undefined as modelValue to the table filter select when no cognitive difficulty is selected.", () => {
      const filterSelect = wrapper.findComponent({ name: "TableFilterSelect" });

      expect(filterSelect.props("modelValue")).toBeUndefined();
    });

    it("should pass the selected value as modelValue to the table filter select when a cognitive difficulty is selected.", async() => {
      wrapper = await mountQuestionsTableCognitiveDifficultyFilterComponent({ props: { modelValue: "easy" } });
      const filterSelect = wrapper.findComponent({ name: "TableFilterSelect" });

      expect(filterSelect.props("modelValue")).toBe("easy");
    });

    it("should emit update:modelValue when the table filter select value changes.", () => {
      const filterSelect = wrapper.findComponent({ name: "TableFilterSelect" });

      getWrapperVm(filterSelect).$emit("update:modelValue", "hard");

      expect(wrapper.emitted("update:modelValue")).toStrictEqual([["hard"]]);
    });
  });
});