import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { EditQuestionThemeButton } from "#components";

import type { EditQuestionThemeButtonProperties } from "~/components/domain/question-theme/QuestionThemesTable/QuestionThemesTableActions/EditQuestionThemeButton/edit-question-theme-button.types";

describe("EditQuestionThemeButton Component", () => {
  let wrapper: VueWrapper;

  const defaultProperties: EditQuestionThemeButtonProperties = {
    questionThemeId: "theme-id-123",
    questionThemeSlug: "music",
  };

  async function mountEditQuestionThemeButtonComponent(options: MountSuspendedOptions<typeof EditQuestionThemeButton> = {}): Promise<VueWrapper> {
    return mountSuspended(EditQuestionThemeButton, {
      props: defaultProperties,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountEditQuestionThemeButtonComponent();
  });

  it("should render the edit button when mounted.", () => {
    const button = wrapper.find("[data-testid='edit-button-music']");

    expect(button.exists()).toBeTruthy();
  });

  it("should render the edit tooltip when mounted.", () => {
    const tooltip = wrapper.findComponent({ name: "UTooltip" });

    expect(tooltip.props("text")).toBe("questionThemes.actions.edit");
  });

  it("should set the aria-label on the edit button when mounted.", () => {
    const button = wrapper.find("[data-testid='edit-button-music']");

    expect(button.attributes("aria-label")).toBe("questionThemes.actions.edit");
  });

  describe("Edit click", () => {
    it("should emit startEdit with the question theme id when the edit button is clicked.", async() => {
      const button = wrapper.find("[data-testid='edit-button-music']");
      await button.trigger("click");

      expect(wrapper.emitted("startEdit")).toStrictEqual([["theme-id-123"]]);
    });
  });
});