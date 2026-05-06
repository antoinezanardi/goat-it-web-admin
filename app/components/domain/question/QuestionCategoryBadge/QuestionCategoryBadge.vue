<script setup lang="ts">
import type { QuestionCategoryBadgeProperties } from "~/components/domain/question/QuestionCategoryBadge/question-category-badge.types";
import { useQuestion } from "~/composables/domain/question/useQuestion/useQuestion";

const props = defineProps<QuestionCategoryBadgeProperties>();

const { getCategoryUiMetadata } = useQuestion();

const badgeUiMetadata = computed(() => getCategoryUiMetadata(props.category));
const badgeColor = computed(() => badgeUiMetadata.value.color);
const badgeIcon = computed(() => badgeUiMetadata.value.icon);
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