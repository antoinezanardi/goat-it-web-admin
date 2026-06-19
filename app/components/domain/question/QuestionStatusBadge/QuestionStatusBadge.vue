<script setup lang="ts">
import { QUESTION_STATUS_COLOR_MAP } from "~/components/domain/question/QuestionStatusBadge/question-status-badge.constants";
import type { QuestionStatusBadgeProps } from "~/components/domain/question/QuestionStatusBadge/question-status-badge.types";

const props = defineProps<QuestionStatusBadgeProps>();

const badgeColor = computed<"info" | "success" | "error">(() => QUESTION_STATUS_COLOR_MAP[props.status]);
</script>

<template>
  <UBadge
    class="question-status-badge"
    :color="badgeColor"
    :label="$t(`questions.status.${status}`)"
    variant="subtle"
  />
</template>