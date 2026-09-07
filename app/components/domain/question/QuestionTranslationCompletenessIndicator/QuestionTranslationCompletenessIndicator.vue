<script setup lang="ts">
import type { Locale, LocalizedText, LocalizedTexts } from "@goat-it/schemas/shared/locale";

import type { QuestionTranslationCompletenessIndicatorProps } from "~/components/domain/question/QuestionTranslationCompletenessIndicator/question-translation-completeness-indicator.types";

const props = defineProps<QuestionTranslationCompletenessIndicatorProps>();

const requiredFields = computed<(Partial<LocalizedText> | Partial<LocalizedTexts> | undefined)[]>(() => [
  props.question.content.statement,
  props.question.content.answer,
  props.question.content.context,
  props.question.content.trivia,
]);

const applicableLocales = computed<Locale[] | undefined>(() => props.question.applicableLocales);
</script>

<template>
  <div
    class="flex justify-center"
    data-testid="question-translation-completeness-indicator"
  >
    <TranslationCompletenessIndicator
      :applicable-locales="applicableLocales"
      :required-fields="requiredFields"
    />
  </div>
</template>