<script setup lang="ts">
import type { QuestionAdultContentSwitchEmits, QuestionAdultContentSwitchProps } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionAdultContentSwitch/question-adult-content-switch.types";

defineProps<QuestionAdultContentSwitchProps>();
const emit = defineEmits<QuestionAdultContentSwitchEmits>();

function onUpdateModelValue(value: boolean): void {
  emit("update:modelValue", value);
}
</script>

<template>
  <UFormField
    class="w-full"
    data-testid="question-adult-content-switch-field"
    name="isAdultContent"
  >
    <USwitch
      data-testid="question-adult-content-switch"
      :disabled="disabled"
      :label="$t('questions.fields.isAdultContent')"
      :model-value="modelValue"
      @update:model-value="onUpdateModelValue"
    />
  </UFormField>
</template>