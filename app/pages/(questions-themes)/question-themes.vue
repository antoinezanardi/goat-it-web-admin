<script setup lang="ts">
import type { QuestionThemeCreationDto, QuestionThemeModificationDto } from "@goat-it/schemas/question-theme";
import { computed, ref } from "vue";

import { QUESTION_THEME_ICON } from "~/composables/domain/question-theme/constants/question-theme.constants";
import { useQuestionThemesStore } from "~/stores/domain/question-theme/question-themes.store";
import { QUESTION_THEMES_PAGE_ORDER, QUESTION_THEMES_PAGE_TITLE_KEY } from "~/pages/(questions-themes)/question-themes.constants";
import type { QuestionThemeFormMode } from "~/components/domain/question-theme/QuestionThemeFormModal/QuestionThemeForm/question-theme-form.types";

const questionThemesStore = useQuestionThemesStore();
const { t } = useI18n();

const {
  isCreatingQuestionTheme,
  isCreateQuestionThemeSuccess,
  isModifyingQuestionTheme,
  isModifyQuestionThemeSuccess,
  questionThemeSlugs,
} = storeToRefs(questionThemesStore);

const isQuestionThemeFormModalOpen = ref<boolean>(false);
const formMode = ref<QuestionThemeFormMode>("create");
const questionThemeToEdit = ref<QuestionTheme | undefined>(undefined);

const isSubmitting = computed<boolean>(() => isCreatingQuestionTheme.value || isModifyingQuestionTheme.value);

function onStartCreateFromQuestionThemesTable(): void {
  formMode.value = "create";
  questionThemeToEdit.value = undefined;
  isQuestionThemeFormModalOpen.value = true;
}

function onStartEditFromQuestionThemesTable(id: string): void {
  const targetTheme = questionThemesStore.questionThemes.find(theme => theme.id === id);
  if (!targetTheme) {
    return;
  }
  formMode.value = "edit";
  questionThemeToEdit.value = targetTheme;
  isQuestionThemeFormModalOpen.value = true;
}

async function onSubmitCreationFromQuestionThemeFormModal(questionThemeCreationDto: QuestionThemeCreationDto): Promise<void> {
  await questionThemesStore.createAndStoreQuestionTheme(questionThemeCreationDto);
  if (isCreateQuestionThemeSuccess.value) {
    isQuestionThemeFormModalOpen.value = false;
  }
}

async function onSubmitModificationFromQuestionThemeFormModal(questionThemeModificationDto: QuestionThemeModificationDto): Promise<void> {
  if (!questionThemeToEdit.value) {
    return;
  }
  await questionThemesStore.modifyAndStoreQuestionTheme(questionThemeToEdit.value.id, questionThemeModificationDto);
  if (isModifyQuestionThemeSuccess.value) {
    isQuestionThemeFormModalOpen.value = false;
  }
}

useHead(() => ({
  title: t(QUESTION_THEMES_PAGE_TITLE_KEY),
}));

definePageMeta({
  titleKey: QUESTION_THEMES_PAGE_TITLE_KEY,
  icon: QUESTION_THEME_ICON,
  order: QUESTION_THEMES_PAGE_ORDER,
});
</script>

<template>
  <div id="question-themes-page">
    <PageHeader
      :icon="QUESTION_THEME_ICON"
      :title="$t(QUESTION_THEMES_PAGE_TITLE_KEY)"
    />

    <UContainer>
      <QuestionThemesTable
        id="question-themes-table"
        @start-create="onStartCreateFromQuestionThemesTable"
        @start-edit="onStartEditFromQuestionThemesTable"
      />
    </UContainer>

    <LazyQuestionThemeFormModal
      v-model:open="isQuestionThemeFormModalOpen"
      data-testid="question-theme-form-modal"
      :existing-slugs="questionThemeSlugs"
      :is-submitting="isSubmitting"
      :mode="formMode"
      :question-theme="questionThemeToEdit"
      @submit-creation="onSubmitCreationFromQuestionThemeFormModal"
      @submit-modification="onSubmitModificationFromQuestionThemeFormModal"
    />
  </div>
</template>