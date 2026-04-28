<script setup lang="ts">
import type { QuestionThemesTableHeaderEmits, QuestionThemesTableHeaderProps } from "~/components/domain/question-theme/QuestionThemesTable/QuestionThemesTableHeader/question-themes-table-header.types";

defineProps<QuestionThemesTableHeaderProps>();
const emit = defineEmits<QuestionThemesTableHeaderEmits>();

function onClickFromCreateQuestionThemeButton(): void {
  emit("startCreate");
}

function onUpdateModelValueFromTableGlobalFilterInput(value: string): void {
  emit("update:searchTerm", value);
}
</script>

<template>
  <div
    id="question-themes-table-header"
    class="flex items-center justify-between"
  >
    <TableGlobalFilterInput
      data-testid="question-themes-table-header-filter-input"
      :model-value="searchTerm"
      @update:model-value="onUpdateModelValueFromTableGlobalFilterInput"
    />

    <UButton
      id="create-question-theme-button"
      color="primary"
      icon="i-lucide-circle-plus"
      :label="$t('questionThemes.createNew')"
      size="lg"
      @click="onClickFromCreateQuestionThemeButton"
    />
  </div>
</template>