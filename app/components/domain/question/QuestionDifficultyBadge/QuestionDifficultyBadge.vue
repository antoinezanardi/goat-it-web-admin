<script setup lang="ts">
import type { QuestionDifficultyBadgeProperties } from "~/components/domain/question/QuestionDifficultyBadge/question-difficulty-badge.types";
import { QUESTION_DIFFICULTY_COLOR_MAP, QUESTION_DIFFICULTY_ICON_MAP } from "~/components/domain/question/QuestionDifficultyBadge/question-difficulty-badge.constants";

const props = defineProps<QuestionDifficultyBadgeProperties>();

const badgeColor = computed(() => QUESTION_DIFFICULTY_COLOR_MAP[props.difficulty]);
const badgeIcon = computed(() => QUESTION_DIFFICULTY_ICON_MAP[props.difficulty]);
</script>

<template>
  <UBadge
    id="question-difficulty-badge"
    :color="badgeColor"
    :icon="badgeIcon"
    :label="$t(`questions.difficulty.${difficulty}`)"
    variant="subtle"
  />
</template>