<script setup lang="ts">
import { QUESTION_SOURCE_URLS_MAX_ITEMS } from "@goat-it/schemas/question";
import { z } from "zod";

import type { QuestionSourceUrlsInputEmits, QuestionSourceUrlsInputProperties } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionSourceUrlsInput/question-source-urls-input.types";

const props = defineProps<QuestionSourceUrlsInputProperties>();
const emit = defineEmits<QuestionSourceUrlsInputEmits>();

const { t } = useI18n();

const appConfig = useAppConfig();

const closeIcon = computed<string>(() => appConfig.ui.icons.close);

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
</script>

<template>
  <UFormField
    data-testid="question-source-urls-input"
    :error="errorMessage"
    :label="$t('questions.fields.sourceUrls')"
    name="sourceUrls"
    required
  >
    <UInputTags
      add-on-blur
      add-on-tab
      duplicate
      :model-value="displayValue"
      :placeholder="$t('questions.fields.sourceUrls')"
      @update:model-value="onUpdateModelValue"
    >
      <template #item-text="{ item }">
        <QuestionSourceUrlTag :url="item"/>
      </template>

      <template #item-delete="{ item }">
        <UTooltip :text="$t('questions.sourceUrlTag.removeSource', { 'url': item })">
          <span :data-testid="`remove-source-url-tag-${item}`">
            <UIcon
              class="cursor-pointer size-3.5"
              :name="closeIcon"
            />
          </span>
        </UTooltip>
      </template>
    </UInputTags>
  </UFormField>
</template>