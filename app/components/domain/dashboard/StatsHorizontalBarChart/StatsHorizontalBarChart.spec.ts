import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { CHART_COLOR_HEX_MAP } from "@/composables/domain/dashboard/constants/dashboard-chart-colors.constants";
import StatsHorizontalBarChartComponent from "@/components/domain/dashboard/StatsHorizontalBarChart/StatsHorizontalBarChart.vue";
import type { StatsCardItem } from "@/components/domain/dashboard/StatsCard/stats-card.types";

describe("StatsHorizontalBarChart Component", () => {
  let wrapper: VueWrapper;

  const firstItem: StatsCardItem = { labelKey: "questions.status.pending", value: 10, color: "info" };
  const secondItem: StatsCardItem = { labelKey: "questions.status.active", value: 20, color: "success" };
  const defaultItems: StatsCardItem[] = [firstItem, secondItem];

  async function mountStatsHorizontalBarChart(options: MountSuspendedOptions<typeof StatsHorizontalBarChartComponent> = {}): Promise<VueWrapper> {
    return mountSuspended(StatsHorizontalBarChartComponent, {
      props: { items: defaultItems },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountStatsHorizontalBarChart();
  });

  it("should render the Bar component with correct data when mounted.", () => {
    const bar = wrapper.getComponent({ name: "Bar" });

    expect(bar.props("data")).toStrictEqual({
      labels: [firstItem.labelKey, secondItem.labelKey],
      datasets: [
        {
          data: [10, 20],
          backgroundColor: [
            CHART_COLOR_HEX_MAP[firstItem.color],
            CHART_COLOR_HEX_MAP[secondItem.color],
          ],
          borderWidth: 0,
          borderRadius: 4,
        },
      ],
    });
  });

  it("should render the Bar component with indexAxis set to y when mounted.", () => {
    const bar = wrapper.getComponent({ name: "Bar" });
    const options = bar.props("options") as Record<string, unknown>;

    expect(options.indexAxis).toBe("y");
  });

  it("should render the Bar component with legend disabled when mounted.", () => {
    const bar = wrapper.getComponent({ name: "Bar" });
    const options = bar.props("options") as Record<string, unknown>;

    expect((options.plugins as Record<string, unknown>).legend).toStrictEqual({ display: false });
  });

  it("should use raw hex color as fallback when item color is not a semantic AppColor.", async() => {
    const hexColor = "#ff0000";
    wrapper = await mountStatsHorizontalBarChart({
      props: {
        items: [{ labelKey: "questions.status.pending", value: 10, color: hexColor }],
      },
    });

    const bar = wrapper.getComponent({ name: "Bar" });
    const barData = bar.props("data") as { datasets: { backgroundColor: string[] }[] };

    expect(barData.datasets[0]?.backgroundColor[0]).toBe(hexColor);
  });
});