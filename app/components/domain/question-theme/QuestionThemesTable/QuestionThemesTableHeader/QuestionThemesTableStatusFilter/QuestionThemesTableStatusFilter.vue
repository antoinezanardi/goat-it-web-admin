<script setup lang="ts">
import type { QuestionThemeStatus } from "@goat-it/schemas/question-theme";
import { QUESTION_THEME_STATUSES } from "@goat-it/schemas/question-theme";

import type { QuestionThemesTableStatusFilterEmits, QuestionThemesTableStatusFilterProps } from "~/components/domain/question-theme/QuestionThemesTable/QuestionThemesTableHeader/QuestionThemesTableStatusFilter/question-themes-table-status-filter.types";
import type { TableFilterSelectItem } from "~/components/shared/table/TableFilterSelect/table-filter-select.types";

defineProps<QuestionThemesTableStatusFilterProps>();
const emit = defineEmits<QuestionThemesTableStatusFilterEmits>();

const { t } = useI18n();

const statusItems = computed<TableFilterSelectItem<QuestionThemeStatus>[]>(() => QUESTION_THEME_STATUSES.map(status => ({
  label: t(`questionThemes.status.${status}`),
  value: status,
})));

function onUpdateModelValue(value: QuestionThemeStatus | QuestionThemeStatus[] | undefined): void {
  emit("update:modelValue", value as QuestionThemeStatus | undefined);
}
</script>

<template>
  <TableFilterSelect
    data-testid="question-themes-table-status-filter"
    :items="statusItems"
    :label="t('questionThemes.fields.status')"
    :model-value="modelValue"
    @update:model-value="onUpdateModelValue"
  />
</template>