<script setup lang="ts">
import type { QuestionCreationDto, QuestionModificationDto } from "@goat-it/schemas/question";
import { computed, ref } from "vue";

import type { Question } from "#shared/types/question.types";
import type QuestionFormModal from "~/components/domain/question/QuestionFormModal/QuestionFormModal.vue";
import type { QuestionFormMode } from "~/components/domain/question/QuestionFormModal/QuestionForm/question-form.types";
import { QUESTION_ICON } from "~/composables/domain/question/question.constants";
import { QUESTIONS_PAGE_ORDER, QUESTIONS_PAGE_TITLE_KEY } from "~/pages/(questions)/questions.constants";

const questionsStore = useQuestionsStore();
const { isCreatingQuestion, isModifyingQuestion, isCreateQuestionSuccess, isModifyQuestionSuccess } = storeToRefs(questionsStore);
const { t } = useI18n();

const isQuestionFormModalOpen = ref<boolean>(false);
const formMode = ref<QuestionFormMode>("create");
const questionToEditId = ref<string | undefined>(undefined);

const formModalReference = useTemplateRef<InstanceType<typeof QuestionFormModal>>("formModalRef");

// Acceptable as `return` is the same as `return undefined`
// oxlint-disable-next-line vue/return-in-computed-property
const questionToEdit = computed<Question | undefined>(() => {
  if (!questionToEditId.value) {
    return;
  }
  return questionsStore.questions.find(question => question.id === questionToEditId.value);
});

const isSubmitting = computed<boolean>(() => isCreatingQuestion.value || isModifyingQuestion.value);

const formModalKey = computed<string>(() => `${formMode.value}-${questionToEdit.value?.id ?? "new"}`);

function onStartCreateFromQuestionsTable(): void {
  formMode.value = "create";
  questionToEditId.value = undefined;
  isQuestionFormModalOpen.value = true;
}

function onStartEditFromQuestionsTable(id: string): void {
  const doesTargetQuestionExist = questionsStore.questions.some(question => question.id === id);
  if (!doesTargetQuestionExist) {
    return;
  }
  formMode.value = "edit";
  questionToEditId.value = id;
  isQuestionFormModalOpen.value = true;
}

async function onSubmitCreationFromQuestionFormModal(questionCreationDto: QuestionCreationDto): Promise<void> {
  await questionsStore.createAndStoreQuestion(questionCreationDto);
  if (isCreateQuestionSuccess.value) {
    formModalReference.value?.forceClose();
  }
}

async function onSubmitModificationFromQuestionFormModal(questionModificationDto: QuestionModificationDto): Promise<void> {
  if (!questionToEdit.value) {
    return;
  }
  await questionsStore.modifyAndStoreQuestion(questionToEdit.value.id, questionModificationDto);
  if (isModifyQuestionSuccess.value) {
    formModalReference.value?.forceClose();
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
  <div
    id="questions-page"
    class="flex flex-col h-[calc(100dvh-var(--ui-header-height))]"
  >
    <PageHeader
      :icon="QUESTION_ICON"
      :title="$t(QUESTIONS_PAGE_TITLE_KEY)"
    />

    <UContainer class="flex flex-1 flex-col min-h-0">
      <QuestionsTable
        id="questions-table"
        class="max-h-full"
        @start-create="onStartCreateFromQuestionsTable"
        @start-edit="onStartEditFromQuestionsTable"
      />
    </UContainer>

    <LazyQuestionFormModal
      :key="formModalKey"
      ref="formModalRef"
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