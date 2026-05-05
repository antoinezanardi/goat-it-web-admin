<script setup lang="ts">
import { QUESTION_ICON } from "~/composables/domain/question/question.constants";
import { QUESTIONS_PAGE_ORDER, QUESTIONS_PAGE_TITLE_KEY } from "~/pages/(questions)/questions.constants";

const questionsStore = useQuestionsStore();
const { isFetchingQuestions } = storeToRefs(questionsStore);
const { t } = useI18n();

void callOnce(questionsStore.fetchAndStoreQuestions);

useHead(() => ({
  title: t(QUESTIONS_PAGE_TITLE_KEY),
}));

definePageMeta({
  titleKey: QUESTIONS_PAGE_TITLE_KEY,
  icon: QUESTION_ICON,
  order: QUESTIONS_PAGE_ORDER,
});
</script>

<template>
  <div id="questions-page">
    <PageHeader
      :icon="QUESTION_ICON"
      :title="$t(QUESTIONS_PAGE_TITLE_KEY)"
    />

    <UContainer>
      <Transition
        mode="out-in"
        name="fade-slide-up"
      >
        <LoadingSpinner
          v-if="isFetchingQuestions"
          id="questions-fetching-spinner"
          :label="$t('questions.fetching')"
        />

        <QuestionsTable
          v-else
          id="questions-table"
        />
      </Transition>
    </UContainer>
  </div>
</template>