<script setup lang="ts">
import type { QuestionThemeCreationDto } from "@goat-it/schemas/question-theme";

import { QUESTION_THEME_FORM_MODAL_UI } from "~/components/domain/question-theme/QuestionThemeFormModal/question-theme-form-modal.constants";
import type { QuestionThemeFormModalEmits, QuestionThemeFormModalProperties } from "~/components/domain/question-theme/QuestionThemeFormModal/question-theme-form-modal.types";
import type QuestionThemeForm from "~/components/domain/question-theme/QuestionThemeFormModal/QuestionThemeForm/QuestionThemeForm.vue";
import { QUESTION_THEME_ICON } from "~/composables/domain/question-theme/question-theme.constants";

const props = withDefaults(defineProps<QuestionThemeFormModalProperties>(), {
  isCreating: false,
});

const emit = defineEmits<QuestionThemeFormModalEmits>();

const open = defineModel<boolean>("open", { default: false });

const formReference = useTemplateRef<InstanceType<typeof QuestionThemeForm>>("formReference");

function onClickFromFooterPrimaryButton(): void {
  formReference.value?.triggerFormSubmit();
}

function onSubmitCreationFromForm(data: QuestionThemeCreationDto): void {
  emit("submitCreation", data);
}

function onCloseModal(): void {
  if (!props.isCreating) {
    open.value = false;
  }
}
</script>

<template>
  <!-- [V8 SOURCE MAPPING ISSUE] Acceptable, LazyUModal is tested, but the coverage report is not able to recognize it. */ -->
  <!-- v8 ignore start -->
  <LazyUModal
    v-model:open="open"
    :close="!isCreating"
    :dismissible="!isCreating"
    :ui="QUESTION_THEME_FORM_MODAL_UI"
  >
    <template #title>
      <DefaultModalTitle
        :icon="QUESTION_THEME_ICON"
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
        :is-close-button-disabled="isCreating"
        :is-primary-button-disabled="!formReference?.isFormValid"
        :is-primary-button-loading="isCreating"
        primary-button-icon="i-lucide-circle-plus"
        :primary-button-label="$t('common.create')"
        @close-modal="onCloseModal"
        @primary-button-click="onClickFromFooterPrimaryButton"
      />
    </template>
  </LazyUModal>
  <!-- v8 ignore stop -->
</template>