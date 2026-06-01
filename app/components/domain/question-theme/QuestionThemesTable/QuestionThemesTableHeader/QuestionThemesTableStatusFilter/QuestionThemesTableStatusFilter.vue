<script setup lang="ts">
import type { QuestionThemesTableStatusFilterEmits, QuestionThemesTableStatusFilterProps } from "~/components/domain/question-theme/QuestionThemesTable/QuestionThemesTableHeader/QuestionThemesTableStatusFilter/question-themes-table-status-filter.types";
import type { TableFilterSelectItem } from "~/components/shared/table/TableFilterSelect/table-filter-select.types";

defineProps<QuestionThemesTableStatusFilterProps>();
const emit = defineEmits<QuestionThemesTableStatusFilterEmits>();

const { t } = useI18n();

const statusItems = computed<TableFilterSelectItem[]>(() => [
  { label: t("questionThemes.status.active"), value: "active" },
  { label: t("questionThemes.status.archived"), value: "archived" },
]);

function onUpdateModelValue(value: string | undefined): void {
  emit("update:modelValue", value);
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