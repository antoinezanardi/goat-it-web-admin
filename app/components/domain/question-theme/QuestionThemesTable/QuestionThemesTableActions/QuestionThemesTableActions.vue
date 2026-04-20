<script setup lang="ts">
import type { QuestionThemesTableActionsProperties } from "~/components/domain/question-theme/QuestionThemesTable/QuestionThemesTableActions/question-themes-table-actions.types";

defineProps<QuestionThemesTableActionsProperties>();
</script>

<template>
  <div class="flex gap-1 items-center">
    <ArchiveQuestionThemeButton
      v-if="questionTheme.status !== 'archived'"
      :data-testid="`question-themes-table-actions-archive-${questionTheme.slug}`"
      :question-theme-id="questionTheme.id"
      :question-theme-slug="questionTheme.slug"
    />
  </div>
</template>