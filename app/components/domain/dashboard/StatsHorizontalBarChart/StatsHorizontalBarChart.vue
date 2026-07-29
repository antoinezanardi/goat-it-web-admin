<script setup lang="ts">
import { Bar } from "vue-chartjs";

import type { StatsHorizontalBarChartProps } from "~/components/domain/dashboard/StatsHorizontalBarChart/stats-horizontal-bar-chart.types";
import { HORIZONTAL_BAR_CHART_OPTIONS, ITEM_HEIGHT, MIN_CHART_HEIGHT } from "~/components/domain/dashboard/StatsHorizontalBarChart/stats-horizontal-bar-chart.constants";
import { CHART_COLOR_HEX_MAP } from "~/composables/domain/dashboard/constants/dashboard-chart-colors.constants";

const props = defineProps<StatsHorizontalBarChartProps>();

const { t } = useI18n();

const sortedItems = computed(() => [...props.items].toSorted((itemA, itemB) => itemB.value - itemA.value));

const chartData = computed(() => ({
  labels: sortedItems.value.map(item => item.label ?? t(item.labelKey)),
  datasets: [
    {
      data: sortedItems.value.map(item => item.value),
      backgroundColor: sortedItems.value.map(item => CHART_COLOR_HEX_MAP[item.color] ?? item.color),
      borderWidth: 0,
      borderRadius: 4,
    },
  ],
}));

const chartHeight = computed<number>(() => Math.max(sortedItems.value.length * ITEM_HEIGHT, MIN_CHART_HEIGHT));

const containerStyle = computed(() => ({ height: `${chartHeight.value}px` }));
</script>

<template>
  <div :style="containerStyle">
    <Bar
      :aria-label="$t(props.titleKey)"
      :data="chartData"
      :options="HORIZONTAL_BAR_CHART_OPTIONS"
    />
  </div>
</template>