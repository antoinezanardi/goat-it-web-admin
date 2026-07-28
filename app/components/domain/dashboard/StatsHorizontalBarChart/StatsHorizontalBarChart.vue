<script setup lang="ts">
import { Bar } from "vue-chartjs";

import type { StatsHorizontalBarChartProps } from "~/components/domain/dashboard/StatsHorizontalBarChart/stats-horizontal-bar-chart.types";
import { HORIZONTAL_BAR_CHART_OPTIONS, ITEM_HEIGHT, MIN_CHART_HEIGHT } from "~/components/domain/dashboard/StatsHorizontalBarChart/stats-horizontal-bar-chart.constants";
import { CHART_COLOR_HEX_MAP } from "~/composables/domain/dashboard/constants/dashboard-chart-colors.constants";

const props = defineProps<StatsHorizontalBarChartProps>();

const { t } = useI18n();

const chartData = computed(() => ({
  labels: props.items.map(item => t(item.labelKey)),
  datasets: [
    {
      data: props.items.map(item => item.value),
      backgroundColor: props.items.map(item => CHART_COLOR_HEX_MAP[item.color] ?? item.color),
      borderWidth: 0,
      borderRadius: 4,
    },
  ],
}));

const chartHeight = computed<number>(() => Math.max(props.items.length * ITEM_HEIGHT, MIN_CHART_HEIGHT));
</script>

<template>
  <div :style="{ 'height': `${chartHeight}px` }">
    <Bar
      :data="chartData"
      :options="HORIZONTAL_BAR_CHART_OPTIONS"
    />
  </div>
</template>