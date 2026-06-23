<script setup lang="ts">
import { QUESTION_CATEGORIES } from "@goat-it/schemas/question";
import type { QuestionCategory } from "@goat-it/schemas/question";

import { getQuestionCategoryUiMetadata } from "~/composables/domain/question/helpers/question.helpers";
import type { QuestionsTableCategoryFilterEmits, QuestionsTableCategoryFilterProps } from "~/components/domain/question/QuestionsTable/QuestionsTableHeader/QuestionsTableCategoryFilter/questions-table-category-filter.types";
import type { TableFilterSelectItem } from "~/components/shared/table/TableFilterSelect/table-filter-select.types";

defineProps<QuestionsTableCategoryFilterProps>();
const emit = defineEmits<QuestionsTableCategoryFilterEmits>();

const { t } = useI18n();

const categoryItems = computed<TableFilterSelectItem<QuestionCategory>[]>(() => QUESTION_CATEGORIES.map(category => {
  const metadata = getQuestionCategoryUiMetadata(category);

  return {
    label: t(metadata.labelKey),
    value: category,
    icon: metadata.icon,
  };
}));

function onUpdateModelValue(value: QuestionCategory | QuestionCategory[] | undefined): void {
  emit("update:modelValue", value as QuestionCategory | undefined);
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