<script setup lang="ts">
import type { QuestionThemeIconProperties } from "~/components/domain/question-theme/QuestionThemeIcon/question-theme-icon.types";
import { QUESTION_THEME_SLUG_ICON_MAP, QUESTION_THEME_UNKNOWN_ICON } from "~/composables/domain/question-theme/question-theme.constants";

const props = defineProps<QuestionThemeIconProperties>();

const icon = computed<string>(() => QUESTION_THEME_SLUG_ICON_MAP[props.slug] ?? QUESTION_THEME_UNKNOWN_ICON);

const colorReference = computed<string | undefined>(() => props.color);
const { adaptedColor } = useHexColor(colorReference);
</script>

<template>
  <div
    class="border-2 inline-flex items-center justify-center p-1.5 question-theme-icon-container rounded-full"
    :data-testid="`question-theme-icon-container-${slug}`"
    :style="{ 'borderColor': adaptedColor, 'color': adaptedColor }"
  >
    <UIcon
      class="question-theme-icon"
      :data-testid="`question-theme-icon-${slug}`"
      :name="icon"
      :size="size"
    />
  </div>
</template>