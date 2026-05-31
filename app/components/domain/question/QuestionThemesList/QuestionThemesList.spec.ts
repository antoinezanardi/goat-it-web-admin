import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";
import { createFakeQuestionThemeAssignment } from "~~/tests/unit/utils/faketories/questions/entity/question-theme-assignment/question-theme-assignment.entity.faketory";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { QuestionThemeIcon, UTooltip } from "#components";
import { QuestionThemesList } from "#components";

import type { QuestionThemesListProperties } from "~/components/domain/question/QuestionThemesList/question-themes-list.types";

describe("QuestionThemesList Component", () => {
  let wrapper: VueWrapper;
  const defaultQuestionThemesListProperties: QuestionThemesListProperties = {
    themes: [
      createFakeQuestionThemeAssignment({ theme: createFakeQuestionTheme({ slug: "geography", color: "#FF0000" }) }),
      createFakeQuestionThemeAssignment({ theme: createFakeQuestionTheme({ slug: "history", color: "#00FF00" }) }),
    ],
  };

  async function mountQuestionThemesListComponent(options: MountSuspendedOptions<typeof QuestionThemesList> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemesList, {
      props: defaultQuestionThemesListProperties,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionThemesListComponent();
  });

  it("should render the question themes list component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Question Theme Icons", () => {
    it("should render a QuestionThemeIcon for each theme assignment when themes are provided.", () => {
      const icons = wrapper.findAllComponents<typeof QuestionThemeIcon>({ name: "QuestionThemeIcon" });

      expect(icons).toHaveLength(2);
    });

    it("should pass the slug to the QuestionThemeIcon when a theme assignment is rendered.", () => {
      const icon = wrapper.findComponent<typeof QuestionThemeIcon>("[data-testid='question-theme-icon-geography']");

      expect(icon.props("slug")).toBe("geography");
    });

    it("should pass the color to the QuestionThemeIcon when a theme assignment is rendered.", () => {
      const icon = wrapper.findComponent<typeof QuestionThemeIcon>("[data-testid='question-theme-icon-geography']");

      expect(icon.props("color")).toBe("#FF0000");
    });

    it("should pass the size of 16 to the QuestionThemeIcon when a theme assignment is rendered.", () => {
      const icon = wrapper.findComponent<typeof QuestionThemeIcon>("[data-testid='question-theme-icon-geography']");

      expect(icon.props("size")).toBe(16);
    });

    it("should render no QuestionThemeIcon when themes array is empty.", async() => {
      wrapper = await mountQuestionThemesListComponent({ props: { themes: [] } });

      const icons = wrapper.findAllComponents<typeof QuestionThemeIcon>("[data-testid^='question-theme-icon-']");

      expect(icons).toHaveLength(0);
    });
  });

  describe("Tooltips", () => {
    it("should render a UTooltip for each theme assignment when themes are provided.", () => {
      const tooltips = wrapper.findAllComponents<typeof UTooltip>({ name: "UTooltip" });

      expect(tooltips).toHaveLength(2);
    });

    it("should pass the theme localized label as text to the tooltip when a theme assignment is rendered.", () => {
      const tooltips = wrapper.findAllComponents<typeof UTooltip>({ name: "UTooltip" });

      expect(tooltips[0]?.props("text")).toBeTruthy();
    });
  });
});