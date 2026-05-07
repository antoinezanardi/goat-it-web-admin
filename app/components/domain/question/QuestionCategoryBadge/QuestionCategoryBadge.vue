<script setup lang="ts">
import type { AppColor } from "~/utils/types/color.types";
import type { QuestionCategoryBadgeProperties } from "~/components/domain/question/QuestionCategoryBadge/question-category-badge.types";
import type { QuestionCategoryUiMetadata } from "~/composables/domain/question/types/question-ui-metadata.types";
import { getQuestionCategoryUiMetadata } from "~/composables/domain/question/helpers/question.helpers";

const props = defineProps<QuestionCategoryBadgeProperties>();

const badgeUiMetadata = computed<QuestionCategoryUiMetadata>(() => getQuestionCategoryUiMetadata(props.category));
const badgeColor = computed<AppColor>(() => badgeUiMetadata.value.color);
const badgeIcon = computed<string>(() => badgeUiMetadata.value.icon);
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