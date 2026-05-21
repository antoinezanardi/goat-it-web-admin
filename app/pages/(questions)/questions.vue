<script setup lang="ts">
import type { QuestionCreationDto, QuestionModificationDto } from "@goat-it/schemas/question";
import { computed, ref } from "vue";

import type { Question } from "#shared/types/question.types";
import type { QuestionFormMode } from "~/components/domain/question/QuestionFormModal/QuestionForm/question-form.types";
import { QUESTION_ICON } from "~/composables/domain/question/question.constants";
import { QUESTIONS_PAGE_ORDER, QUESTIONS_PAGE_TITLE_KEY } from "~/pages/(questions)/questions.constants";

const questionsStore = useQuestionsStore();
const { isFetchingQuestions, isCreatingQuestion, isModifyingQuestion, isCreateQuestionSuccess, isModifyQuestionSuccess } = storeToRefs(questionsStore);
const { t } = useI18n();

const isQuestionFormModalOpen = ref<boolean>(false);
const formMode = ref<QuestionFormMode>("create");
const questionToEdit = ref<Question | undefined>(undefined);

const isSubmitting = computed<boolean>(() => isCreatingQuestion.value || isModifyingQuestion.value);

const formModalKey = computed<string>(() => `${formMode.value}-${questionToEdit.value?.id ?? "new"}`);

function onStartCreateFromQuestionsTable(): void {
  formMode.value = "create";
  questionToEdit.value = undefined;
  isQuestionFormModalOpen.value = true;
}

function onStartEditFromQuestionsTable(id: string): void {
  const targetQuestion = questionsStore.questions.find(question => question.id === id);
  if (!targetQuestion) {
    return;
  }
  formMode.value = "edit";
  questionToEdit.value = targetQuestion;
  isQuestionFormModalOpen.value = true;
}

async function onSubmitCreationFromQuestionFormModal(questionCreationDto: QuestionCreationDto): Promise<void> {
  await questionsStore.createAndStoreQuestion(questionCreationDto);
  if (isCreateQuestionSuccess.value) {
    isQuestionFormModalOpen.value = false;
  }
}

async function onSubmitModificationFromQuestionFormModal(questionModificationDto: QuestionModificationDto): Promise<void> {
  if (!questionToEdit.value) {
    return;
  }
  await questionsStore.modifyAndStoreQuestion(questionToEdit.value.id, questionModificationDto);
  if (isModifyQuestionSuccess.value) {
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
          @start-edit="onStartEditFromQuestionsTable"
        />
      </Transition>
    </UContainer>

    <LazyQuestionFormModal
      :key="formModalKey"
      v-model:open="isQuestionFormModalOpen"
      data-testid="question-form-modal"
      :is-submitting="isSubmitting"
      :mode="formMode"
      :question="questionToEdit"
      @submit-creation="onSubmitCreationFromQuestionFormModal"
      @submit-modification="onSubmitModificationFromQuestionFormModal"
    />
  </div>
</template>