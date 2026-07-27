import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import { createFakeQuestionStatsDto } from "@goat-it/schemas/testing/question";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import QuestionStatsContentComponent from "@/components/domain/dashboard/QuestionStatsContent/QuestionStatsContent.vue";
import { QUESTION_CATEGORY_UI_METADATA } from "@/composables/domain/question/constants/question-category.constants";
import { QUESTION_COGNITIVE_DIFFICULTY_UI_METADATA } from "@/composables/domain/question/constants/question-cognitive-difficulty.constants";

describe("QuestionStatsContent Component", () => {
  let wrapper: VueWrapper;

  const fakeStats = createFakeQuestionStatsDto();

  async function mountQuestionStatsContent(options: MountSuspendedOptions<typeof QuestionStatsContentComponent> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionStatsContentComponent, {
      props: { stats: fakeStats },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionStatsContent();
  });

  it("should render 5 StatsCard instances when mounted.", () => {
    const statsCards = wrapper.findAllComponents({ name: "StatsCard" });

    expect(statsCards).toHaveLength(5);
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

    expect(statusCard?.props("testId")).toBe("stats-card-by-status");
  });

  it("should pass correct titleKey to the by-category card when mounted.", () => {
    const categoryCard = wrapper.findAllComponents({ name: "StatsCard" })[1];

    expect(categoryCard?.props("titleKey")).toBe("home.stats.byCategory");
  });

  it("should pass correct defaultView to the by-category card when mounted.", () => {
    const categoryCard = wrapper.findAllComponents({ name: "StatsCard" })[1];

    expect(categoryCard?.props("defaultView")).toBe("doughnut");
  });

  it("should pass correct testId to the by-category card when mounted.", () => {
    const categoryCard = wrapper.findAllComponents({ name: "StatsCard" })[1];

    expect(categoryCard?.props("testId")).toBe("stats-card-by-category");
  });

  it("should map byStatus item at index 0 with info color when mounted.", () => {
    const statusCard = wrapper.findAllComponents({ name: "StatsCard" })[0];
    const items = statusCard?.props("items") as { labelKey: string; color: string }[];

    expect(items[0]?.color).toBe("info");
  });

  it("should map byStatus item at index 1 with success color when mounted.", () => {
    const statusCard = wrapper.findAllComponents({ name: "StatsCard" })[0];
    const items = statusCard?.props("items") as { labelKey: string; color: string }[];

    expect(items[1]?.color).toBe("success");
  });

  it("should map byStatus item at index 2 with warning color when mounted.", () => {
    const statusCard = wrapper.findAllComponents({ name: "StatsCard" })[0];
    const items = statusCard?.props("items") as { labelKey: string; color: string }[];

    expect(items[2]?.color).toBe("warning");
  });

  it("should map byStatus item at index 3 with error color when mounted.", () => {
    const statusCard = wrapper.findAllComponents({ name: "StatsCard" })[0];
    const items = statusCard?.props("items") as { labelKey: string; color: string }[];

    expect(items[3]?.color).toBe("error");
  });

  it("should map byCategory item at index 0 with trivia color when mounted.", () => {
    const categoryCard = wrapper.findAllComponents({ name: "StatsCard" })[1];
    const items = categoryCard?.props("items") as { color: string }[];

    expect(items[0]?.color).toBe(QUESTION_CATEGORY_UI_METADATA.trivia.color);
  });

  it("should map byCategory item at index 1 with lexicon color when mounted.", () => {
    const categoryCard = wrapper.findAllComponents({ name: "StatsCard" })[1];
    const items = categoryCard?.props("items") as { color: string }[];

    expect(items[1]?.color).toBe(QUESTION_CATEGORY_UI_METADATA.lexicon.color);
  });

  it("should map byCategory item at index 2 with riddle color when mounted.", () => {
    const categoryCard = wrapper.findAllComponents({ name: "StatsCard" })[1];
    const items = categoryCard?.props("items") as { color: string }[];

    expect(items[2]?.color).toBe(QUESTION_CATEGORY_UI_METADATA.riddle.color);
  });

  it("should map byCategory item at index 3 with explanation color when mounted.", () => {
    const categoryCard = wrapper.findAllComponents({ name: "StatsCard" })[1];
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
    const rejectionCard = wrapper.findAllComponents({ name: "StatsCard" })[4];

    expect(rejectionCard?.props("defaultView")).toBe("bar");
  });

  it("should pass testId to the rejection type card when mounted.", () => {
    const rejectionCard = wrapper.findAllComponents({ name: "StatsCard" })[4];

    expect(rejectionCard?.props("testId")).toBe("stats-card-by-rejection-type");
  });
});