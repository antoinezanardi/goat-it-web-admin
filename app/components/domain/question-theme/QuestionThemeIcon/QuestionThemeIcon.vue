<script setup lang="ts">
import { getThemeIcon } from "~/composables/domain/question-theme/helpers/question-theme.helpers";
import type { QuestionThemeIconProps } from "~/components/domain/question-theme/QuestionThemeIcon/question-theme-icon.types";

const props = withDefaults(defineProps<QuestionThemeIconProps>(), {
  isHint: false,
});

const icon = computed<string>(() => getThemeIcon(props.slug));

const colorReference = computed<string | undefined>(() => props.color);
const { adaptedColor } = useHexColor(colorReference);

const borderClass = computed<string>(() => (props.isHint ? "border-2 border-dashed" : "border-2"));
</script>

<template>
  <div
    class="inline-flex items-center justify-center p-1 question-theme-icon-container rounded-full"
    :class="borderClass"
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