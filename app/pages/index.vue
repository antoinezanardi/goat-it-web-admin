<script setup lang="ts">
import type { DashboardTab } from "~/composables/domain/dashboard/constants/dashboard.constants";
import { HOME_PAGE_ICON, HOME_PAGE_ORDER, HOME_PAGE_TITLE_KEY } from "~/pages/index.constants";

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
const activeTab = ref<DashboardTab>("questions");

void dashboardStore.fetchAndStoreDashboardStats();

const questionTotal = computed<number>(() => dashboardStore.questionStats?.total ?? 0);
const questionThemeTotal = computed<number>(() => dashboardStore.questionThemeStats?.total ?? 0);

function onActiveTabChange(tab: DashboardTab): void {
  activeTab.value = tab;
}
</script>

<template>
  <div id="home-page">
    <PageHeader
      :icon="HOME_PAGE_ICON"
      :title="$t(HOME_PAGE_TITLE_KEY)"
    />

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
          v-if="activeTab === 'questions' && dashboardStore.questionStats"
          :stats="dashboardStore.questionStats"
        />

        <QuestionThemeStatsContent
          v-if="activeTab === 'questionThemes' && dashboardStore.questionThemeStats"
          :stats="dashboardStore.questionThemeStats"
        />
      </template>
    </div>
  </div>
</template>