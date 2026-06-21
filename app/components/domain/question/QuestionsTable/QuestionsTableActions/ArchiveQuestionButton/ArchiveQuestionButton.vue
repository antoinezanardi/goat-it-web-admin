<script setup lang="ts">
import ConfirmDialog from "~/components/shared/ui/modal/ConfirmDialog/ConfirmDialog.vue";
import type { ArchiveQuestionButtonProps } from "~/components/domain/question/QuestionsTable/QuestionsTableActions/ArchiveQuestionButton/archive-question-button.types";

const props = defineProps<ArchiveQuestionButtonProps>();

const { t } = useI18n();
const overlay = useOverlay();
const confirmDialog = overlay.create(ConfirmDialog);
const questionsStore = useQuestionsStore();

const actionLabel = computed<string>(() => t("questions.actions.archive"));

async function onArchiveClick(): Promise<void> {
  const { result } = confirmDialog.open({
    icon: "i-lucide-archive",
    title: t("questions.archive.confirmTitle"),
    description: t("questions.archive.confirmDescription"),
  });
  const confirmed = await result;
  if (!confirmed) {
    return;
  }
  await questionsStore.archiveAndStoreQuestion(props.questionId);
}
</script>

<template>
  <UTooltip :text="actionLabel">
    <UButton
      :aria-label="actionLabel"
      class="archive-question-button"
      color="error"
      icon="i-lucide-archive"
      size="xs"
      variant="outline"
      @click="onArchiveClick"
    />
  </UTooltip>
</template>