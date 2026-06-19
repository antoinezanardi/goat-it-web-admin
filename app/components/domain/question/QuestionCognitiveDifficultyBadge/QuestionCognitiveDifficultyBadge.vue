<script setup lang="ts">
import type { QuestionCognitiveDifficultyBadgeProps } from "~/components/domain/question/QuestionCognitiveDifficultyBadge/question-cognitive-difficulty-badge.types";
import { getQuestionCognitiveDifficultyUiMetadata } from "~/composables/domain/question/helpers/question.helpers";
import type { QuestionCognitiveDifficultyUiMetadata } from "~/composables/domain/question/types/question-ui-metadata.types";
import type { AppColor } from "~/utils/types/color.types";

const props = defineProps<QuestionCognitiveDifficultyBadgeProps>();

const badgeUiMetadata = computed<QuestionCognitiveDifficultyUiMetadata>(() => getQuestionCognitiveDifficultyUiMetadata(props.difficulty));
const badgeColor = computed<AppColor>(() => badgeUiMetadata.value.color);
const badgeIcon = computed<string>(() => badgeUiMetadata.value.icon);
</script>

<template>
  <UBadge
    class="question-cognitive-difficulty-badge"
    :color="badgeColor"
    :icon="badgeIcon"
    :label="$t(`questions.difficulty.${difficulty}`)"
    variant="subtle"
  />
</template>