<script setup lang="ts">
import type { EditQuestionThemeButtonEmits, EditQuestionThemeButtonProperties } from "~/components/domain/question-theme/QuestionThemesTable/QuestionThemesTableActions/EditQuestionThemeButton/edit-question-theme-button.types";

const props = defineProps<EditQuestionThemeButtonProperties>();

const emit = defineEmits<EditQuestionThemeButtonEmits>();

const { t } = useI18n();

const actionLabel = computed<string>(() => t("questionThemes.actions.edit", { slug: props.questionThemeSlug }));

function onEditClick(): void {
  emit("startEdit", props.questionThemeId);
}
</script>

<template>
  <UTooltip :text="actionLabel">
    <UButton
      :aria-label="actionLabel"
      color="primary"
      :data-testid="`edit-button-${questionThemeSlug}`"
      icon="i-lucide-pencil"
      size="xs"
      variant="outline"
      @click="onEditClick"
    />
  </UTooltip>
</template>