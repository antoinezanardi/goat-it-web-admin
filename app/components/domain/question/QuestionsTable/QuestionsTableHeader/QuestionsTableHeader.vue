<script setup lang="ts">
import type { QuestionsTableHeaderEmits, QuestionsTableHeaderProps } from "~/components/domain/question/QuestionsTable/QuestionsTableHeader/questions-table-header.types";

defineProps<QuestionsTableHeaderProps>();
const emit = defineEmits<QuestionsTableHeaderEmits>();

function onClickFromCreateQuestionButton(): void {
  emit("startCreate");
}

function onUpdateModelValueFromTableGlobalFilterInput(value: string): void {
  emit("update:searchTerm", value);
}
</script>

<template>
  <div
    id="questions-table-header"
    class="flex items-center justify-between"
  >
    <TableGlobalFilterInput
      data-testid="questions-table-header-filter-input"
      :model-value="searchTerm"
      @update:model-value="onUpdateModelValueFromTableGlobalFilterInput"
    />

    <UButton
      id="create-question-button"
      color="primary"
      icon="i-lucide-circle-plus"
      :label="$t('questions.createNew')"
      size="lg"
      @click="onClickFromCreateQuestionButton"
    />
  </div>
</template>