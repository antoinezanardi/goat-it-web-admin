import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { TableFilterSelect } from "#components";
import { QuestionThemesTableStatusFilter } from "#components";

import type { QuestionThemesTableStatusFilterProps } from "~/components/domain/question-theme/QuestionThemesTable/QuestionThemesTableHeader/QuestionThemesTableStatusFilter/question-themes-table-status-filter.types";

describe("QuestionThemesTableStatusFilter Component", () => {
  const defaultProps: QuestionThemesTableStatusFilterProps = { modelValue: undefined };
  let wrapper: VueWrapper;

  async function mountQuestionThemesTableStatusFilterComponent(options: MountSuspendedOptions<typeof QuestionThemesTableStatusFilter> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemesTableStatusFilter, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionThemesTableStatusFilterComponent();
  });

  it("should render the question themes table status filter component when mounted.", () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe("Table Filter Select", () => {
    it("should render the table filter select with status label when mounted.", () => {
      const filterSelect = wrapper.findComponent<typeof TableFilterSelect>("[data-testid='question-themes-table-status-filter']");

      expect(filterSelect.props("label")).toBe("questionThemes.fields.status");
    });

    it("should render the table filter select with active and archived items when mounted.", () => {
      const filterSelect = wrapper.findComponent<typeof TableFilterSelect>("[data-testid='question-themes-table-status-filter']");
      const items = filterSelect.props("items") as { label: string; value: string }[];

      expect(items).toStrictEqual([
        { label: "questionThemes.status.active", value: "active" },
        { label: "questionThemes.status.archived", value: "archived" },
      ]);
    });

    it("should pass undefined as modelValue to the table filter select when no status is selected.", () => {
      const filterSelect = wrapper.findComponent<typeof TableFilterSelect>("[data-testid='question-themes-table-status-filter']");

      expect(filterSelect.props("modelValue")).toBeUndefined();
    });

    it("should pass the selected value as modelValue to the table filter select when a status is selected.", async() => {
      wrapper = await mountQuestionThemesTableStatusFilterComponent({ props: { modelValue: "active" } });
      const filterSelect = wrapper.findComponent<typeof TableFilterSelect>("[data-testid='question-themes-table-status-filter']");

      expect(filterSelect.props("modelValue")).toBe("active");
    });

    it("should emit update:modelValue when the table filter select value changes.", () => {
      const filterSelect = wrapper.findComponent<typeof TableFilterSelect>("[data-testid='question-themes-table-status-filter']");

      getWrapperVm(filterSelect).$emit("update:modelValue", "archived");

      expect(wrapper.emitted("update:modelValue")).toStrictEqual([["archived"]]);
    });
  });
});