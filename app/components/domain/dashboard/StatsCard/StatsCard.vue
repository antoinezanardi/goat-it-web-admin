<script setup lang="ts">
import type { StatsCardProps, StatsCardView } from "~/components/domain/dashboard/StatsCard/stats-card.types";

const props = defineProps<StatsCardProps>();

// Acceptable as we intentionally initialize local state from prop defaultView without reactivity
// eslint-disable-next-line vue/no-setup-props-reactivity-loss
const currentView = ref<StatsCardView>(props.defaultView);

const areAllValuesZero = computed<boolean>(() => props.items.every(item => item.value === 0));

function onToggleDoughnut(): void {
  currentView.value = "doughnut";
}

function onToggleBar(): void {
  currentView.value = "bar";
}
</script>

<template>
  <UCard :data-testid="props.testId">
    <template #header>
      <div class="flex items-center justify-between">
        <span class="font-semibold text-default">{{ $t(props.titleKey) }}</span>

        <div class="flex gap-1">
          <UButton
            :aria-label="$t('home.chartView.doughnut')"
            color="neutral"
            :data-testid="`${props.testId}-doughnut-toggle`"
            icon="i-lucide-pie-chart"
            size="xs"
            :variant="currentView === 'doughnut' ? 'solid' : 'ghost'"
            @click="onToggleDoughnut"
          />

          <UButton
            :aria-label="$t('home.chartView.bar')"
            color="neutral"
            :data-testid="`${props.testId}-bar-toggle`"
            icon="i-lucide-chart-bar"
            size="xs"
            :variant="currentView === 'bar' ? 'solid' : 'ghost'"
            @click="onToggleBar"
          />
        </div>
      </div>
    </template>

    <div
      v-if="areAllValuesZero"
      class="flex items-center justify-center py-8 text-muted"
    >
      {{ $t("home.stats.noData") }}
    </div>

    <div
      v-else-if="currentView === 'doughnut'"
      :data-testid="`${props.testId}-doughnut-chart`"
    >
      <StatsDoughnutChart
        :items="props.items"
        :title-key="props.titleKey"
      />
    </div>

    <div
      v-else
      :data-testid="`${props.testId}-bar-chart`"
    >
      <StatsHorizontalBarChart
        :items="props.items"
        :title-key="props.titleKey"
      />
    </div>
  </UCard>
</template>