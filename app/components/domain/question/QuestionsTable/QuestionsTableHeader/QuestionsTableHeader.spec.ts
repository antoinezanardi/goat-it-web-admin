import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { QuestionsTableHeader } from "#components";
import type { TableGlobalFilterInput } from "#components";

import type { QuestionsTableHeaderProps } from "~/components/domain/question/QuestionsTable/QuestionsTableHeader/questions-table-header.types";

describe("QuestionsTableHeader Component", () => {
  let wrapper: VueWrapper;
  const defaultProps: QuestionsTableHeaderProps = {
    searchTerm: "",
  };

  async function mountQuestionsTableHeaderComponent(options: MountSuspendedOptions<typeof QuestionsTableHeader> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionsTableHeader, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionsTableHeaderComponent();
  });

  it("should render the questions table header component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Filter input", () => {
    it("should render the filter input when mounted.", () => {
      const filterInput = wrapper.findComponent<typeof TableGlobalFilterInput>({ name: "TableGlobalFilterInput" });

      expect(filterInput.exists()).toBeTruthy();
    });

    it("should pass the searchTerm to the filter input when mounted.", async() => {
      wrapper = await mountQuestionsTableHeaderComponent({ props: { searchTerm: "search text" } });

      const filterInput = wrapper.findComponent<typeof TableGlobalFilterInput>({ name: "TableGlobalFilterInput" });

      expect(filterInput.props("modelValue")).toBe("search text");
    });

    it("should emit update:searchTerm when the filter input emits update:modelValue.", () => {
      const filterInput = wrapper.findComponent<typeof TableGlobalFilterInput>({ name: "TableGlobalFilterInput" });
      getWrapperVm(filterInput).$emit("update:modelValue", "new search");

      expect(wrapper.emitted("update:searchTerm")).toStrictEqual([["new search"]]);
    });
  });

  describe("Create question button", () => {
    it("should render the create question button when mounted.", () => {
      const button = wrapper.find("[data-testid='create-question-button']");

      expect(button.exists()).toBeTruthy();
    });

    it("should render the create question button with the correct aria-label when mounted.", () => {
      const button = wrapper.find("[data-testid='create-question-button']");

      expect(button.attributes("aria-label")).toBe("questions.createNew");
    });

    it("should emit startCreate when the create question button is clicked.", async() => {
      const button = wrapper.find("[data-testid='create-question-button']");
      await button.trigger("click");

      expect(wrapper.emitted("startCreate")).toStrictEqual([[]]);
    });
  });
});