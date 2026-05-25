<script setup lang="ts">
import { QUESTION_THEME_SELECTOR_OPTION_ICON_SIZE } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionThemeSelector/QuestionThemeSelectorOption/question-theme-selector-option.constants";
import type { QuestionThemeSelectorOptionProperties } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionThemeSelector/QuestionThemeSelectorOption/question-theme-selector-option.types";

defineProps<QuestionThemeSelectorOptionProperties>();
</script>

<template>
  <QuestionThemeIcon
    :color="theme.color"
    :size="QUESTION_THEME_SELECTOR_OPTION_ICON_SIZE"
    :slug="theme.slug"
  />
</template>