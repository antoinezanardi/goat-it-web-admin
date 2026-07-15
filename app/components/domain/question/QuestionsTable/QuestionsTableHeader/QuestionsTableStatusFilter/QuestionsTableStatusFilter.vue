<script setup lang="ts">
import { QUESTION_STATUSES } from "@goat-it/schemas/question";
import type { QuestionStatus } from "@goat-it/schemas/question";

import type { QuestionsTableStatusFilterEmits, QuestionsTableStatusFilterProps } from "~/components/domain/question/QuestionsTable/QuestionsTableHeader/QuestionsTableStatusFilter/questions-table-status-filter.types";
import type { TableFilterSelectItem } from "~/components/shared/table/TableFilterSelect/table-filter-select.types";

defineProps<QuestionsTableStatusFilterProps>();
const emit = defineEmits<QuestionsTableStatusFilterEmits>();

const { t } = useI18n();

const statusItems = computed<TableFilterSelectItem<QuestionStatus>[]>(() => QUESTION_STATUSES.map(status => ({
  label: t(`questions.status.${status}`),
  value: status,
})));

function onUpdateModelValue(value: QuestionStatus | QuestionStatus[] | undefined): void {
  emit("update:modelValue", value as QuestionStatus | undefined);
}
</script>

<template>
  <TableFilterSelect
    data-testid="questions-table-status-filter"
    :items="statusItems"
    :label="t('questions.fields.status')"
    :model-value="modelValue"
    @update:model-value="onUpdateModelValue"
  />
</template>