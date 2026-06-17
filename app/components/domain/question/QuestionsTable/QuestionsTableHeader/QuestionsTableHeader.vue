<script setup lang="ts">
import type { QuestionCategory, QuestionCognitiveDifficulty, QuestionStatus } from "@goat-it/schemas/question";

import type { QuestionsTableHeaderEmits, QuestionsTableHeaderProps } from "~/components/domain/question/QuestionsTable/QuestionsTableHeader/questions-table-header.types";

defineProps<QuestionsTableHeaderProps>();
const emit = defineEmits<QuestionsTableHeaderEmits>();

function onClickFromCreateQuestionButton(): void {
  emit("startCreate");
}

function onUpdateModelValueFromTableGlobalSearchInput(value: string): void {
  emit("update:searchTerm", value);
}

function onUpdateStatusFilter(value: QuestionStatus | undefined): void {
  emit("update:filter", { status: value });
}

function onUpdateCategoryFilter(value: QuestionCategory | undefined): void {
  emit("update:filter", { category: value });
}

function onUpdateCognitiveDifficultyFilter(value: QuestionCognitiveDifficulty | undefined): void {
  emit("update:filter", { cognitiveDifficulty: value });
}

function onClearFilters(): void {
  emit("clearFilters");
}
</script>

<template>
  <div
    id="questions-table-header"
    class="flex flex-col gap-2"
  >
    <div class="flex items-center justify-between">
      <TableGlobalSearchInput
        data-testid="questions-table-header-search-input"
        :model-value="searchTerm"
        @update:model-value="onUpdateModelValueFromTableGlobalSearchInput"
      />

      <UButton
        :aria-label="$t('questions.createNew')"
        color="primary"
        data-testid="create-question-button"
        icon="i-lucide-circle-plus"
        size="lg"
        @click="onClickFromCreateQuestionButton"
      >
        <span class="hidden sm:inline">{{ $t('questions.createNew') }}</span>
      </UButton>
    </div>

    <TableFiltersSection
      :active-filter-count="activeFilterCount"
      data-testid="questions-table-header-filters-section"
      @clear="onClearFilters"
    >
      <QuestionsTableStatusFilter
        :model-value="filters.status"
        @update:model-value="onUpdateStatusFilter"
      />

      <QuestionsTableCategoryFilter
        :model-value="filters.category"
        @update:model-value="onUpdateCategoryFilter"
      />

      <QuestionsTableCognitiveDifficultyFilter
        :model-value="filters.cognitiveDifficulty"
        @update:model-value="onUpdateCognitiveDifficultyFilter"
      />
    </TableFiltersSection>
  </div>
</template>