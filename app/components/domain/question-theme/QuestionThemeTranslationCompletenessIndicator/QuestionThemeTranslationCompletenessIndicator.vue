<script setup lang="ts">
import type { LocalizedText } from "@goat-it/schemas/shared/locale";

import type { QuestionThemeTranslationCompletenessIndicatorProperties } from "~/components/domain/question-theme/QuestionThemeTranslationCompletenessIndicator/question-theme-translation-completeness-indicator.types";

const props = defineProps<QuestionThemeTranslationCompletenessIndicatorProperties>();

// Acceptable as AdminQuestionThemeDto has optional locale keys but data is structurally compatible with LocalizedText
// oxlint-disable-next-line typescript/no-unsafe-type-assertion
const requiredFields = computed<LocalizedText[]>(() => [props.questionTheme.label, props.questionTheme.description] as LocalizedText[]);
</script>

<template>
  <div data-testid="question-theme-translation-completeness-indicator">
    <TranslationCompletenessIndicator :required-fields="requiredFields"/>
  </div>
</template>