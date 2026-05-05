<script setup lang="ts">
import type { QuestionThemesListProperties } from "~/components/domain/question/QuestionThemesList/question-themes-list.types";

defineProps<QuestionThemesListProperties>();
</script>

<template>
  <div
    id="question-themes-list"
    class="flex flex-wrap gap-1.5 items-center justify-center"
  >
    <QuestionThemeIcon
      v-for="assignment in themes"
      :key="assignment.theme.id"
      :color="assignment.theme.color"
      :data-testid="`question-theme-icon-${assignment.theme.slug}`"
      :size="24"
      :slug="assignment.theme.slug"
    />
  </div>
</template>