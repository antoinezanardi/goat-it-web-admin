import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";

import { QuestionThemesTableHeader } from "#components";
import type { TableGlobalFilterInput, UButton } from "#components";

import type { QuestionThemesTableHeaderProps } from "~/components/domain/question-theme/QuestionThemesTable/QuestionThemesTableHeader/question-themes-table-header.types";

describe("QuestionThemesTableHeader Component", () => {
  const defaultProps: QuestionThemesTableHeaderProps = { searchTerm: "" };
  let wrapper: VueWrapper;

  async function mountQuestionThemesTableHeaderComponent(options: MountSuspendedOptions<typeof QuestionThemesTableHeader> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemesTableHeader, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionThemesTableHeaderComponent();
  });

  it("should render the question themes table header component when mounted.", () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe("Filter input", () => {
    it("should render the filter input when mounted.", () => {
      const filterInput = wrapper.findComponent<typeof TableGlobalFilterInput>({ name: "TableGlobalFilterInput" });

      expect(filterInput.exists()).toBe(true);
    });

    it("should pass the searchTerm to the filter input when mounted.", async() => {
      wrapper = await mountQuestionThemesTableHeaderComponent({ props: { searchTerm: "search text" } });

      const filterInput = wrapper.findComponent<typeof TableGlobalFilterInput>({ name: "TableGlobalFilterInput" });

      expect(filterInput.props("modelValue")).toBe("search text");
    });

    it("should emit update:searchTerm when the filter input emits update:modelValue.", () => {
      const filterInput = wrapper.findComponent<typeof TableGlobalFilterInput>({ name: "TableGlobalFilterInput" });
      getWrapperVm(filterInput).$emit("update:modelValue", "new search");

      expect(wrapper.emitted("update:searchTerm")).toStrictEqual([["new search"]]);
    });
  });

  describe("Create button", () => {
    it("should render the create question theme button with the correct i18n key when mounted.", () => {
      const button = wrapper.find("#create-question-theme-button");

      expect(button.text()).toContain("questionThemes.createNew");
    });

    it("should render the create question theme button with the correct aria-label when mounted.", () => {
      const button = wrapper.find("#create-question-theme-button");

      expect(button.attributes("aria-label")).toBe("questionThemes.createNew");
    });

    it("should render the create question theme button with the correct icon when mounted.", () => {
      const button = wrapper.findComponent<typeof UButton>({ name: "UButton" });

      expect(button.props("icon")).toBe("i-lucide-circle-plus");
    });

    it("should emit startCreate when the create button is clicked.", async() => {
      const button = wrapper.find<HTMLButtonElement>("#create-question-theme-button");

      await button.trigger("click");

      expect(wrapper.emitted("startCreate")).toBeDefined();
    });
  });
});