<script setup lang="ts">
import type { QuestionCreationDto, QuestionModificationDto } from "@goat-it/schemas/question";
import { nextTick, watch } from "vue";

import { QUESTION_FORM_MODAL_UI } from "~/components/domain/question/QuestionFormModal/question-form-modal.constants";
import type { QuestionFormModalEmits, QuestionFormModalProps } from "~/components/domain/question/QuestionFormModal/question-form-modal.types";
import type QuestionForm from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionForm.vue";
import { QUESTION_ICON } from "~/composables/domain/question/question.constants";

const props = withDefaults(defineProps<QuestionFormModalProps>(), {
  mode: "create",
  question: undefined,
  isSubmitting: false,
});

const emit = defineEmits<QuestionFormModalEmits>();

const open = defineModel<boolean>("open", { default: false });

const formReference = useTemplateRef<InstanceType<typeof QuestionForm>>("formReference");

watch(open, async isOpen => {
  if (!isOpen) {
    return;
  }
  await nextTick();
  await formReference.value?.focusFirstField();
}, { immediate: true });

const questionThemesStore = useQuestionThemesStore();
const availableThemes = computed<QuestionTheme[]>(() => questionThemesStore.questionThemes);

const modalTitle = computed<string>(() => (props.mode === "edit" ? "questions.editQuestion" : "questions.createNew"));
const primaryButtonLabel = computed<string>(() => (props.mode === "edit" ? "common.edit" : "common.create"));
const primaryButtonIcon = computed<string>(() => (props.mode === "edit" ? "i-lucide-pencil" : "i-lucide-circle-plus"));

async function onClickFromFooterPrimaryButton(): Promise<void> {
  await formReference.value?.triggerFormSubmit();
}

function onSubmitCreationFromForm(data: QuestionCreationDto): void {
  emit("submitCreation", data);
}

function onSubmitModificationFromForm(data: QuestionModificationDto): void {
  emit("submitModification", data);
}

function onCloseModal(): void {
  open.value = false;
}
</script>

<template>
  <UModal
    v-model:open="open"
    :close="!isSubmitting"
    :dismissible="!isSubmitting"
    :ui="QUESTION_FORM_MODAL_UI"
  >
    <template #title>
      <DefaultModalTitle
        data-testid="question-form-modal-title"
        :icon="QUESTION_ICON"
        :title="$t(modalTitle)"
      />
    </template>

    <template #body>
      <QuestionForm
        ref="formReference"
        :available-themes="availableThemes"
        data-testid="question-form-modal-form"
        :mode="mode"
        :question="question"
        @submit-creation="onSubmitCreationFromForm"
        @submit-modification="onSubmitModificationFromForm"
      />
    </template>

    <template #footer>
      <DefaultModalFooter
        data-testid="question-form-modal-footer"
        :is-close-button-disabled="isSubmitting"
        :is-primary-button-disabled="!formReference?.canSubmit"
        :is-primary-button-loading="isSubmitting"
        :primary-button-icon="primaryButtonIcon"
        :primary-button-label="$t(primaryButtonLabel)"
        @close-modal="onCloseModal"
        @primary-button-click="onClickFromFooterPrimaryButton"
      />
    </template>
  </UModal>
</template>