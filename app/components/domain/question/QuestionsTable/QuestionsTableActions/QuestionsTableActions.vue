<script setup lang="ts">
import type { QuestionsTableActionsProperties } from "~/components/domain/question/QuestionsTable/QuestionsTableActions/questions-table-actions.types";

const props = defineProps<QuestionsTableActionsProperties>();
</script>

<template>
  <div class="flex gap-1 items-center">
    <ArchiveQuestionButton
      v-if="props.question.status !== 'archived'"
      :data-testid="`questions-table-actions-archive-${props.question.id}`"
      :question-id="props.question.id"
    />
  </div>
</template>