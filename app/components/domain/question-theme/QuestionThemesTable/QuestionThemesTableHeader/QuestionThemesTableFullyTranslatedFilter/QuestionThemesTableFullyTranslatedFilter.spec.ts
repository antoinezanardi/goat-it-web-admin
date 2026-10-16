import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { QuestionThemesTableFullyTranslatedFilter } from "#components";

import type { QuestionThemesTableFullyTranslatedFilterProps } from "~/components/domain/question-theme/QuestionThemesTable/QuestionThemesTableHeader/QuestionThemesTableFullyTranslatedFilter/question-themes-table-fully-translated-filter.types";

describe("QuestionThemesTableFullyTranslatedFilter Component", () => {
  const defaultProps: QuestionThemesTableFullyTranslatedFilterProps = { modelValue: undefined } as const;
  let wrapper: VueWrapper;

  async function mountQuestionThemesTableFullyTranslatedFilterComponent(options: MountSuspendedOptions<typeof QuestionThemesTableFullyTranslatedFilter> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemesTableFullyTranslatedFilter, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionThemesTableFullyTranslatedFilterComponent();
  });

  it("should render the question themes table fully translated filter component when mounted.", () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe("Boolean filter select", () => {
    it("should render the boolean filter select root element with the question themes fully translated test id when mounted.", () => {
      expect(wrapper.attributes("data-testid")).toBe("question-themes-table-fully-translated-filter");
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
      wrapper = await mountQuestionThemesTableFullyTranslatedFilterComponent({ props: { modelValue: true } });
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