import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { QuestionThemesTableHeader } from "#components";

describe("QuestionThemesTableHeader Component", () => {
  let wrapper: VueWrapper;

  async function mountQuestionThemesTableHeaderComponent(options: MountSuspendedOptions<typeof QuestionThemesTableHeader> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemesTableHeader, {
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionThemesTableHeaderComponent();
  });

  it("should render the question themes table header component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Create button", () => {
    it("should render the create question theme button with the correct i18n key when mounted.", () => {
      const button = wrapper.findComponent({ name: "UButton" });

      expect(button.props("label")).toBe("questionThemes.createNew");
    });

    it("should render the create question theme button with the correct icon when mounted.", () => {
      const button = wrapper.findComponent({ name: "UButton" });

      expect(button.props("icon")).toBe("i-lucide-circle-plus");
    });

    it("should emit startCreate when the create button is clicked.", async() => {
      const button = wrapper.findAll("button").at(0);

      await button?.trigger("click");

      expect(wrapper.emitted("startCreate")).toBeDefined();
    });
  });
});