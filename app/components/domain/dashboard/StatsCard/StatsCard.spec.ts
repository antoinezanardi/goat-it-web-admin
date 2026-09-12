import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import StatsCardComponent from "@/components/domain/dashboard/StatsCard/StatsCard.vue";
import type { StatsCardItem, StatsCardProps } from "@/components/domain/dashboard/StatsCard/stats-card.types";

describe("StatsCard Component", () => {
  let wrapper: VueWrapper;

  const defaultItems: StatsCardItem[] = [
    { labelKey: "questions.status.pending", value: 10, color: "info" },
    { labelKey: "questions.status.active", value: 20, color: "success" },
  ];

  const allZeroItems: StatsCardItem[] = [
    { labelKey: "questions.status.pending", value: 0, color: "info" },
    { labelKey: "questions.status.active", value: 0, color: "success" },
  ];

  const defaultProps: StatsCardProps = {
    titleKey: "home.stats.byStatus",
    items: defaultItems,
    defaultView: "doughnut",
    testId: "stats-card-test",
  };

  async function mountStatsCard(options: MountSuspendedOptions<typeof StatsCardComponent> = {}): Promise<VueWrapper> {
    return mountSuspended(StatsCardComponent, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountStatsCard();
  });

  it("should render StatsCard when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should render the translated title when mounted.", () => {
    expect(wrapper.text()).toContain("home.stats.byStatus");
  });

  it("should render the doughnut chart when defaultView is doughnut.", () => {
    expect(wrapper.find("[data-testid='stats-card-test-doughnut-chart']").exists()).toBeTruthy();
  });

  it("should not render the bar chart when defaultView is doughnut.", () => {
    expect(wrapper.find("[data-testid='stats-card-test-bar-chart']").exists()).toBeFalsy();
  });

  it("should render the bar chart when defaultView is bar.", async() => {
    wrapper = await mountStatsCard({
      props: { ...defaultProps, defaultView: "bar" },
    });

    expect(wrapper.find("[data-testid='stats-card-test-bar-chart']").exists()).toBeTruthy();
  });

  it("should not render the doughnut chart when defaultView is bar.", async() => {
    wrapper = await mountStatsCard({
      props: { ...defaultProps, defaultView: "bar" },
    });

    expect(wrapper.find("[data-testid='stats-card-test-doughnut-chart']").exists()).toBeFalsy();
  });

  it("should render the bar chart when the bar toggle is clicked.", async() => {
    await wrapper.find("[data-testid='stats-card-test-bar-toggle']").trigger("click");

    expect(wrapper.find("[data-testid='stats-card-test-bar-chart']").exists()).toBeTruthy();
  });

  it("should not render the doughnut chart when the bar toggle is clicked.", async() => {
    await wrapper.find("[data-testid='stats-card-test-bar-toggle']").trigger("click");

    expect(wrapper.find("[data-testid='stats-card-test-doughnut-chart']").exists()).toBeFalsy();
  });

  it("should render the doughnut chart when the doughnut toggle is clicked following bar view.", async() => {
    await wrapper.find("[data-testid='stats-card-test-bar-toggle']").trigger("click");
    await wrapper.find("[data-testid='stats-card-test-doughnut-toggle']").trigger("click");

    expect(wrapper.find("[data-testid='stats-card-test-doughnut-chart']").exists()).toBeTruthy();
  });

  it("should not render the bar chart when the doughnut toggle is clicked following bar view.", async() => {
    await wrapper.find("[data-testid='stats-card-test-bar-toggle']").trigger("click");
    await wrapper.find("[data-testid='stats-card-test-doughnut-toggle']").trigger("click");

    expect(wrapper.find("[data-testid='stats-card-test-bar-chart']").exists()).toBeFalsy();
  });

  it("should show empty state message when items array is empty.", async() => {
    wrapper = await mountStatsCard({
      props: { ...defaultProps, items: [] },
    });

    expect(wrapper.text()).toContain("home.stats.noData");
  });

  it("should show empty state message when all items have value zero.", async() => {
    wrapper = await mountStatsCard({
      props: { ...defaultProps, items: allZeroItems },
    });

    expect(wrapper.text()).toContain("home.stats.noData");
  });

  it("should not render the doughnut chart when all items have value zero.", async() => {
    wrapper = await mountStatsCard({
      props: { ...defaultProps, items: allZeroItems },
    });

    expect(wrapper.find("[data-testid='stats-card-test-doughnut-chart']").exists()).toBeFalsy();
  });

  it("should not render the bar chart when all items have value zero.", async() => {
    wrapper = await mountStatsCard({
      props: { ...defaultProps, items: allZeroItems },
    });

    expect(wrapper.find("[data-testid='stats-card-test-bar-chart']").exists()).toBeFalsy();
  });
});