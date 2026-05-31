<script setup lang="ts">
import type { QuestionThemesListProperties } from "~/components/domain/question/QuestionThemesList/question-themes-list.types";
import { getThemeLocalizedLabel } from "~/composables/domain/question-theme/helpers/question-theme.helpers";

defineProps<QuestionThemesListProperties>();

const { locale, t } = useI18n();
</script>

<template>
  <div
    class="flex flex-nowrap gap-1.5 items-center justify-center question-themes-list"
  >
    <UTooltip
      v-for="assignment in themes"
      :key="assignment.theme.id"
      :text="getThemeLocalizedLabel(assignment.theme, locale, t('questions.missingThemeTranslation'))"
    >
      <QuestionThemeIcon
        :color="assignment.theme.color"
        :data-testid="`question-theme-icon-${assignment.theme.slug}`"
        :size="16"
        :slug="assignment.theme.slug"
      />
    </UTooltip>
  </div>
</template>