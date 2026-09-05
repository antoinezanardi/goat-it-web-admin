import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import { createFakeQuestionThemeStatsDto } from "@goat-it/schemas/testing/question-theme";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";

import QuestionThemeStatsContentComponent from "@/components/domain/dashboard/QuestionThemeStatsContent/QuestionThemeStatsContent.vue";
import { useQuestionThemesStore } from "@/stores/domain/question-theme/question-themes.store";

describe("QuestionThemeStatsContent Component", () => {
  let wrapper: VueWrapper;

  const fakeStats = createFakeQuestionThemeStatsDto({
    byQuestionCount: [
      {
        themeId: "507f1f77bcf86cd799439011",
        themeSlug: "test-theme",
        activeQuestionCount: 10,
      },
    ],
  });

  async function mountQuestionThemeStatsContent(options: MountSuspendedOptions<typeof QuestionThemeStatsContentComponent> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemeStatsContentComponent, {
      props: { stats: fakeStats },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionThemeStatsContent();
  });

  it("should render 3 StatsCard instances when mounted.", () => {
    const statsCards = wrapper.findAllComponents({ name: "StatsCard" });

    expect(statsCards).toHaveLength(3);
  });

  it("should pass correct titleKey to the by-status card when mounted.", () => {
    const statusCard = wrapper.findAllComponents({ name: "StatsCard" })[2];

    expect(statusCard?.props("titleKey")).toBe("home.stats.byStatus");
  });

  it("should pass correct defaultView to the by-status card when mounted.", () => {
    const statusCard = wrapper.findAllComponents({ name: "StatsCard" })[2];

    expect(statusCard?.props("defaultView")).toBe("doughnut");
  });

  it("should pass correct testId to the by-status card when mounted.", () => {
    const statusCard = wrapper.findAllComponents({ name: "StatsCard" })[2];

    expect(statusCard?.props("testId")).toBe("stats-card-theme-by-status");
  });

  it("should pass correct titleKey to the by-question-count card when mounted.", () => {
    const countCard = wrapper.findAllComponents({ name: "StatsCard" })[0];

    expect(countCard?.props("titleKey")).toBe("home.stats.byQuestionCount");
  });

  it("should pass correct defaultView to the by-question-count card when mounted.", () => {
    const countCard = wrapper.findAllComponents({ name: "StatsCard" })[0];

    expect(countCard?.props("defaultView")).toBe("bar");
  });

  it("should pass correct testId to the by-question-count card when mounted.", () => {
    const countCard = wrapper.findAllComponents({ name: "StatsCard" })[0];

    expect(countCard?.props("testId")).toBe("stats-card-by-question-count");
  });

  it("should map byStatus item at index 0 with active labelKey when mounted.", () => {
    const statusCard = wrapper.findAllComponents({ name: "StatsCard" })[2];
    const items = statusCard?.props("items") as { labelKey: string }[];

    expect(items[0]?.labelKey).toBe("questionThemes.status.active");
  });

  it("should map byStatus item at index 1 with archived labelKey when mounted.", () => {
    const statusCard = wrapper.findAllComponents({ name: "StatsCard" })[2];
    const items = statusCard?.props("items") as { labelKey: string }[];

    expect(items[1]?.labelKey).toBe("questionThemes.status.archived");
  });

  it("should map byQuestionCount items count correctly when mounted.", () => {
    const countCard = wrapper.findAllComponents({ name: "StatsCard" })[0];
    const items = countCard?.props("items") as { labelKey: string; color: string }[];

    expect(items).toHaveLength(fakeStats.byQuestionCount.length);
  });

  it.each(fakeStats.byQuestionCount.map((item, index) => [index, item.themeSlug] as const))(
    "should map byQuestionCount item at index %i with correct labelKey when mounted.",
    (index: number, expectedLabelKey: string) => {
      const countCard = wrapper.findAllComponents({ name: "StatsCard" })[0];
      const items = countCard?.props("items") as { labelKey: string; color: string }[];

      expect(items[index]?.labelKey).toBe(expectedLabelKey);
    },
  );

  it.each(fakeStats.byQuestionCount.map((_item: unknown, index: number) => [index] as const))(
    "should map byQuestionCount item at index %i with primary color when mounted.",
    (index: number) => {
      const countCard = wrapper.findAllComponents({ name: "StatsCard" })[0];
      const items = countCard?.props("items") as { labelKey: string; color: string }[];

      expect(items[index]?.color).toBe("primary");
    },
  );

  it("should use theme color and localized label when theme is found in the store.", async() => {
    const themeColor = "#FF00FF";
    const themeLabel = "Custom Label";
    const theme = createFakeQuestionTheme({ slug: "test-theme", color: themeColor, label: { en: themeLabel, fr: "Étiquette" } });
    const store = useQuestionThemesStore();
    store.questionThemes = [theme];
    wrapper = await mountQuestionThemeStatsContent();

    const countCard = wrapper.findAllComponents({ name: "StatsCard" })[0];
    const items = countCard?.props("items") as { label: string; color: string; value: number }[];

    expect(items[0]).toStrictEqual({
      color: themeColor,
      label: themeLabel,
      labelKey: "test-theme",
      value: 10,
    });
  });

  it("should pass correct titleKey to the by-translation-completeness card when mounted.", () => {
    const translationCard = wrapper.findAllComponents({ name: "StatsCard" })[1];

    expect(translationCard?.props("titleKey")).toBe("home.stats.byTranslationCompleteness");
  });

  it("should pass correct defaultView to the by-translation-completeness card when mounted.", () => {
    const translationCard = wrapper.findAllComponents({ name: "StatsCard" })[1];

    expect(translationCard?.props("defaultView")).toBe("doughnut");
  });

  it("should pass correct testId to the by-translation-completeness card when mounted.", () => {
    const translationCard = wrapper.findAllComponents({ name: "StatsCard" })[1];

    expect(translationCard?.props("testId")).toBe("stats-card-theme-by-translation-completeness");
  });

  it("should map byTranslationCompleteness item at index 0 with fullyTranslated labelKey when mounted.", () => {
    const translationCard = wrapper.findAllComponents({ name: "StatsCard" })[1];
    const items = translationCard?.props("items") as { labelKey: string }[];

    expect(items[0]?.labelKey).toBe("home.stats.fullyTranslated");
  });

  it("should map byTranslationCompleteness item at index 1 with incomplete labelKey when mounted.", () => {
    const translationCard = wrapper.findAllComponents({ name: "StatsCard" })[1];
    const items = translationCard?.props("items") as { labelKey: string }[];

    expect(items[1]?.labelKey).toBe("home.stats.incomplete");
  });

  it("should map byTranslationCompleteness item at index 0 with success color when mounted.", () => {
    const translationCard = wrapper.findAllComponents({ name: "StatsCard" })[1];
    const items = translationCard?.props("items") as { color: string }[];

    expect(items[0]?.color).toBe("success");
  });

  it("should map byTranslationCompleteness item at index 1 with warning color when mounted.", () => {
    const translationCard = wrapper.findAllComponents({ name: "StatsCard" })[1];
    const items = translationCard?.props("items") as { color: string }[];

    expect(items[1]?.color).toBe("warning");
  });

  it("should map byTranslationCompleteness item at index 0 with fullyTranslated value when mounted.", () => {
    const translationCard = wrapper.findAllComponents({ name: "StatsCard" })[1];
    const items = translationCard?.props("items") as { value: number }[];

    expect(items[0]?.value).toBe(fakeStats.byTranslationCompleteness.fullyTranslated);
  });

  it("should map byTranslationCompleteness item at index 1 with incomplete value when mounted.", () => {
    const translationCard = wrapper.findAllComponents({ name: "StatsCard" })[1];
    const items = translationCard?.props("items") as { value: number }[];

    expect(items[1]?.value).toBe(fakeStats.byTranslationCompleteness.incomplete);
  });

  it("should apply grid-cols-1 class to the grid container when mounted.", () => {
    const grid = wrapper.find(".grid");

    expect(grid.classes()).toContain("grid-cols-1");
  });

  it("should apply sm:grid-cols-2 class to the grid container when mounted.", () => {
    const grid = wrapper.find(".grid");

    expect(grid.classes()).toContain("sm:grid-cols-2");
  });
});