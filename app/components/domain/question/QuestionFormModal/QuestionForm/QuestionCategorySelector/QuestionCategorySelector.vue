<script setup lang="ts">
import type { QuestionCategory } from "@goat-it/schemas/question";
import { QUESTION_CATEGORIES } from "@goat-it/schemas/question";

import type { QuestionCategorySelectorEmits, QuestionCategorySelectorItem, QuestionCategorySelectorProperties } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionCategorySelector/question-category-selector.types";

defineProps<QuestionCategorySelectorProperties>();
const emit = defineEmits<QuestionCategorySelectorEmits>();

const { t } = useI18n();
const { getCategoryUiMetadata } = useQuestion();

const selectItems = computed<QuestionCategorySelectorItem[]>(() => QUESTION_CATEGORIES.map(category => ({
  label: t(getCategoryUiMetadata(category).labelKey),
  value: category,
  icon: getCategoryUiMetadata(category).icon,
})));

function onUpdateModelValue(value: QuestionCategory): void {
  emit("update:modelValue", value);
}
</script>

<template>
  <USelect
    data-testid="question-category-selector"
    :items="selectItems"
    :model-value="modelValue"
    :placeholder="$t('questions.fields.category')"
    @update:model-value="onUpdateModelValue"
  />
</template>