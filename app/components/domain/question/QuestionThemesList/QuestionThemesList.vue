<script setup lang="ts">
import type { QuestionThemesListProps } from "~/components/domain/question/QuestionThemesList/question-themes-list.types";
import { getThemeLocalizedLabel } from "~/composables/domain/question-theme/helpers/question-theme.helpers";

defineProps<QuestionThemesListProps>();

const { locale, t } = useI18n();

const missingThemeTranslation = computed<string>(() => t("questions.missingThemeTranslation"));
</script>

<template>
  <div
    class="flex flex-nowrap gap-1.5 items-center justify-center question-themes-list"
  >
    <UTooltip
      v-for="assignment in themes"
      :key="assignment.theme.id"
      :text="getThemeLocalizedLabel(assignment.theme, locale, missingThemeTranslation)"
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