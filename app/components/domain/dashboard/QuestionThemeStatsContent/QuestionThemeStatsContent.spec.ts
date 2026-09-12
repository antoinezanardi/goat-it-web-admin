import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import { createFakeQuestionThemeStatsDto } from "@goat-it/schemas/testing/question-theme";
import { createTestingPinia } from "@pinia/testing";
import type { TestingPinia } from "@pinia/testing";

import { mockStore } from "~~/tests/unit/utils/mocks/stores/store.mock";
import type { MockedPiniaStore } from "~~/tests/unit/utils/types/mock.types";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";

import type { StatsCardItem } from "@/components/domain/dashboard/StatsCard/stats-card.types";
import QuestionThemeStatsContentComponent from "@/components/domain/dashboard/QuestionThemeStatsContent/QuestionThemeStatsContent.vue";
import type { QuestionThemeStatsContentProps } from "@/components/domain/dashboard/QuestionThemeStatsContent/question-theme-stats-content.types";
import { useQuestionThemesStore } from "@/stores/domain/question-theme/question-themes.store";

describe("QuestionThemeStatsContent Component", () => {
  let wrapper: VueWrapper;
  let pinia: TestingPinia;
  let questionThemesStore: MockedPiniaStore<typeof useQuestionThemesStore>;

  const fakeStats = createFakeQuestionThemeStatsDto({
    byQuestionCount: [
      {
        themeId: "507f1f77bcf86cd799439011",
        themeSlug: "test-theme",
        activeQuestionCount: 10,
      },
    ],
  });

  const defaultQuestionThemeStatsContentProps: QuestionThemeStatsContentProps = {
    stats: fakeStats,
  };

  // Acceptable as WrapperLike lacks .props(); callers always access concrete component props
  // oxlint-disable-next-line typescript/explicit-function-return-type
  function findStatsCard(testId: string) {
    return wrapper
      .findAllComponents({ name: "StatsCard" })
      .find(component => component.attributes("data-testid") === testId);
  }

  async function mountQuestionThemeStatsContent(options: MountSuspendedOptions<typeof QuestionThemeStatsContentComponent> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemeStatsContentComponent, {
      props: { ...defaultQuestionThemeStatsContentProps },
      global: { plugins: [pinia] },
      ...options,
    });
  }

  beforeEach(async() => {
    pinia = createTestingPinia();
    wrapper = await mountQuestionThemeStatsContent();
    questionThemesStore = mockStore(useQuestionThemesStore);
  });

  it("should render QuestionThemeStatsContent when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should render 3 StatsCard instances when mounted.", () => {
    const statsCards = wrapper.findAllComponents({ name: "StatsCard" });

    expect(statsCards).toHaveLength(3);
  });

  it("should pass correct titleKey to the by-status card when mounted.", () => {
    const statusCard = findStatsCard("stats-card-theme-by-status");

    expect(statusCard?.props("titleKey")).toBe("home.stats.byStatus");
  });

  it("should pass correct defaultView to the by-status card when mounted.", () => {
    const statusCard = findStatsCard("stats-card-theme-by-status");

    expect(statusCard?.props("defaultView")).toBe("doughnut");
  });

  it("should pass correct testId to the by-status card when mounted.", () => {
    const statusCard = findStatsCard("stats-card-theme-by-status");

    expect(statusCard?.props("testId")).toBe("stats-card-theme-by-status");
  });

  it("should pass correct titleKey to the by-question-count card when mounted.", () => {
    const countCard = findStatsCard("stats-card-by-question-count");

    expect(countCard?.props("titleKey")).toBe("home.stats.byQuestionCount");
  });

  it("should pass correct defaultView to the by-question-count card when mounted.", () => {
    const countCard = findStatsCard("stats-card-by-question-count");

    expect(countCard?.props("defaultView")).toBe("bar");
  });

  it("should pass correct testId to the by-question-count card when mounted.", () => {
    const countCard = findStatsCard("stats-card-by-question-count");

    expect(countCard?.props("testId")).toBe("stats-card-by-question-count");
  });

  it("should map byStatus item at index 0 with active labelKey when mounted.", () => {
    const statusCard = findStatsCard("stats-card-theme-by-status");
    const items = statusCard?.props("items") as StatsCardItem[];

    expect(items[0]?.labelKey).toBe("questionThemes.status.active");
  });

  it("should map byStatus item at index 1 with archived labelKey when mounted.", () => {
    const statusCard = findStatsCard("stats-card-theme-by-status");
    const items = statusCard?.props("items") as StatsCardItem[];

    expect(items[1]?.labelKey).toBe("questionThemes.status.archived");
  });

  it("should map byQuestionCount items count correctly when mounted.", () => {
    const countCard = findStatsCard("stats-card-by-question-count");
    const items = countCard?.props("items") as StatsCardItem[];

    expect(items).toHaveLength(fakeStats.byQuestionCount.length);
  });

  it.each<[number, string]>(fakeStats.byQuestionCount.map((item, index) => [index, item.themeSlug] as const))(
    "should map byQuestionCount item at index %i with correct labelKey when mounted.",
    (index: number, expectedLabelKey: string) => {
      const countCard = findStatsCard("stats-card-by-question-count");
      const items = countCard?.props("items") as StatsCardItem[];

      expect(items[index]?.labelKey).toBe(expectedLabelKey);
    },
  );

  it.each<[number]>(fakeStats.byQuestionCount.map((_item: unknown, index: number) => [index] as const))(
    "should map byQuestionCount item at index %i with primary color when mounted.",
    (index: number) => {
      const countCard = findStatsCard("stats-card-by-question-count");
      const items = countCard?.props("items") as StatsCardItem[];

      expect(items[index]?.color).toBe("primary");
    },
  );

  it("should use theme color and localized label when theme is found in the store.", async() => {
    const themeColor = "#FF00FF";
    const themeLabel = "Custom Label";
    const theme = createFakeQuestionTheme({ slug: "test-theme", color: themeColor, label: { en: themeLabel, fr: "Étiquette" } });
    wrapper = await mountQuestionThemeStatsContent();
    questionThemesStore.questionThemes = [theme];
    wrapper = await mountQuestionThemeStatsContent();

    const countCard = findStatsCard("stats-card-by-question-count");
    const items = countCard?.props("items") as StatsCardItem[];

    expect(items[0]).toStrictEqual({
      color: themeColor,
      label: themeLabel,
      labelKey: "test-theme",
      value: 10,
    });
  });

  it("should pass correct titleKey to the by-translation-completeness card when mounted.", () => {
    const translationCard = findStatsCard("stats-card-theme-by-translation-completeness");

    expect(translationCard?.props("titleKey")).toBe("home.stats.byTranslationCompleteness");
  });

  it("should pass correct defaultView to the by-translation-completeness card when mounted.", () => {
    const translationCard = findStatsCard("stats-card-theme-by-translation-completeness");

    expect(translationCard?.props("defaultView")).toBe("doughnut");
  });

  it("should pass correct testId to the by-translation-completeness card when mounted.", () => {
    const translationCard = findStatsCard("stats-card-theme-by-translation-completeness");

    expect(translationCard?.props("testId")).toBe("stats-card-theme-by-translation-completeness");
  });

  it("should map byTranslationCompleteness item at index 0 with fullyTranslated labelKey when mounted.", () => {
    const translationCard = findStatsCard("stats-card-theme-by-translation-completeness");
    const items = translationCard?.props("items") as StatsCardItem[];

    expect(items[0]?.labelKey).toBe("home.stats.fullyTranslated");
  });

  it("should map byTranslationCompleteness item at index 1 with incomplete labelKey when mounted.", () => {
    const translationCard = findStatsCard("stats-card-theme-by-translation-completeness");
    const items = translationCard?.props("items") as StatsCardItem[];

    expect(items[1]?.labelKey).toBe("home.stats.incomplete");
  });

  it("should map byTranslationCompleteness item at index 0 with success color when mounted.", () => {
    const translationCard = findStatsCard("stats-card-theme-by-translation-completeness");
    const items = translationCard?.props("items") as StatsCardItem[];

    expect(items[0]?.color).toBe("success");
  });

  it("should map byTranslationCompleteness item at index 1 with warning color when mounted.", () => {
    const translationCard = findStatsCard("stats-card-theme-by-translation-completeness");
    const items = translationCard?.props("items") as StatsCardItem[];

    expect(items[1]?.color).toBe("warning");
  });

  it("should map byTranslationCompleteness item at index 0 with fullyTranslated value when mounted.", () => {
    const translationCard = findStatsCard("stats-card-theme-by-translation-completeness");
    const items = translationCard?.props("items") as StatsCardItem[];

    expect(items[0]?.value).toBe(fakeStats.byTranslationCompleteness.fullyTranslated);
  });

  it("should map byTranslationCompleteness item at index 1 with incomplete value when mounted.", () => {
    const translationCard = findStatsCard("stats-card-theme-by-translation-completeness");
    const items = translationCard?.props("items") as StatsCardItem[];

    expect(items[1]?.value).toBe(fakeStats.byTranslationCompleteness.incomplete);
  });
});