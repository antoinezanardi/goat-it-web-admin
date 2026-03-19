<script setup lang="ts">
import { PageHeader, LoadingSpinner, QuestionThemesTable, UContainer } from "#components";

import { QUESTION_THEMES_PAGE_ICON, QUESTION_THEMES_PAGE_TITLE_KEY } from "~/pages/(questions-themes)/question-themes.constants";

const questionThemesStore = useQuestionThemesStore();
const { t } = useI18n();

const { isFetchingQuestionThemes } = storeToRefs(questionThemesStore);

useHead(() => ({
  title: t(QUESTION_THEMES_PAGE_TITLE_KEY),
}));

definePageMeta({
  titleKey: QUESTION_THEMES_PAGE_TITLE_KEY,
  icon: QUESTION_THEMES_PAGE_ICON,
});
</script>

<template>
  <div id="question-themes-page">
    <PageHeader
      :icon="QUESTION_THEMES_PAGE_ICON"
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
        />
      </Transition>
    </UContainer>
  </div>
</template>