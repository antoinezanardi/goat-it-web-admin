<script setup lang="ts">
import type { TableRowCountProps } from "~/components/shared/table/TableRowCount/table-row-count.types";

defineProps<TableRowCountProps>();
</script>

<template>
  <div data-testid="table-row-count">
    <USkeleton
      v-if="loading"
      class="h-5 w-24"
      data-testid="table-row-count-skeleton"
    />
    <span
      v-else
      data-testid="table-row-count-text"
    >
      {{ $t(countKey, count) }}
    </span>
  </div>
</template>
