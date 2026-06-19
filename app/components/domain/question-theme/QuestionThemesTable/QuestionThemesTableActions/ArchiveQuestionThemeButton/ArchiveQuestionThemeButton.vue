<script setup lang="ts">
import ConfirmDialog from "~/components/shared/ui/modal/ConfirmDialog/ConfirmDialog.vue";
import type { ArchiveQuestionThemeButtonProps } from "~/components/domain/question-theme/QuestionThemesTable/QuestionThemesTableActions/ArchiveQuestionThemeButton/archive-question-theme-button.types";

const props = defineProps<ArchiveQuestionThemeButtonProps>();

const { t } = useI18n();
const overlay = useOverlay();
const confirmDialog = overlay.create(ConfirmDialog);
const questionThemesStore = useQuestionThemesStore();

const actionLabel = computed<string>(() => t("questionThemes.actions.archive", { slug: props.questionThemeSlug }));

async function onArchiveClick(): Promise<void> {
  const { result } = confirmDialog.open({
    icon: "i-lucide-archive",
    title: t("questionThemes.archive.confirmTitle"),
    description: t("questionThemes.archive.confirmDescription"),
  });
  const confirmed = await result;
  if (!confirmed) {
    return;
  }
  await questionThemesStore.archiveAndStoreQuestionTheme(props.questionThemeId);
}
</script>

<template>
  <UTooltip :text="actionLabel">
    <UButton
      :aria-label="actionLabel"
      color="error"
      :data-testid="`archive-button-${questionThemeSlug}`"
      icon="i-lucide-archive"
      size="xs"
      variant="outline"
      @click="onArchiveClick"
    />
  </UTooltip>
</template>