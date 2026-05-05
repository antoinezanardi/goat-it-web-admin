<script setup lang="ts">
import type { QuestionCategoryBadgeProperties } from "~/components/domain/question/QuestionCategoryBadge/question-category-badge.types";
import { useQuestion } from "~/composables/domain/question/useQuestion/useQuestion";

const props = defineProps<QuestionCategoryBadgeProperties>();

const { getCategoryUiMetadata } = useQuestion();

const badgeColor = computed(() => getCategoryUiMetadata(props.category).color);
const badgeIcon = computed(() => getCategoryUiMetadata(props.category).icon);
</script>

<template>
  <UBadge
    class="question-category-badge"
    :color="badgeColor"
    :icon="badgeIcon"
    :label="$t(`questions.category.${category}`)"
    variant="subtle"
  />
</template>