<script setup lang="ts">
import type { QuestionsTableActionsEmits, QuestionsTableActionsProps } from "~/components/domain/question/QuestionsTable/QuestionsTableActions/questions-table-actions.types";

const props = defineProps<QuestionsTableActionsProps>();
const emit = defineEmits<QuestionsTableActionsEmits>();

function onStartEditFromEditQuestionButton(id: string): void {
  emit("startEdit", id);
}
</script>

<template>
  <div class="flex gap-1 items-center">
    <EditQuestionButton
      :data-testid="`questions-table-actions-edit-${props.question.id}`"
      :question-id="props.question.id"
      @start-edit="onStartEditFromEditQuestionButton"
    />

    <ArchiveQuestionButton
      v-if="props.question.status !== 'archived'"
      :data-testid="`questions-table-actions-archive-${props.question.id}`"
      :question-id="props.question.id"
    />
  </div>
</template>