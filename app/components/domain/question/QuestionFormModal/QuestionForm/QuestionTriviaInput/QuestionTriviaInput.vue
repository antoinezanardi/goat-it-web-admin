<script setup lang="ts">
import { QUESTION_TRIVIA_INPUT_UI } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionTriviaInput/question-trivia-input.constants";
import type { QuestionTriviaInputEmits, QuestionTriviaInputProperties } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionTriviaInput/question-trivia-input.types";

const props = withDefaults(defineProps<QuestionTriviaInputProperties>(), {
  modelValue: () => [],
});

const emit = defineEmits<QuestionTriviaInputEmits>();

const { locale: currentLocale } = useI18n();

function onUpdateModelValue(value: string[]): void {
  emit("update:modelValue", value);
}
</script>

<template>
  <UFormField
    data-testid="question-trivia-input"
    :label="$t('questions.fields.trivia')"
    :name="`content.trivia.${currentLocale}`"
  >
    <UInputTags
      add-on-blur
      add-on-tab
      class="w-full"
      :model-value="props.modelValue"
      :placeholder="$t('questions.fields.trivia')"
      :ui="QUESTION_TRIVIA_INPUT_UI"
      @update:model-value="onUpdateModelValue"
    />
  </UFormField>
</template>