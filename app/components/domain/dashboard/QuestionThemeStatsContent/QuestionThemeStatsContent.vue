<script setup lang="ts">
import type { Locale } from "@goat-it/schemas/shared/locale";

import type { QuestionThemeStatsContentProps } from "~/components/domain/dashboard/QuestionThemeStatsContent/question-theme-stats-content.types";
import type { StatsCardItem } from "~/components/domain/dashboard/StatsCard/stats-card.types";
import { getThemeLocalizedLabel } from "~/composables/domain/question-theme/helpers/question-theme.helpers";
import { useQuestionThemesStore } from "~/stores/domain/question-theme/question-themes.store";

const props = defineProps<QuestionThemeStatsContentProps>();

const themesStore = useQuestionThemesStore();
const { locale } = useI18n();

const byStatusItems = computed<StatsCardItem[]>(() => [
  { labelKey: "questionThemes.status.active", value: props.stats.byStatus.active, color: "success" },
  { labelKey: "questionThemes.status.archived", value: props.stats.byStatus.archived, color: "warning" },
]);

const byQuestionCountItems = computed<StatsCardItem[]>(() => props.stats.byQuestionCount.map(entry => {
  const theme = themesStore.questionThemes.find(t => t.slug === entry.themeSlug);

  return {
    color: theme?.color ?? "primary",
    label: getThemeLocalizedLabel(theme, locale.value as Locale, entry.themeSlug),
    labelKey: entry.themeSlug,
    value: entry.activeQuestionCount,
  };
}));
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