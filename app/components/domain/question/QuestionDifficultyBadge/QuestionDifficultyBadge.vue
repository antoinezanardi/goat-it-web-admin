<script setup lang="ts">
import type { QuestionDifficultyBadgeProperties } from "~/components/domain/question/QuestionDifficultyBadge/question-difficulty-badge.types";
import { getDifficultyUiMetadata } from "~/composables/domain/question/helpers/question.helpers";

const props = defineProps<QuestionDifficultyBadgeProperties>();

const badgeUiMetadata = computed(() => getDifficultyUiMetadata(props.difficulty));
const badgeColor = computed(() => badgeUiMetadata.value.color);
const badgeIcon = computed(() => badgeUiMetadata.value.icon);
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