<script setup lang="ts" generic="T extends string">
import type { TableFilterSelectAllItem, TableFilterSelectEmits, TableFilterSelectItem, TableFilterSelectProps } from "~/components/shared/table/TableFilterSelect/table-filter-select.types";

const props = withDefaults(defineProps<TableFilterSelectProps<T>>(), {
  icon: undefined,
  placeholder: undefined,
});

const emit = defineEmits<TableFilterSelectEmits<T>>();

const { t } = useI18n();

const allItemsSelectOption = computed<TableFilterSelectAllItem>(() => ({
  label: props.placeholder ?? t("common.table.filters.all"),
  value: undefined,
}));

const selectOptions = computed<(TableFilterSelectItem | TableFilterSelectAllItem)[]>(() => [
  allItemsSelectOption.value,
  ...props.items,
]);

const selectMenuModelValue = computed<string | undefined>(() => props.modelValue);

function onUpdateModelValue(value: string | undefined): void {
  // Acceptable as USelectMenu emits string, but we only provide T values as items
  // oxlint-disable-next-line no-unsafe-type-assertion
  emit("update:modelValue", value as T | undefined);
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
      :items="selectOptions"
      :model-value="selectMenuModelValue"
      :placeholder="allItemsSelectOption.label"
      value-key="value"
      @update:model-value="onUpdateModelValue"
    />
  </div>
</template>