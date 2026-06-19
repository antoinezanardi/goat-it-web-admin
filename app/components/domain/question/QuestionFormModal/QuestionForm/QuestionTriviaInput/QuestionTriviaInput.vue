<script setup lang="ts">
import { QUESTION_TRIVIA_INPUT_UI } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionTriviaInput/question-trivia-input.constants";
import type { QuestionTriviaInputEmits, QuestionTriviaInputProps } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionTriviaInput/question-trivia-input.types";

const props = withDefaults(defineProps<QuestionTriviaInputProps>(), {
  modelValue: () => [],
});

const emit = defineEmits<QuestionTriviaInputEmits>();

const { t, locale: currentLocale } = useI18n();

function onUpdateModelValue(value: string[]): void {
  emit("update:modelValue", value);
}

function removeTooltipText(item: string): string {
  return t("questions.form.removeTrivia", { value: item });
}
</script>

<template>
  <InputTagsField
    :add-hint-text="$t('questions.form.addTriviaHint')"
    data-testid="question-trivia-input"
    :label="$t('questions.fields.trivia')"
    :model-value="props.modelValue"
    :name="`content.trivia.${currentLocale}`"
    :placeholder="$t('questions.placeholders.trivia')"
    :remove-tooltip-text="removeTooltipText"
    :ui="QUESTION_TRIVIA_INPUT_UI"
    @update:model-value="onUpdateModelValue"
  />
</template>