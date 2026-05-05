<script setup lang="ts">
import type { LocalizedText } from "@goat-it/schemas/shared/locale";

import type { QuestionTranslationCompletenessIndicatorProperties } from "~/components/domain/question/QuestionTranslationCompletenessIndicator/question-translation-completeness-indicator.types";

const props = defineProps<QuestionTranslationCompletenessIndicatorProperties>();

const requiredFields = computed<Partial<LocalizedText>[]>(() => [props.question.content.statement, props.question.content.answer]);
</script>

<template>
  <div
    class="flex justify-center"
    data-testid="question-translation-completeness-indicator"
  >
    <TranslationCompletenessIndicator :required-fields="requiredFields"/>
  </div>
</template>