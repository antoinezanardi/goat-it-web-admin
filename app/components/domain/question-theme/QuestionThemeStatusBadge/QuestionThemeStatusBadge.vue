<script setup lang="ts">
import type { QuestionThemeStatusBadgeProps } from "~/components/domain/question-theme/QuestionThemeStatusBadge/question-theme-status-badge.types";

const props = defineProps<QuestionThemeStatusBadgeProps>();

const badgeColor = computed<"success" | "neutral">(() => (props.status === "active" ? "success" : "neutral"));
</script>

<template>
  <UBadge
    class="question-theme-status-badge"
    :color="badgeColor"
    :label="$t(`questionThemes.status.${status}`)"
    variant="subtle"
  />
</template>