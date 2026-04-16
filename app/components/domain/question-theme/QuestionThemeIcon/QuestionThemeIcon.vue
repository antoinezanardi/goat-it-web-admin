<script setup lang="ts">
import type { QuestionThemeIconProperties } from "~/components/domain/question-theme/QuestionThemeIcon/question-theme-icon.types";
import { QUESTION_THEME_SLUG_ICON_MAP, QUESTION_THEME_UNKNOWN_ICON } from "~/composables/domain/question-theme/question-theme.constants";

const props = defineProps<QuestionThemeIconProperties>();

const icon = computed<string>(() => QUESTION_THEME_SLUG_ICON_MAP[props.slug] ?? QUESTION_THEME_UNKNOWN_ICON);
</script>

<template>
  <UIcon
    id="question-theme-icon"
    :name="icon"
  />
</template>