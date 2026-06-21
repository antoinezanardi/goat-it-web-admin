<script setup lang="ts">
import { getThemeLocalizedLabel } from "~/composables/domain/question-theme/helpers/question-theme.helpers";
import { QUESTION_THEME_SELECTOR_OPTION_ICON_SIZE } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionThemeSelector/QuestionThemeSelectorOption/question-theme-selector-option.constants";
import type { QuestionThemeSelectorOptionProps } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionThemeSelector/QuestionThemeSelectorOption/question-theme-selector-option.types";

const props = defineProps<QuestionThemeSelectorOptionProps>();

const { t, locale: currentLocale } = useI18n();

const missingThemeTranslation = computed<string>(() => t("questions.missingThemeTranslation"));

const themeLabel = computed<string>(() => getThemeLocalizedLabel(props.theme, currentLocale.value, missingThemeTranslation.value));
</script>

<template>
  <div class="flex gap-2 items-center">
    <QuestionThemeIcon
      :color="theme.color"
      :size="QUESTION_THEME_SELECTOR_OPTION_ICON_SIZE"
      :slug="theme.slug"
    />

    <span class="text-sm">{{ themeLabel }}</span>
  </div>
</template>