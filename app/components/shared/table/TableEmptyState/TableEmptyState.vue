<script setup lang="ts">
import type { TableEmptyStateProps } from "~/components/shared/table/TableEmptyState/table-empty-state.types";

defineProps<TableEmptyStateProps>();
</script>

<template>
  <span data-testid="table-empty-state">
    {{ hasActiveFilter ? $t('common.table.noResults') : $t('common.table.noData') }}
  </span>
</template>