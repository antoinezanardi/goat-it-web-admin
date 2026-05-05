<script setup lang="ts">
import type { QuestionStatusBadgeProperties } from "~/components/domain/question/QuestionStatusBadge/question-status-badge.types";

const props = defineProps<QuestionStatusBadgeProperties>();

const badgeColor = computed<"info" | "success" | "error">(() => {
  if (props.status === "active") {
    return "success";
  }
  if (props.status === "pending") {
    return "info";
  }
  return "error";
});
</script>

<template>
  <UBadge
    id="question-status-badge"
    :color="badgeColor"
    :label="$t(`questions.status.${status}`)"
    variant="subtle"
  />
</template>