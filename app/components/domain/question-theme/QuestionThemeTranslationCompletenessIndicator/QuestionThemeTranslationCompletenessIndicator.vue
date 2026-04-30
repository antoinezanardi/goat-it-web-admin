<script setup lang="ts">
import type { QuestionThemeTranslationCompletenessIndicatorProperties } from "~/components/domain/question-theme/QuestionThemeTranslationCompletenessIndicator/question-theme-translation-completeness-indicator.types";

const props = defineProps<QuestionThemeTranslationCompletenessIndicatorProperties>();

const requiredFields = computed(() => [props.questionTheme.label, props.questionTheme.description]);
</script>

<template>
  <div
    class="flex justify-center"
    data-testid="question-theme-translation-completeness-indicator"
  >
    <TranslationCompletenessIndicator :required-fields="requiredFields"/>
  </div>
</template>