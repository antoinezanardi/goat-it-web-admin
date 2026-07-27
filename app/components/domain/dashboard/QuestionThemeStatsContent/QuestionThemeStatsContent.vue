<script setup lang="ts">
import type { QuestionThemeStatsDto } from "@goat-it/schemas/question-theme";

import type { StatsCardItem } from "~/components/domain/dashboard/StatsCard/stats-card.types";

/** Props for the QuestionThemeStatsContent component. */
const props = defineProps<{
  /** The question theme statistics DTO to display. */
  stats: QuestionThemeStatsDto;
}>();

const byStatusItems = computed<StatsCardItem[]>(() => [
  { labelKey: "questionThemes.status.active", value: props.stats.byStatus.active, color: "success" },
  { labelKey: "questionThemes.status.archived", value: props.stats.byStatus.archived, color: "warning" },
]);

const byQuestionCountItems = computed<StatsCardItem[]>(() => props.stats.byQuestionCount.map(entry => ({
  value: entry.activeQuestionCount,
  color: "primary" as const,
  labelKey: entry.themeSlug,
})));
</script>

<template>
  <div class="gap-4 grid grid-cols-2">
    <StatsCard
      default-view="doughnut"
      :items="byStatusItems"
      test-id="stats-card-theme-by-status"
      title-key="home.stats.byStatus"
    />

    <StatsCard
      default-view="bar"
      :items="byQuestionCountItems"
      test-id="stats-card-by-question-count"
      title-key="home.stats.byQuestionCount"
    />
  </div>
</template>