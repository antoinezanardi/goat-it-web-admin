<script setup lang="ts">
import type { QuestionThemeStatus } from "@goat-it/schemas/question-theme";

import type { QuestionThemesTableHeaderEmits, QuestionThemesTableHeaderProps } from "~/components/domain/question-theme/QuestionThemesTable/QuestionThemesTableHeader/question-themes-table-header.types";

defineProps<QuestionThemesTableHeaderProps>();
const emit = defineEmits<QuestionThemesTableHeaderEmits>();

function onClickFromCreateQuestionThemeButton(): void {
  emit("startCreate");
}

function onUpdateModelValueFromTableGlobalSearchInput(value: string): void {
  emit("update:searchTerm", value);
}

function onUpdateStatusFilter(value: QuestionThemeStatus | undefined): void {
  emit("update:filter", { status: value });
}

function onClearFilters(): void {
  emit("clearFilters");
}
</script>

<template>
  <div
    id="question-themes-table-header"
    class="flex flex-col gap-2"
  >
    <div class="flex items-center justify-between">
      <div class="flex gap-4 items-center">
        <TableRowCount
          :count="filteredCount"
          count-key="questionThemes.itemsCount"
          data-testid="question-themes-table-row-count"
          :loading="isLoading"
        />

        <TableGlobalSearchInput
          data-testid="question-themes-table-header-search-input"
          :model-value="searchTerm"
          @update:model-value="onUpdateModelValueFromTableGlobalSearchInput"
        />
      </div>

      <UButton
        id="create-question-theme-button"
        :aria-label="$t('questionThemes.createNew')"
        color="primary"
        icon="i-lucide-circle-plus"
        size="lg"
        @click="onClickFromCreateQuestionThemeButton"
      >
        <span class="hidden sm:inline">{{ $t('questionThemes.createNew') }}</span>
      </UButton>
    </div>

    <TableFiltersSection
      :active-filter-count="activeFilterCount"
      data-testid="question-themes-table-header-filters-section"
      @clear="onClearFilters"
    >
      <QuestionThemesTableStatusFilter
        :model-value="filters.status"
        @update:model-value="onUpdateStatusFilter"
      />
    </TableFiltersSection>
  </div>
</template>