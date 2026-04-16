<script setup lang="ts">
import type { QuestionThemeCreationDto } from "@goat-it/schemas/question-theme";
import { ref } from "vue";

import { useQuestionThemesStore } from "~/stores/domain/question-theme/question-themes.store";
import { QUESTION_THEME_ICON } from "~/composables/domain/question-theme/question-theme.constants";
import { QUESTION_THEMES_PAGE_ORDER, QUESTION_THEMES_PAGE_TITLE_KEY } from "~/pages/(questions-themes)/question-themes.constants";

const questionThemesStore = useQuestionThemesStore();
const { t } = useI18n();

const { isFetchingQuestionThemes, isCreatingQuestionTheme, isCreateQuestionThemeSuccess, questionThemeSlugs } = storeToRefs(questionThemesStore);

const isQuestionThemeFormModalOpen = ref<boolean>(false);

function onStartCreateFromQuestionThemesTable(): void {
  isQuestionThemeFormModalOpen.value = true;
}

async function onSubmitCreationFromQuestionThemeFormModal(questionThemeCreationDto: QuestionThemeCreationDto): Promise<void> {
  await questionThemesStore.createAndStoreQuestionTheme(questionThemeCreationDto);
  if (isCreateQuestionThemeSuccess.value) {
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
      <Transition
        mode="out-in"
        name="fade-slide-up"
      >
        <LoadingSpinner
          v-if="isFetchingQuestionThemes"
          id="question-themes-fetching-spinner"
          :label="$t('questionThemes.fetching')"
        />

        <QuestionThemesTable
          v-else
          id="question-themes-table"
          @start-create="onStartCreateFromQuestionThemesTable"
        />
      </Transition>
    </UContainer>

    <LazyQuestionThemeFormModal
      v-model:open="isQuestionThemeFormModalOpen"
      data-testid="question-theme-form-modal"
      :existing-slugs="questionThemeSlugs"
      :is-creating="isCreatingQuestionTheme"
      @submit-creation="onSubmitCreationFromQuestionThemeFormModal"
    />
  </div>
</template>