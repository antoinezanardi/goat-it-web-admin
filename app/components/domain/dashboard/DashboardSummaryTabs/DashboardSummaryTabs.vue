<script setup lang="ts">
import type { DashboardSummaryTabsEmits, DashboardSummaryTabsProps } from "~/components/domain/dashboard/DashboardSummaryTabs/dashboard-summary-tabs.types";
import { DASHBOARD_TABS } from "~/components/domain/dashboard/DashboardSummaryTabs/dashboard-summary-tabs.constants";

const props = defineProps<DashboardSummaryTabsProps>();

const emit = defineEmits<DashboardSummaryTabsEmits>();

const [QUESTIONS, QUESTION_THEMES] = DASHBOARD_TABS;

const tabs = computed(() => [
  {
    labelKey: "home.tabs.questions",
    tabValue: QUESTIONS,
    icon: "i-lucide-circle-help",
    iconClass: "text-primary",
    testId: "dashboard-summary-tab-questions",
    value: props.questionTotal,
  },
  {
    labelKey: "home.tabs.questionThemes",
    tabValue: QUESTION_THEMES,
    icon: "i-lucide-palette",
    iconClass: "text-info",
    testId: "dashboard-summary-tab-question-themes",
    value: props.questionThemeTotal,
  },
]);
</script>

<template>
  <div
    class="gap-4 grid grid-cols-1 sm:grid-cols-2"
    role="tablist"
  >
    <DashboardSummaryTab
      v-for="tab in tabs"
      :key="tab.labelKey"
      :active="props.activeTab === tab.tabValue"
      :icon="tab.icon"
      :icon-class="tab.iconClass"
      :is-fetching="props.isFetching"
      :label-key="tab.labelKey"
      :test-id="tab.testId"
      :value="tab.value"
      @select="emit('update:activeTab', tab.tabValue)"
    />
  </div>
</template>