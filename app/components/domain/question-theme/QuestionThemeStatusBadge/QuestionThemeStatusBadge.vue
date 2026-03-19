<script setup lang="ts">
import type { QuestionThemeStatusBadgeProperties } from "~/components/domain/question-theme/QuestionThemeStatusBadge/question-theme-status-badge.types";

const props = defineProps<QuestionThemeStatusBadgeProperties>();

const badgeColor = computed<"success" | "neutral">(() => (props.status === "active" ? "success" : "neutral"));
</script>

<template>
  <UBadge
    id="question-theme-status-badge"
    :color="badgeColor"
    :label="$t(`questionThemes.status.${status}`)"
    variant="subtle"
  />
</template>