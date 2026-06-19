<script setup lang="ts">
import type { EditQuestionButtonEmits, EditQuestionButtonProps } from "~/components/domain/question/QuestionsTable/QuestionsTableActions/EditQuestionButton/edit-question-button.types";

const props = defineProps<EditQuestionButtonProps>();

const emit = defineEmits<EditQuestionButtonEmits>();

const { t } = useI18n();

const actionLabel = computed<string>(() => t("questions.actions.edit"));

function onEditClick(): void {
  emit("startEdit", props.questionId);
}
</script>

<template>
  <UTooltip :text="actionLabel">
    <UButton
      :aria-label="actionLabel"
      color="primary"
      :data-testid="`edit-button-${questionId}`"
      icon="i-lucide-pencil"
      size="xs"
      variant="outline"
      @click="onEditClick"
    />
  </UTooltip>
</template>