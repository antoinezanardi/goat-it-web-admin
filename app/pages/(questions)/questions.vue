<script setup lang="ts">
import type { QuestionCreationDto } from "@goat-it/schemas/question";
import { computed, ref } from "vue";

import { QUESTION_ICON } from "~/composables/domain/question/question.constants";
import { QUESTIONS_PAGE_ORDER, QUESTIONS_PAGE_TITLE_KEY } from "~/pages/(questions)/questions.constants";

const questionsStore = useQuestionsStore();
const { isFetchingQuestions, isCreatingQuestion, isCreateQuestionSuccess } = storeToRefs(questionsStore);
const { t } = useI18n();

const isQuestionFormModalOpen = ref<boolean>(false);
const isSubmitting = computed<boolean>(() => isCreatingQuestion.value);

function onStartCreateFromQuestionsTable(): void {
  isQuestionFormModalOpen.value = true;
}

async function onSubmitCreationFromQuestionFormModal(questionCreationDto: QuestionCreationDto): Promise<void> {
  await questionsStore.createAndStoreQuestion(questionCreationDto);
  if (isCreateQuestionSuccess.value) {
    isQuestionFormModalOpen.value = false;
  }
}

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
          @start-create="onStartCreateFromQuestionsTable"
        />
      </Transition>
    </UContainer>

    <LazyQuestionFormModal
      v-model:open="isQuestionFormModalOpen"
      data-testid="question-form-modal"
      :is-submitting="isSubmitting"
      @submit-creation="onSubmitCreationFromQuestionFormModal"
    />
  </div>
</template>