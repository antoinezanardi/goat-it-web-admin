<script setup lang="ts">
import type { QuestionCategory } from "@goat-it/schemas/question";
import { QUESTION_CATEGORIES } from "@goat-it/schemas/question";

import type { QuestionCategorySelectorEmits, QuestionCategorySelectorItem, QuestionCategorySelectorProperties } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionCategorySelector/question-category-selector.types";
import { getCategoryUiMetadata } from "~/composables/domain/question/helpers/question.helpers";

defineProps<QuestionCategorySelectorProperties>();
const emit = defineEmits<QuestionCategorySelectorEmits>();

const { t } = useI18n();

const selectItems = computed<QuestionCategorySelectorItem[]>(() => QUESTION_CATEGORIES.map(category => {
  const metadata = getCategoryUiMetadata(category);

  return {
    label: t(metadata.labelKey),
    value: category,
    icon: metadata.icon,
  };
}));

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