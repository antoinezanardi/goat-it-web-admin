<script setup lang="ts">
import type { QuestionCategoryBadgeProperties } from "~/components/domain/question/QuestionCategoryBadge/question-category-badge.types";
import { QUESTION_CATEGORY_COLOR_MAP, QUESTION_CATEGORY_ICON_MAP } from "~/components/domain/question/QuestionCategoryBadge/question-category-badge.constants";

const props = defineProps<QuestionCategoryBadgeProperties>();

const badgeColor = computed(() => QUESTION_CATEGORY_COLOR_MAP[props.category]);
const badgeIcon = computed(() => QUESTION_CATEGORY_ICON_MAP[props.category]);
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