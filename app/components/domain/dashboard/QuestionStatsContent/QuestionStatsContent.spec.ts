import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import { createFakeQuestionStatsDto } from "@goat-it/schemas/testing/question";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import QuestionStatsContentComponent from "@/components/domain/dashboard/QuestionStatsContent/QuestionStatsContent.vue";
import type { QuestionStatsContentProps } from "@/components/domain/dashboard/QuestionStatsContent/question-stats-content.types";
import { QUESTION_CATEGORY_UI_METADATA } from "@/composables/domain/question/constants/question-category.constants";
import { QUESTION_COGNITIVE_DIFFICULTY_UI_METADATA } from "@/composables/domain/question/constants/question-cognitive-difficulty.constants";

describe("QuestionStatsContent Component", () => {
  let wrapper: VueWrapper;

  const fakeStats = createFakeQuestionStatsDto();

  const defaultQuestionStatsContentProps: QuestionStatsContentProps = {
    stats: fakeStats,
  };

  async function mountQuestionStatsContent(options: MountSuspendedOptions<typeof QuestionStatsContentComponent> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionStatsContentComponent, {
      props: { ...defaultQuestionStatsContentProps },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionStatsContent();
  });

  it("should render QuestionStatsContent when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should render 6 StatsCard instances when mounted.", () => {
    const statsCards = wrapper.findAllComponents({ name: "StatsCard" });

    expect(statsCards).toHaveLength(6);
  });

  it("should pass correct titleKey to the by-status card when mounted.", () => {
    const statusCard = wrapper.findAllComponents({ name: "StatsCard" })[3];

    expect(statusCard?.props("titleKey")).toBe("home.stats.byStatus");
  });

  it("should pass correct defaultView to the by-status card when mounted.", () => {
    const statusCard = wrapper.findAllComponents({ name: "StatsCard" })[3];

    expect(statusCard?.props("defaultView")).toBe("doughnut");
  });

  it("should pass correct testId to the by-status card when mounted.", () => {
    const statusCard = wrapper.findAllComponents({ name: "StatsCard" })[3];

    expect(statusCard?.props("testId")).toBe("stats-card-by-status");
  });

  it("should pass correct titleKey to the by-category card when mounted.", () => {
    const categoryCard = wrapper.findAllComponents({ name: "StatsCard" })[0];

    expect(categoryCard?.props("titleKey")).toBe("home.stats.byCategory");
  });

  it("should pass correct defaultView to the by-category card when mounted.", () => {
    const categoryCard = wrapper.findAllComponents({ name: "StatsCard" })[0];

    expect(categoryCard?.props("defaultView")).toBe("doughnut");
  });

  it("should pass correct testId to the by-category card when mounted.", () => {
    const categoryCard = wrapper.findAllComponents({ name: "StatsCard" })[0];

    expect(categoryCard?.props("testId")).toBe("stats-card-by-category");
  });

  it.each([
    { index: 0, color: "info" },
    { index: 1, color: "success" },
    { index: 2, color: "warning" },
    { index: 3, color: "error" },
  ])("should map byStatus item at index $index with $color color when mounted.", ({ index, color }) => {
    const statusCard = wrapper.findAllComponents({ name: "StatsCard" })[3];
    const items = statusCard?.props("items") as { labelKey: string; color: string }[];

    expect(items[index]?.color).toBe(color);
  });

  it("should map byCategory item at index 0 with trivia color when mounted.", () => {
    const categoryCard = wrapper.findAllComponents({ name: "StatsCard" })[0];
    const items = categoryCard?.props("items") as { color: string }[];

    expect(items[0]?.color).toBe(QUESTION_CATEGORY_UI_METADATA.trivia.color);
  });

  it("should map byCategory item at index 1 with lexicon color when mounted.", () => {
    const categoryCard = wrapper.findAllComponents({ name: "StatsCard" })[0];
    const items = categoryCard?.props("items") as { color: string }[];

    expect(items[1]?.color).toBe(QUESTION_CATEGORY_UI_METADATA.lexicon.color);
  });

  it("should map byCategory item at index 2 with riddle color when mounted.", () => {
    const categoryCard = wrapper.findAllComponents({ name: "StatsCard" })[0];
    const items = categoryCard?.props("items") as { color: string }[];

    expect(items[2]?.color).toBe(QUESTION_CATEGORY_UI_METADATA.riddle.color);
  });

  it("should map byCategory item at index 3 with explanation color when mounted.", () => {
    const categoryCard = wrapper.findAllComponents({ name: "StatsCard" })[0];
    const items = categoryCard?.props("items") as { color: string }[];

    expect(items[3]?.color).toBe(QUESTION_CATEGORY_UI_METADATA.explanation.color);
  });

  it("should map byDifficulty item at index 0 with easy color when mounted.", () => {
    const difficultyCard = wrapper.findAllComponents({ name: "StatsCard" })[2];
    const items = difficultyCard?.props("items") as { color: string }[];

    expect(items[0]?.color).toBe(QUESTION_COGNITIVE_DIFFICULTY_UI_METADATA.easy.color);
  });

  it("should map byDifficulty item at index 1 with medium color when mounted.", () => {
    const difficultyCard = wrapper.findAllComponents({ name: "StatsCard" })[2];
    const items = difficultyCard?.props("items") as { color: string }[];

    expect(items[1]?.color).toBe(QUESTION_COGNITIVE_DIFFICULTY_UI_METADATA.medium.color);
  });

  it("should map byDifficulty item at index 2 with hard color when mounted.", () => {
    const difficultyCard = wrapper.findAllComponents({ name: "StatsCard" })[2];
    const items = difficultyCard?.props("items") as { color: string }[];

    expect(items[2]?.color).toBe(QUESTION_COGNITIVE_DIFFICULTY_UI_METADATA.hard.color);
  });

  it("should pass defaultView bar to the rejection type card when mounted.", () => {
    const rejectionCard = wrapper.findAllComponents({ name: "StatsCard" })[5];

    expect(rejectionCard?.props("defaultView")).toBe("bar");
  });

  it("should pass testId to the rejection type card when mounted.", () => {
    const rejectionCard = wrapper.findAllComponents({ name: "StatsCard" })[5];

    expect(rejectionCard?.props("testId")).toBe("stats-card-by-rejection-type");
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

    expect(translationCard?.props("testId")).toBe("stats-card-by-translation-completeness");
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