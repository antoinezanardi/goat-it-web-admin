<script setup lang="ts">
import NumberFlow from "@number-flow/vue";

import type { DashboardSummaryTabsEmits, DashboardSummaryTabsProps } from "~/components/domain/dashboard/DashboardSummaryTabs/dashboard-summary-tabs.types";
import { DASHBOARD_TAB } from "~/components/domain/dashboard/DashboardSummaryTabs/dashboard-summary-tabs.constants";

const props = defineProps<DashboardSummaryTabsProps>();

const emit = defineEmits<DashboardSummaryTabsEmits>();

const questionsCardClass = computed<Record<string, boolean>>(() => ({
  "ring-2 ring-(--ui-primary)": props.activeTab === DASHBOARD_TAB.QUESTIONS,
}));

const questionThemesCardClass = computed<Record<string, boolean>>(() => ({
  "ring-2 ring-(--ui-primary)": props.activeTab === DASHBOARD_TAB.QUESTION_THEMES,
}));

function onSelectQuestions(): void {
  if (props.activeTab !== DASHBOARD_TAB.QUESTIONS) {
    emit("update:activeTab", DASHBOARD_TAB.QUESTIONS);
  }
}

function onSelectQuestionThemes(): void {
  if (props.activeTab !== DASHBOARD_TAB.QUESTION_THEMES) {
    emit("update:activeTab", DASHBOARD_TAB.QUESTION_THEMES);
  }
}

function onKeydownQuestions(event: KeyboardEvent): void {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    onSelectQuestions();
  }
}

function onKeydownQuestionThemes(event: KeyboardEvent): void {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    onSelectQuestionThemes();
  }
}
</script>

<template>
  <div
    class="gap-4 grid grid-cols-2"
    role="tablist"
  >
    <UCard
      :aria-label="$t('home.tabs.questions')"
      :aria-selected="props.activeTab === DASHBOARD_TAB.QUESTIONS"
      class="cursor-pointer transition-all"
      :class="questionsCardClass"
      role="tab"
      tabindex="0"
      @click="onSelectQuestions"
      @keydown="onKeydownQuestions"
    >
      <div class="flex gap-3 items-center">
        <UIcon
          class="size-12 text-primary"
          name="i-lucide-circle-help"
        />

        <div class="flex flex-col">
          <span class="text-muted text-sm">{{ $t("home.tabs.questions") }}</span>

          <USkeleton
            v-if="props.isFetching"
            class="h-8 w-20"
          />

          <span
            v-else
            class="font-bold text-3xl text-default"
          >
            <NumberFlow :value="questionTotal"/>
          </span>
        </div>
      </div>
    </UCard>

    <UCard
      :aria-label="$t('home.tabs.questionThemes')"
      :aria-selected="props.activeTab === DASHBOARD_TAB.QUESTION_THEMES"
      class="cursor-pointer transition-all"
      :class="questionThemesCardClass"
      role="tab"
      tabindex="0"
      @click="onSelectQuestionThemes"
      @keydown="onKeydownQuestionThemes"
    >
      <div class="flex gap-3 items-center">
        <UIcon
          class="size-12 text-info"
          name="i-lucide-palette"
        />

        <div class="flex flex-col">
          <span class="text-muted text-sm">{{ $t("home.tabs.questionThemes") }}</span>

          <USkeleton
            v-if="props.isFetching"
            class="h-8 w-20"
          />

          <span
            v-else
            class="font-bold text-3xl text-default"
          >
            <NumberFlow :value="questionThemeTotal"/>
          </span>
        </div>
      </div>
    </UCard>
  </div>
</template>