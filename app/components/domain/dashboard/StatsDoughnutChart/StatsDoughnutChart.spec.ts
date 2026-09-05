import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { CHART_COLOR_HEX_MAP } from "@/composables/domain/dashboard/constants/dashboard-chart-colors.constants";
import StatsDoughnutChartComponent from "@/components/domain/dashboard/StatsDoughnutChart/StatsDoughnutChart.vue";
import type { StatsCardItem } from "@/components/domain/dashboard/StatsCard/stats-card.types";

describe("StatsDoughnutChart Component", () => {
  let wrapper: VueWrapper;

  const firstItem: StatsCardItem = { labelKey: "questions.status.pending", value: 10, color: "info" };
  const secondItem: StatsCardItem = { labelKey: "questions.status.active", value: 20, color: "success" };
  const defaultItems: StatsCardItem[] = [firstItem, secondItem];

  async function mountStatsDoughnutChart(options: MountSuspendedOptions<typeof StatsDoughnutChartComponent> = {}): Promise<VueWrapper> {
    return mountSuspended(StatsDoughnutChartComponent, {
      props: { items: defaultItems, titleKey: "home.stats.byStatus" },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountStatsDoughnutChart();
  });

  it("should render StatsDoughnutChart when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should render the Doughnut component with correct data when mounted.", () => {
    const doughnut = wrapper.getComponent({ name: "Doughnut" });

    expect(doughnut.props("data")).toStrictEqual({
      labels: [firstItem.labelKey, secondItem.labelKey],
      datasets: [
        {
          data: [10, 20],
          backgroundColor: [
            CHART_COLOR_HEX_MAP[firstItem.color],
            CHART_COLOR_HEX_MAP[secondItem.color],
          ],
          borderWidth: 0,
        },
      ],
    });
  });

  it("should render the Doughnut component with legend disabled when mounted.", () => {
    const doughnut = wrapper.getComponent({ name: "Doughnut" });
    const options = doughnut.props("options") as Record<string, unknown>;

    expect((options.plugins as Record<string, unknown>).legend).toStrictEqual({ display: false });
  });

  it("should display the total value as centered text when items have values.", () => {
    expect(wrapper.text()).toContain("30");
  });

  it("should render legend label for first item when items are provided.", () => {
    expect(wrapper.text()).toContain(firstItem.labelKey);
  });

  it("should render legend value for first item when items are provided.", () => {
    expect(wrapper.text()).toContain("10");
  });

  it("should render legend label for second item when items are provided.", () => {
    expect(wrapper.text()).toContain(secondItem.labelKey);
  });

  it("should render legend value for second item when items are provided.", () => {
    expect(wrapper.text()).toContain("20");
  });

  it("should display zero total when items have zero values.", async() => {
    wrapper = await mountStatsDoughnutChart({
      props: {
        items: [{ labelKey: "questions.status.pending", value: 0, color: "info" }],
        titleKey: "home.stats.byStatus",
      },
    });

    expect(wrapper.text()).toContain("0");
  });

  it("should use raw hex color as fallback when item color is not a semantic AppColor.", async() => {
    const hexColor = "#ff0000";
    wrapper = await mountStatsDoughnutChart({
      props: {
        items: [{ labelKey: "questions.status.pending", value: 10, color: hexColor }],
        titleKey: "home.stats.byStatus",
      },
    });

    const doughnut = wrapper.getComponent({ name: "Doughnut" });
    const doughnutData = doughnut.props("data") as { datasets: { backgroundColor: string[] }[] };

    expect(doughnutData.datasets[0]?.backgroundColor[0]).toBe(hexColor);
  });

  it("should use raw hex color as fallback for legend circle when item color is raw hex.", async() => {
    const hexColor = "#ff0000";
    wrapper = await mountStatsDoughnutChart({
      props: {
        items: [{ labelKey: "questions.status.pending", value: 10, color: hexColor }],
        titleKey: "home.stats.byStatus",
      },
    });

    const circle = wrapper.find("[style]");

    expect(circle.attributes("style")).toContain(hexColor);
  });
});