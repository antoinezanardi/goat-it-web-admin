<script setup lang="ts">
import type { QuestionThemesTableHeaderEmits } from "~/components/domain/question-theme/QuestionThemesTable/QuestionThemesTableHeader/question-themes-table-header.types";

const emit = defineEmits<QuestionThemesTableHeaderEmits>();

function onClickFromCreateQuestionThemeButton(): void {
  emit("startCreate");
}
</script>

<template>
  <div
    id="question-themes-table-header"
    class="flex justify-end"
  >
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