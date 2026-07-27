<script setup lang="ts">
import NumberFlow from "@number-flow/vue";

import type { DashboardTab } from "~/composables/domain/dashboard/constants/dashboard.constants";

const props = defineProps<{
  /** Total number of questions */
  questionTotal: number;
  /** Total number of question themes */
  questionThemeTotal: number;
  /** Currently active tab */
  activeTab: DashboardTab;
  /** Whether stats are being fetched */
  isFetching: boolean;
}>();

const emit = defineEmits<{
  "update:activeTab": [tab: DashboardTab];
}>();

function onSelectQuestions(): void {
  if (props.activeTab !== "questions") {
    emit("update:activeTab", "questions");
  }
}

function onSelectQuestionThemes(): void {
  if (props.activeTab !== "questionThemes") {
    emit("update:activeTab", "questionThemes");
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
      :aria-selected="props.activeTab === 'questions'"
      class="cursor-pointer transition-all"
      :class="{
        'ring-2 ring-(--ui-primary)': props.activeTab === 'questions',
        'opacity-60': props.activeTab !== 'questions'
      }"
      role="tab"
      @click="onSelectQuestions"
    >
      <div class="flex gap-3 items-center">
        <UIcon
          class="size-8 text-(--ui-primary)"
          name="i-lucide-circle-help"
        />

        <div class="flex flex-col">
          <span class="text-(--ui-text-muted) text-sm">{{ $t("home.tabs.questions") }}</span>

          <USkeleton
            v-if="props.isFetching"
            class="h-8 w-20"
          />

          <span
            v-else
            class="font-bold text-(--ui-text) text-3xl"
          >
            <NumberFlow :value="props.questionTotal"/>
          </span>
        </div>
      </div>
    </UCard>

    <UCard
      :aria-label="$t('home.tabs.questionThemes')"
      :aria-selected="props.activeTab === 'questionThemes'"
      class="cursor-pointer transition-all"
      :class="{
        'ring-2 ring-(--ui-primary)': props.activeTab === 'questionThemes',
        'opacity-60': props.activeTab !== 'questionThemes'
      }"
      role="tab"
      @click="onSelectQuestionThemes"
    >
      <div class="flex gap-3 items-center">
        <UIcon
          class="size-8 text-(--ui-primary)"
          name="i-lucide-palette"
        />

        <div class="flex flex-col">
          <span class="text-(--ui-text-muted) text-sm">{{ $t("home.tabs.questionThemes") }}</span>

          <USkeleton
            v-if="props.isFetching"
            class="h-8 w-20"
          />

          <span
            v-else
            class="font-bold text-(--ui-text) text-3xl"
          >
            <NumberFlow :value="props.questionThemeTotal"/>
          </span>
        </div>
      </div>
    </UCard>
  </div>
</template>