import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { QuestionThemeIcon } from "#components";
import { QuestionThemeSelectorOption } from "#components";

import { QUESTION_THEME_SELECTOR_OPTION_ICON_SIZE } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionThemeSelector/QuestionThemeSelectorOption/question-theme-selector-option.constants";
import type { QuestionThemeSelectorOptionProperties } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionThemeSelector/QuestionThemeSelectorOption/question-theme-selector-option.types";

describe("QuestionThemeSelectorOption Component", () => {
  let wrapper: VueWrapper;

  const fakeTheme = createFakeQuestionTheme({
    id: "theme-1",
    slug: "geography",
    color: "#FF0000",
  });

  const defaultProperties: QuestionThemeSelectorOptionProperties = {
    theme: fakeTheme,
  };

  async function mountQuestionThemeSelectorOptionComponent(options: MountSuspendedOptions<typeof QuestionThemeSelectorOption> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemeSelectorOption, {
      props: defaultProperties,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionThemeSelectorOptionComponent();
  });

  it("should render the question theme selector option component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Theme Icon", () => {
    it("should pass theme slug to QuestionThemeIcon when mounted.", () => {
      const icon = wrapper.findComponent<typeof QuestionThemeIcon>({ name: "QuestionThemeIcon" });

      expect(icon.props("slug")).toBe("geography");
    });

    it("should pass theme color to QuestionThemeIcon when mounted.", () => {
      const icon = wrapper.findComponent<typeof QuestionThemeIcon>({ name: "QuestionThemeIcon" });

      expect(icon.props("color")).toBe("#FF0000");
    });

    it("should pass the option icon size constant to QuestionThemeIcon when mounted.", () => {
      const icon = wrapper.findComponent<typeof QuestionThemeIcon>({ name: "QuestionThemeIcon" });

      expect(icon.props("size")).toBe(QUESTION_THEME_SELECTOR_OPTION_ICON_SIZE);
    });
  });
});