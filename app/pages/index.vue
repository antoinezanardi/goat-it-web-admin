<script setup lang="ts">
import type { DashboardTab } from "~/components/domain/dashboard/DashboardSummaryTabs/dashboard-summary-tabs.types";
import { HOME_PAGE_ICON, HOME_PAGE_ORDER, HOME_PAGE_TITLE_KEY } from "~/pages/index.constants";
import { DASHBOARD_TABS } from "~/components/domain/dashboard/DashboardSummaryTabs/dashboard-summary-tabs.constants";

const { t } = useI18n();

useHead(() => ({
  title: t(HOME_PAGE_TITLE_KEY),
}));

definePageMeta({
  titleKey: HOME_PAGE_TITLE_KEY,
  icon: HOME_PAGE_ICON,
  order: HOME_PAGE_ORDER,
});

const dashboardStore = useDashboardStore();
const [QUESTIONS, QUESTION_THEMES] = DASHBOARD_TABS;

const activeTab = ref<DashboardTab>(QUESTIONS);

void dashboardStore.fetchAndStoreDashboardStats();

const questionTotal = computed<number>(() => dashboardStore.questionStats?.total ?? 0);
const questionThemeTotal = computed<number>(() => dashboardStore.questionThemeStats?.total ?? 0);

function onActiveTabChange(tab: DashboardTab): void {
  activeTab.value = tab;
}
</script>

<template>
  <div
    id="home-page"
    class="flex flex-col h-[calc(100dvh-var(--ui-header-height))]"
  >
    <PageHeader
      :icon="HOME_PAGE_ICON"
      :title="$t(HOME_PAGE_TITLE_KEY)"
    />

    <UContainer class="flex flex-1 flex-col min-h-0">
      <div class="flex flex-col gap-6">
        <DashboardSummaryTabs
          :active-tab="activeTab"
          :is-fetching="dashboardStore.isFetchingDashboardStats"
          :question-theme-total="questionThemeTotal"
          :question-total="questionTotal"
          @update:active-tab="onActiveTabChange"
        />

        <div v-if="dashboardStore.isFetchingDashboardStats">
          <div class="gap-4 grid grid-cols-2">
            <USkeleton
              v-for="n in 4"
              :key="n"
              class="h-64"
            />
          </div>

          <USkeleton class="h-64 mt-4"/>
        </div>

        <template v-else>
          <QuestionStatsContent
            v-if="activeTab === QUESTIONS && dashboardStore.questionStats"
            :stats="dashboardStore.questionStats"
          />

          <QuestionThemeStatsContent
            v-if="activeTab === QUESTION_THEMES && dashboardStore.questionThemeStats"
            :stats="dashboardStore.questionThemeStats"
          />
        </template>
      </div>
    </UContainer>
  </div>
</template>