<script setup lang="ts">
import type { EditQuestionThemeButtonEmits, EditQuestionThemeButtonProperties } from "~/components/domain/question-theme/QuestionThemesTable/QuestionThemesTableActions/EditQuestionThemeButton/edit-question-theme-button.types";

const props = defineProps<EditQuestionThemeButtonProperties>();

const emit = defineEmits<EditQuestionThemeButtonEmits>();

const { t } = useI18n();

function onEditClick(): void {
  emit("startEdit", props.questionThemeId);
}
</script>

<template>
  <UTooltip :text="t('questionThemes.actions.edit', { 'slug': questionThemeSlug })">
    <UButton
      :aria-label="t('questionThemes.actions.edit', { 'slug': questionThemeSlug })"
      color="primary"
      :data-testid="`edit-button-${questionThemeSlug}`"
      icon="i-lucide-pencil"
      size="xs"
      variant="outline"
      @click="onEditClick"
    />
  </UTooltip>
</template>