<script setup lang="ts">
import type { StatsCardItem, StatsCardView } from "~/components/domain/dashboard/StatsCard/stats-card.types";

const props = defineProps<{
  /** Translation key for the card title */
  titleKey: string;
  /** Items to display in the chart */
  items: StatsCardItem[];
  /** Default chart view when the component mounts */
  defaultView: StatsCardView;
  /** Test identifier prefix for data-testid attributes */
  testId: string;
}>();

// Acceptable as we intentionally initialize local state from prop defaultView without reactivity
// eslint-disable-next-line vue/no-setup-props-reactivity-loss
const currentView = ref<StatsCardView>(props.defaultView);

function onToggleDoughnut(): void {
  currentView.value = "doughnut";
}

function onToggleBar(): void {
  currentView.value = "bar";
}
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <span class="font-semibold text-(--ui-text)">{{ $t(props.titleKey) }}</span>

        <div class="flex gap-1">
          <UButton
            :aria-label="$t('home.chartView.doughnut')"
            color="neutral"
            :data-testid="`${props.testId}-doughnut-toggle`"
            icon="i-lucide-chart-no-axes-gantt"
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
      v-if="props.items.length === 0"
      class="flex items-center justify-center py-8 text-(--ui-text-muted)"
    >
      {{ $t("home.stats.noData") }}
    </div>

    <div
      v-else-if="currentView === 'doughnut'"
      :data-testid="`${props.testId}-doughnut-chart`"
    >
      <StatsDoughnutChart :items="props.items"/>
    </div>

    <div
      v-else
      :data-testid="`${props.testId}-bar-chart`"
    >
      <StatsHorizontalBarChart :items="props.items"/>
    </div>
  </UCard>
</template>