<script setup lang="ts">
import type { QuestionThemesTableActionsEmits, QuestionThemesTableActionsProperties } from "~/components/domain/question-theme/QuestionThemesTable/QuestionThemesTableActions/question-themes-table-actions.types";

const props = defineProps<QuestionThemesTableActionsProperties>();

const emit = defineEmits<QuestionThemesTableActionsEmits>();

function onStartEditFromEditQuestionThemeButton(id: string): void {
  emit("startEdit", id);
}
</script>

<template>
  <div class="flex gap-1 items-center">
    <EditQuestionThemeButton
      :data-testid="`question-themes-table-actions-edit-${props.questionTheme.slug}`"
      :question-theme-id="props.questionTheme.id"
      :question-theme-slug="props.questionTheme.slug"
      @start-edit="onStartEditFromEditQuestionThemeButton"
    />

    <ArchiveQuestionThemeButton
      v-if="props.questionTheme.status !== 'archived'"
      :data-testid="`question-themes-table-actions-archive-${props.questionTheme.slug}`"
      :question-theme-id="props.questionTheme.id"
      :question-theme-slug="props.questionTheme.slug"
    />
  </div>
</template>