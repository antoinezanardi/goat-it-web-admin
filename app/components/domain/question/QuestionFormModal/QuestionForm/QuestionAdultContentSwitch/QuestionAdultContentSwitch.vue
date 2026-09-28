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
    :label="$t('questions.fields.isAdultContent')"
    name="isAdultContent"
  >
    <div class="flex h-8 items-center">
      <USwitch
        data-testid="question-adult-content-switch"
        :disabled="disabled"
        :model-value="modelValue"
        size="lg"
        @update:model-value="onUpdateModelValue"
      />
    </div>
  </UFormField>
</template>