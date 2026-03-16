<script setup lang="ts">
import type { QuestionThemeSlugBadgeProperties } from "~/components/domain/question-theme/QuestionThemeSlugBadge/question-theme-slug-badge.types";

defineProps<QuestionThemeSlugBadgeProperties>();
</script>

<template>
  <UBadge
    id="question-theme-slug-badge"
    color="neutral"
    :label="slug"
    variant="outline"
  />
</template>