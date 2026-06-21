import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { QuestionThemeIcon } from "#components";
import { QuestionThemeSelectorOption } from "#components";

import { QUESTION_THEME_SELECTOR_OPTION_ICON_SIZE } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionThemeSelector/QuestionThemeSelectorOption/question-theme-selector-option.constants";
import type { QuestionThemeSelectorOptionProps } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionThemeSelector/QuestionThemeSelectorOption/question-theme-selector-option.types";

describe("QuestionThemeSelectorOption Component", () => {
  let wrapper: VueWrapper;

  const fakeTheme = createFakeQuestionTheme({
    id: "theme-1",
    slug: "geography",
    color: "#FF0000",
    label: { en: "Geography", fr: "Géographie", es: undefined, de: undefined, it: undefined, pt: undefined },
  });

  const defaultProps: QuestionThemeSelectorOptionProps = {
    theme: fakeTheme,
  };

  async function mountQuestionThemeSelectorOptionComponent(options: MountSuspendedOptions<typeof QuestionThemeSelectorOption> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemeSelectorOption, {
      props: defaultProps,
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

  describe("Theme Label", () => {
    it("should display the localized theme label when theme has a label for the current locale.", () => {
      const label = wrapper.find("span.text-sm");

      expect(label.text()).toBe("Geography");
    });

    it("should display missing theme translation when theme has no localized value for current locale.", async() => {
      const themeWithNoEnLabel = createFakeQuestionTheme({ label: { en: undefined, fr: "Géographie", es: undefined, de: undefined, it: undefined, pt: undefined } });
      wrapper = await mountQuestionThemeSelectorOptionComponent({
        props: { theme: themeWithNoEnLabel },
      });
      const label = wrapper.find("span.text-sm");

      expect(label.text()).toBe("questions.missingThemeTranslation");
    });
  });
});