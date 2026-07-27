import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import { createFakeQuestionThemeStatsDto } from "@goat-it/schemas/testing/question-theme";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import QuestionThemeStatsContentComponent from "@/components/domain/dashboard/QuestionThemeStatsContent/QuestionThemeStatsContent.vue";

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

  it("should render 2 StatsCard instances when mounted.", () => {
    const statsCards = wrapper.findAllComponents({ name: "StatsCard" });

    expect(statsCards).toHaveLength(2);
  });

  it("should pass correct titleKey to the by-status card when mounted.", () => {
    const statusCard = wrapper.findAllComponents({ name: "StatsCard" })[0];

    expect(statusCard?.props("titleKey")).toBe("home.stats.byStatus");
  });

  it("should pass correct defaultView to the by-status card when mounted.", () => {
    const statusCard = wrapper.findAllComponents({ name: "StatsCard" })[0];

    expect(statusCard?.props("defaultView")).toBe("doughnut");
  });

  it("should pass correct testId to the by-status card when mounted.", () => {
    const statusCard = wrapper.findAllComponents({ name: "StatsCard" })[0];

    expect(statusCard?.props("testId")).toBe("stats-card-theme-by-status");
  });

  it("should pass correct titleKey to the by-question-count card when mounted.", () => {
    const countCard = wrapper.findAllComponents({ name: "StatsCard" })[1];

    expect(countCard?.props("titleKey")).toBe("home.stats.byQuestionCount");
  });

  it("should pass correct defaultView to the by-question-count card when mounted.", () => {
    const countCard = wrapper.findAllComponents({ name: "StatsCard" })[1];

    expect(countCard?.props("defaultView")).toBe("bar");
  });

  it("should pass correct testId to the by-question-count card when mounted.", () => {
    const countCard = wrapper.findAllComponents({ name: "StatsCard" })[1];

    expect(countCard?.props("testId")).toBe("stats-card-by-question-count");
  });

  it("should map byStatus item at index 0 with active labelKey when mounted.", () => {
    const statusCard = wrapper.findAllComponents({ name: "StatsCard" })[0];
    const items = statusCard?.props("items") as { labelKey: string }[];

    expect(items[0]?.labelKey).toBe("questionThemes.status.active");
  });

  it("should map byStatus item at index 1 with archived labelKey when mounted.", () => {
    const statusCard = wrapper.findAllComponents({ name: "StatsCard" })[0];
    const items = statusCard?.props("items") as { labelKey: string }[];

    expect(items[1]?.labelKey).toBe("questionThemes.status.archived");
  });

  it("should map byQuestionCount items count correctly when mounted.", () => {
    const countCard = wrapper.findAllComponents({ name: "StatsCard" })[1];
    const items = countCard?.props("items") as { labelKey: string; color: string }[];

    expect(items).toHaveLength(fakeStats.byQuestionCount.length);
  });

  it.each(fakeStats.byQuestionCount.map((item, index) => [index, item.themeSlug] as const))(
    "should map byQuestionCount item at index %i with correct labelKey when mounted.",
    (index: number, expectedLabelKey: string) => {
      const countCard = wrapper.findAllComponents({ name: "StatsCard" })[1];
      const items = countCard?.props("items") as { labelKey: string; color: string }[];

      expect(items[index]?.labelKey).toBe(expectedLabelKey);
    },
  );

  it.each(fakeStats.byQuestionCount.map((_item: unknown, index: number) => [index] as const))(
    "should map byQuestionCount item at index %i with primary color when mounted.",
    (index: number) => {
      const countCard = wrapper.findAllComponents({ name: "StatsCard" })[1];
      const items = countCard?.props("items") as { labelKey: string; color: string }[];

      expect(items[index]?.color).toBe("primary");
    },
  );
});