<script setup lang="ts">
import { QUESTION_SOURCE_URLS_MAX_ITEMS } from "@goat-it/schemas/question";
import { z } from "zod";

import type { QuestionSourceUrlsInputEmits, QuestionSourceUrlsInputProperties } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionSourceUrlsInput/question-source-urls-input.types";

const props = defineProps<QuestionSourceUrlsInputProperties>();
const emit = defineEmits<QuestionSourceUrlsInputEmits>();

const { t } = useI18n();

const errorMessage = ref<string>();

const displayValue = ref<string[]>([]);

watch(() => props.modelValue, value => {
  displayValue.value = [...value];
}, { immediate: true });

const isMaxReached = computed<boolean>(() => props.modelValue.length >= QUESTION_SOURCE_URLS_MAX_ITEMS);

const urlSchema = z.url();

function isValidUrl(value: string): boolean {
  return urlSchema.safeParse(value).success;
}

function onUpdateModelValue(updatedValue: string[]): void {
  if (updatedValue.length <= props.modelValue.length) {
    errorMessage.value = undefined;
    emit("update:modelValue", updatedValue);

    return;
  }
  if (isMaxReached.value) {
    errorMessage.value = t("questions.errors.maxSourceUrls");
    displayValue.value = [...props.modelValue];

    return;
  }
  const addedUrl = updatedValue.at(-1);

  if (!addedUrl) {
    return;
  }
  if (!isValidUrl(addedUrl)) {
    errorMessage.value = t("questions.errors.invalidUrl");
    displayValue.value = [...props.modelValue];

    return;
  }
  if (props.modelValue.includes(addedUrl)) {
    errorMessage.value = t("questions.errors.duplicateUrl");
    displayValue.value = [...props.modelValue];

    return;
  }
  errorMessage.value = undefined;
  emit("update:modelValue", updatedValue);
}

function removeTooltipText(item: string): string {
  return t("questions.form.removeSource", { value: item });
}
</script>

<template>
  <InputTagsField
    :add-hint-text="$t('questions.form.addSourceUrlHint')"
    data-testid="question-source-urls-input"
    duplicate
    :error="errorMessage"
    :label="$t('questions.fields.sourceUrls')"
    :model-value="displayValue"
    name="sourceUrls"
    :placeholder="$t('questions.placeholders.sourceUrls')"
    :remove-tooltip-text="removeTooltipText"
    required
    @update:model-value="onUpdateModelValue"
  >
    <template #itemText="{ item }">
      <QuestionSourceUrlTag :url="item"/>
    </template>
  </InputTagsField>
</template>