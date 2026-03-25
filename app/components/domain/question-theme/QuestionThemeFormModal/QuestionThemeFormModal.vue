<script setup lang="ts">
import type { QuestionThemeCreationDto } from "@goat-it/schemas/question-theme";

import type { QuestionThemeFormModalEmits } from "~/components/domain/question-theme/QuestionThemeFormModal/question-theme-form-modal.types";
import type QuestionThemeForm from "~/components/domain/question-theme/QuestionThemeFormModal/QuestionThemeForm/QuestionThemeForm.vue";
import { QUESTION_THEMES_PAGE_ICON } from "~/pages/(questions-themes)/question-themes.constants";

const emit = defineEmits<QuestionThemeFormModalEmits>();

const open = defineModel<boolean>("open", { default: false });

const formReference = useTemplateRef<InstanceType<typeof QuestionThemeForm>>("formReference");

function onCloseModal(): void {
  open.value = false;
}

function onClickFromFooterPrimaryButton(): void {
  formReference.value?.triggerFormSubmit();
}

function onSubmitCreationFromForm(data: QuestionThemeCreationDto): void {
  emit("submitCreation", data);
  onCloseModal();
}
</script>

<template>
  <LazyUModal
    v-model:open="open"
    @close="onCloseModal"
  >
    <template #title>
      <DefaultModalTitle
        :icon="QUESTION_THEMES_PAGE_ICON"
        :title="$t('questionThemes.createNew')"
      />
    </template>

    <template #body>
      <QuestionThemeForm
        ref="formReference"
        @submit-creation="onSubmitCreationFromForm"
      />
    </template>

    <template #footer>
      <DefaultModalFooter
        :is-primary-button-disabled="!formReference?.isFormValid"
        primary-button-icon="i-lucide-circle-plus"
        :primary-button-label="$t('common.create')"
        @close-modal="onCloseModal"
        @primary-button-click="onClickFromFooterPrimaryButton"
      />
    </template>
  </LazyUModal>
</template>