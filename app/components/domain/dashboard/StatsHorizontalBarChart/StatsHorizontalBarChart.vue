<script setup lang="ts">
import { Bar } from "vue-chartjs";

import type { StatsHorizontalBarChartProps } from "~/components/domain/dashboard/StatsHorizontalBarChart/stats-horizontal-bar-chart.types";
import { CHART_COLOR_HEX_MAP } from "~/composables/domain/dashboard/constants/dashboard-chart-colors.constants";

const props = defineProps<StatsHorizontalBarChartProps>();
const ITEM_HEIGHT = 40;
const MIN_CHART_HEIGHT = 100;

const { t } = useI18n();

const chartData = computed(() => ({
  labels: props.items.map(item => t(item.labelKey)),
  datasets: [
    {
      data: props.items.map(item => item.value),
      backgroundColor: props.items.map(item => CHART_COLOR_HEX_MAP[item.color]),
      borderWidth: 0,
      borderRadius: 4,
    },
  ],
}));

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: "y" as const,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    x: {
      ticks: {
        stepSize: 1,
        precision: 0,
      },
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
}));

const chartHeight = computed(() => Math.max(props.items.length * ITEM_HEIGHT, MIN_CHART_HEIGHT));
</script>

<template>
  <div :style="{ 'height': `${chartHeight}px` }">
    <Bar
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>