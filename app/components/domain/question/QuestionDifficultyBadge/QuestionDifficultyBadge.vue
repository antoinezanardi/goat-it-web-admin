<script setup lang="ts">
import type { QuestionDifficultyBadgeProperties } from "~/components/domain/question/QuestionDifficultyBadge/question-difficulty-badge.types";
import { useQuestion } from "~/composables/domain/question/useQuestion/useQuestion";

const props = defineProps<QuestionDifficultyBadgeProperties>();

const { getDifficultyUiMetadata } = useQuestion();

const badgeColor = computed(() => getDifficultyUiMetadata(props.difficulty).color);
const badgeIcon = computed(() => getDifficultyUiMetadata(props.difficulty).icon);
</script>

<template>
  <UBadge
    class="question-difficulty-badge"
    :color="badgeColor"
    :icon="badgeIcon"
    :label="$t(`questions.difficulty.${difficulty}`)"
    variant="subtle"
  />
</template>