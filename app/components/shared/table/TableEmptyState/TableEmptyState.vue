<script setup lang="ts">
import type { TableEmptyStateProps } from "~/components/shared/table/TableEmptyState/table-empty-state.types";

const props = defineProps<TableEmptyStateProps>();

const { t } = useI18n();

const emptyStateText = computed<string>(() => (props.hasActiveFilter ? t("common.table.noResults") : t("common.table.noData")));
</script>

<template>
  <span data-testid="table-empty-state">
    {{ emptyStateText }}
  </span>
</template>