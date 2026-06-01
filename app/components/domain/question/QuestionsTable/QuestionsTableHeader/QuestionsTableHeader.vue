<script setup lang="ts">
import type { QuestionsTableHeaderEmits, QuestionsTableHeaderProps } from "~/components/domain/question/QuestionsTable/QuestionsTableHeader/questions-table-header.types";

defineProps<QuestionsTableHeaderProps>();
const emit = defineEmits<QuestionsTableHeaderEmits>();

function onClickFromCreateQuestionButton(): void {
  emit("startCreate");
}

function onUpdateModelValueFromTableGlobalSearchInput(value: string): void {
  emit("update:searchTerm", value);
}
</script>

<template>
  <div
    id="questions-table-header"
    class="flex items-center justify-between"
  >
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
</template>