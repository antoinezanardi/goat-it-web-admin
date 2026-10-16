import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { QuestionsTableFullyTranslatedFilter } from "#components";

import type { QuestionsTableFullyTranslatedFilterProps } from "~/components/domain/question/QuestionsTable/QuestionsTableHeader/QuestionsTableFullyTranslatedFilter/questions-table-fully-translated-filter.types";

describe("QuestionsTableFullyTranslatedFilter Component", () => {
  const defaultProps: QuestionsTableFullyTranslatedFilterProps = { modelValue: undefined } as const;
  let wrapper: VueWrapper;

  async function mountQuestionsTableFullyTranslatedFilterComponent(options: MountSuspendedOptions<typeof QuestionsTableFullyTranslatedFilter> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionsTableFullyTranslatedFilter, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionsTableFullyTranslatedFilterComponent();
  });

  it("should render the questions table fully translated filter component when mounted.", () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe("Boolean filter select", () => {
    it("should render the boolean filter select root element with the questions fully translated test id when mounted.", () => {
      expect(wrapper.attributes("data-testid")).toBe("questions-table-fully-translated-filter");
    });

    it("should render the boolean filter select with the fully translated label when mounted.", () => {
      const filterSelect = wrapper.findComponent({ name: "BooleanFilterSelect" });

      expect(filterSelect.props("label")).toBe("localization.fullyTranslated");
    });

    it("should pass undefined as modelValue to the boolean filter select when no value is selected.", () => {
      const filterSelect = wrapper.findComponent({ name: "BooleanFilterSelect" });

      expect(filterSelect.props("modelValue")).toBeUndefined();
    });

    it("should pass the selected value as modelValue to the boolean filter select when a value is selected.", async() => {
      wrapper = await mountQuestionsTableFullyTranslatedFilterComponent({ props: { modelValue: true } });
      const filterSelect = wrapper.findComponent({ name: "BooleanFilterSelect" });

      expect(filterSelect.props("modelValue")).toBe(true);
    });

    it("should emit update:modelValue when the boolean filter select value changes.", () => {
      const filterSelect = wrapper.findComponent({ name: "BooleanFilterSelect" });

      getWrapperVm(filterSelect).$emit("update:modelValue", false);

      expect(wrapper.emitted("update:modelValue")).toStrictEqual([[false]]);
    });
  });
});