<script setup lang="ts">
import type { QuestionThemeSlugBadgeProps } from "~/components/domain/question-theme/QuestionThemeSlugBadge/question-theme-slug-badge.types";

defineProps<QuestionThemeSlugBadgeProps>();
</script>

<template>
  <UBadge
    id="question-theme-slug-badge"
    color="neutral"
    :label="slug"
    variant="outline"
  />
</template>