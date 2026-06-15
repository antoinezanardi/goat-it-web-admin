import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { QuestionsTableStatusFilter } from "#components";

import type { QuestionsTableStatusFilterProps } from "~/components/domain/question/QuestionsTable/QuestionsTableHeader/QuestionsTableStatusFilter/questions-table-status-filter.types";

describe("QuestionsTableStatusFilter Component", () => {
  const defaultProps: QuestionsTableStatusFilterProps = { modelValue: undefined };
  let wrapper: VueWrapper;

  async function mountQuestionsTableStatusFilterComponent(options: MountSuspendedOptions<typeof QuestionsTableStatusFilter> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionsTableStatusFilter, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionsTableStatusFilterComponent();
  });

  it("should render the questions table status filter component when mounted.", () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe("Table Filter Select", () => {
    it("should render the table filter select with status label when mounted.", () => {
      const filterSelect = wrapper.findComponent({ name: "TableFilterSelect" });

      expect(filterSelect.props("label")).toBe("questions.fields.status");
    });

    it("should render the table filter select with all status items when mounted.", () => {
      const filterSelect = wrapper.findComponent({ name: "TableFilterSelect" });

      expect(filterSelect.props("items")).toStrictEqual([
        { label: "questions.status.pending", value: "pending" },
        { label: "questions.status.active", value: "active" },
        { label: "questions.status.archived", value: "archived" },
        { label: "questions.status.rejected", value: "rejected" },
      ]);
    });

    it("should pass undefined as modelValue to the table filter select when no status is selected.", () => {
      const filterSelect = wrapper.findComponent({ name: "TableFilterSelect" });

      expect(filterSelect.props("modelValue")).toBeUndefined();
    });

    it("should pass the selected value as modelValue to the table filter select when a status is selected.", async() => {
      wrapper = await mountQuestionsTableStatusFilterComponent({ props: { modelValue: "active" } });
      const filterSelect = wrapper.findComponent({ name: "TableFilterSelect" });

      expect(filterSelect.props("modelValue")).toBe("active");
    });

    it("should emit update:modelValue when the table filter select value changes.", () => {
      const filterSelect = wrapper.findComponent({ name: "TableFilterSelect" });

      getWrapperVm(filterSelect).$emit("update:modelValue", "archived");

      expect(wrapper.emitted("update:modelValue")).toStrictEqual([["archived"]]);
    });
  });
});