import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { QuestionsTableAdultContentFilter } from "#components";

import type { QuestionsTableAdultContentFilterProps } from "~/components/domain/question/QuestionsTable/QuestionsTableHeader/QuestionsTableAdultContentFilter/questions-table-adult-content-filter.types";

describe("QuestionsTableAdultContentFilter Component", () => {
  const defaultProps: QuestionsTableAdultContentFilterProps = { modelValue: undefined } as const;
  let wrapper: VueWrapper;

  async function mountQuestionsTableAdultContentFilterComponent(options: MountSuspendedOptions<typeof QuestionsTableAdultContentFilter> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionsTableAdultContentFilter, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionsTableAdultContentFilterComponent();
  });

  it("should render the questions table adult content filter component when mounted.", () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe("Boolean filter select", () => {
    it("should render the boolean filter select root element with the questions adult content test id when mounted.", () => {
      expect(wrapper.attributes("data-testid")).toBe("questions-table-adult-content-filter");
    });

    it("should render the boolean filter select with the adult content label when mounted.", () => {
      const filterSelect = wrapper.findComponent({ name: "BooleanFilterSelect" });

      expect(filterSelect.props("label")).toBe("questions.fields.isAdultContent");
    });

    it("should pass undefined as modelValue to the boolean filter select when no value is selected.", () => {
      const filterSelect = wrapper.findComponent({ name: "BooleanFilterSelect" });

      expect(filterSelect.props("modelValue")).toBeUndefined();
    });

    it("should pass the selected value as modelValue to the boolean filter select when a value is selected.", async() => {
      wrapper = await mountQuestionsTableAdultContentFilterComponent({ props: { modelValue: false } });
      const filterSelect = wrapper.findComponent({ name: "BooleanFilterSelect" });

      expect(filterSelect.props("modelValue")).toBe(false);
    });

    it("should emit update:modelValue when the boolean filter select value changes.", () => {
      const filterSelect = wrapper.findComponent({ name: "BooleanFilterSelect" });

      getWrapperVm(filterSelect).$emit("update:modelValue", true);

      expect(wrapper.emitted("update:modelValue")).toStrictEqual([[true]]);
    });
  });
});