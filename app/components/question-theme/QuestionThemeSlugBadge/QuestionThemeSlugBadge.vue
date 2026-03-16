<script setup lang="ts">
import type { QuestionThemeSlugBadgeProperties } from "~/components/question-theme/QuestionThemeSlugBadge/question-theme-slug-badge.types";

const props = defineProps<QuestionThemeSlugBadgeProperties>();
</script>

<template>
  <UBadge
    id="question-theme-status-badge"
    color="neutral"
    :label="slug"
    variant="outline"
  />
</template>