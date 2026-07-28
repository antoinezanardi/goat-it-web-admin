<script setup lang="ts">
import { Doughnut } from "vue-chartjs";

import type { StatsDoughnutChartProps } from "~/components/domain/dashboard/StatsDoughnutChart/stats-doughnut-chart.types";
import { DOUGHNUT_CHART_OPTIONS } from "~/components/domain/dashboard/StatsDoughnutChart/stats-doughnut-chart.constants";
import { CHART_COLOR_HEX_MAP } from "~/composables/domain/dashboard/constants/dashboard-chart-colors.constants";

const props = defineProps<StatsDoughnutChartProps>();

const { t } = useI18n();

const chartData = computed(() => ({
  labels: props.items.map(item => t(item.labelKey)),
  datasets: [
    {
      data: props.items.map(item => item.value),
      backgroundColor: props.items.map(item => CHART_COLOR_HEX_MAP[item.color] ?? item.color),
      borderWidth: 0,
    },
  ],
}));

const total = computed<number>(() => props.items.reduce((sum, item) => sum + item.value, 0));
</script>

<template>
  <div class="flex flex-col gap-3 items-center">
    <div class="max-w-[240px] relative w-full">
      <Doughnut
        :data="chartData"
        :options="DOUGHNUT_CHART_OPTIONS"
      />

      <div class="absolute flex inset-0 items-center justify-center pointer-events-none">
        <span class="font-semibold text-(--ui-text) text-2xl">{{ total }}</span>
      </div>
    </div>

    <div class="flex flex-wrap gap-x-4 gap-y-1 justify-center">
      <div
        v-for="item in props.items"
        :key="item.labelKey"
        class="flex gap-1.5 items-center text-(--ui-text-muted) text-sm"
      >
        <span
          class="rounded-full shrink-0 size-2.5"
          :style="{ 'backgroundColor': CHART_COLOR_HEX_MAP[item.color] ?? item.color }"
        />

        <span>{{ $t(item.labelKey) }}</span>

        <span class="font-medium text-(--ui-text)">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>