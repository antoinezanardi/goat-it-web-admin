<script setup lang="ts">
import { QUESTION_CATEGORIES } from "@goat-it/schemas/question";
import type { QuestionCategory } from "@goat-it/schemas/question";

import { QUESTION_CATEGORY_UI_METADATA } from "~/composables/domain/question/constants/question-category.constants";
import type { QuestionsTableCategoryFilterEmits, QuestionsTableCategoryFilterProps } from "~/components/domain/question/QuestionsTable/QuestionsTableHeader/QuestionsTableCategoryFilter/questions-table-category-filter.types";
import type { TableFilterSelectItem } from "~/components/shared/table/TableFilterSelect/table-filter-select.types";

defineProps<QuestionsTableCategoryFilterProps>();
const emit = defineEmits<QuestionsTableCategoryFilterEmits>();

const { t } = useI18n();

const categoryItems = computed<TableFilterSelectItem<QuestionCategory>[]>(() => QUESTION_CATEGORIES.map(category => ({
  label: t(`questions.category.${category}`),
  value: category,
  icon: QUESTION_CATEGORY_UI_METADATA[category].icon,
})));

function onUpdateModelValue(value: QuestionCategory | undefined): void {
  emit("update:modelValue", value);
}
</script>

<template>
  <TableFilterSelect
    data-testid="questions-table-category-filter"
    :items="categoryItems"
    :label="t('questions.fields.category')"
    :model-value="modelValue"
    @update:model-value="onUpdateModelValue"
  />
</template>