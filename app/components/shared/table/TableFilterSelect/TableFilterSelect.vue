<script setup lang="ts">
import type { TableFilterSelectAllItem, TableFilterSelectEmits, TableFilterSelectOptionItem, TableFilterSelectProps } from "~/components/shared/table/TableFilterSelect/table-filter-select.types";

const props = withDefaults(defineProps<TableFilterSelectProps>(), {
  icon: undefined,
  placeholder: undefined,
});

const emit = defineEmits<TableFilterSelectEmits>();

const { t } = useI18n();

const allOption = computed<TableFilterSelectAllItem>(() => ({
  label: props.placeholder ?? t("common.table.filters.all"),
  value: undefined,
}));

const allItems = computed<TableFilterSelectOptionItem[]>(() => [
  allOption.value,
  ...props.items,
]);

function onUpdateModelValue(value: string | undefined): void {
  emit("update:modelValue", value);
}
</script>

<template>
  <div
    class="flex gap-2 items-center"
    data-testid="table-filter-select"
  >
    <span class="font-medium text-muted text-sm">{{ label }}</span>

    <USelectMenu
      :icon="icon"
      :items="allItems"
      :model-value="modelValue"
      :placeholder="allOption.label"
      value-key="value"
      @update:model-value="onUpdateModelValue"
    />
  </div>
</template>