<script setup lang="ts">
import type { QuestionThemesTableHeaderEmits, QuestionThemesTableHeaderProps } from "~/components/domain/question-theme/QuestionThemesTable/QuestionThemesTableHeader/question-themes-table-header.types";

defineProps<QuestionThemesTableHeaderProps>();
const emit = defineEmits<QuestionThemesTableHeaderEmits>();

function onClickFromCreateQuestionThemeButton(): void {
  emit("startCreate");
}

function onUpdateModelValueFromTableGlobalSearchInput(value: string): void {
  emit("update:searchTerm", value);
}
</script>

<template>
  <div
    id="question-themes-table-header"
    class="flex items-center justify-between"
  >
    <TableGlobalSearchInput
      data-testid="question-themes-table-header-search-input"
      :model-value="searchTerm"
      @update:model-value="onUpdateModelValueFromTableGlobalSearchInput"
    />

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
</template>