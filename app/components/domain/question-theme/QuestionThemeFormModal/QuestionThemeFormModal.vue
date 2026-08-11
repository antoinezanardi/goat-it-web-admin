<script setup lang="ts">
import type { QuestionThemeCreationDto, QuestionThemeModificationDto } from "@goat-it/schemas/question-theme";
import { nextTick, watch } from "vue";

import { QUESTION_THEME_ICON } from "~/composables/domain/question-theme/constants/question-theme.constants";
import { QUESTION_THEME_FORM_MODAL_UI } from "~/components/domain/question-theme/QuestionThemeFormModal/question-theme-form-modal.constants";
import type { QuestionThemeFormModalEmits, QuestionThemeFormModalProps } from "~/components/domain/question-theme/QuestionThemeFormModal/question-theme-form-modal.types";
import type QuestionThemeForm from "~/components/domain/question-theme/QuestionThemeFormModal/QuestionThemeForm/QuestionThemeForm.vue";
import { useFormDirtyGuard } from "~/composables/ui/useFormDirtyGuard/useFormDirtyGuard";

const props = withDefaults(defineProps<QuestionThemeFormModalProps>(), {
  mode: "create",
  questionTheme: undefined,
  isSubmitting: false,
});

const emit = defineEmits<QuestionThemeFormModalEmits>();

const open = defineModel<boolean>("open", { default: false });

const formReference = useTemplateRef<InstanceType<typeof QuestionThemeForm>>("formReference");

const isDirty = computed<boolean>(() => formReference.value?.isDirty ?? false);

const { onRequestClose, forceClose, isGuardDialogOpen } = useFormDirtyGuard(open, isDirty, {
  titleKey: "common.unsavedChanges.title",
  descriptionKey: "common.unsavedChanges.description",
});

watch(open, async isOpen => {
  if (!isOpen) {
    return;
  }
  await nextTick();
  await formReference.value?.focusFirstField();
}, { immediate: true });

const modalTitle = computed<string>(() => (props.mode === "edit" ? "questionThemes.editTheme" : "questionThemes.createNew"));
const primaryButtonLabel = computed<string>(() => (props.mode === "edit" ? "common.edit" : "common.create"));
const primaryButtonIcon = computed<string>(() => (props.mode === "edit" ? "i-lucide-pencil" : "i-lucide-circle-plus"));
const formKey = computed<string>(() => `${props.mode}-${props.questionTheme?.id ?? "new"}`);

async function onClickFromFooterPrimaryButton(): Promise<void> {
  await formReference.value?.triggerFormSubmit();
}

function onSubmitCreationFromForm(data: QuestionThemeCreationDto): void {
  emit("submitCreation", data);
}

function onSubmitModificationFromForm(data: QuestionThemeModificationDto): void {
  emit("submitModification", data);
}

defineExpose({ isDirty, forceClose });
</script>

<template>
  <UModal
    v-model:open="open"
    :close="!isSubmitting"
    :dismissible="!isSubmitting"
    :ui="QUESTION_THEME_FORM_MODAL_UI"
  >
    <template #title>
      <DefaultModalTitle
        data-testid="question-theme-form-modal-title"
        :icon="QUESTION_THEME_ICON"
        :title="$t(modalTitle)"
      />
    </template>

    <template #actions>
      <QuestionThemeTranslationCompletenessIndicator
        v-if="mode === 'edit' && questionTheme"
        :question-theme="questionTheme"
      />
    </template>

    <template #body>
      <QuestionThemeForm
        :key="formKey"
        ref="formReference"
        data-testid="question-theme-form-modal-form"
        :existing-slugs="existingSlugs"
        :mode="mode"
        :question-theme="questionTheme"
        @submit-creation="onSubmitCreationFromForm"
        @submit-modification="onSubmitModificationFromForm"
      />
    </template>

    <template #footer>
      <DefaultModalFooter
        data-testid="question-theme-form-modal-footer"
        :disable-shortcuts="isGuardDialogOpen"
        :is-close-button-disabled="isSubmitting"
        :is-primary-button-disabled="!formReference?.canSubmit"
        :is-primary-button-loading="isSubmitting"
        :primary-button-icon="primaryButtonIcon"
        :primary-button-label="$t(primaryButtonLabel)"
        @close-modal="onRequestClose"
        @primary-button-click="onClickFromFooterPrimaryButton"
      />
    </template>
  </UModal>
</template>