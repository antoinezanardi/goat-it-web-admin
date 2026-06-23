<script setup lang="ts" generic="T extends string">
import type { TableFilterSelectAllItem, TableFilterSelectEmits, TableFilterSelectItem, TableFilterSelectProps } from "~/components/shared/table/TableFilterSelect/table-filter-select.types";

const props = withDefaults(defineProps<TableFilterSelectProps<T>>(), {
  icon: undefined,
  placeholder: undefined,
  multiple: false,
  loading: false,
});

const emit = defineEmits<TableFilterSelectEmits<T>>();

const { t } = useI18n();

const allItemsSelectOption = computed<TableFilterSelectAllItem>(() => ({
  label: props.placeholder ?? t("common.table.filters.all"),
  value: undefined,
}));

const selectOptions = computed<(TableFilterSelectItem | TableFilterSelectAllItem)[]>(() => (props.multiple ? props.items : [allItemsSelectOption.value, ...props.items]));

const placeholderText = computed<string>(() => (props.multiple ? props.label : allItemsSelectOption.value.label));

function onUpdateModelValue(value: string | (string | undefined)[] | undefined): void {
  if (props.multiple) {
    emit("update:modelValue", value as T[]);
  } else {
    emit("update:modelValue", value as T | undefined);
  }
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
      :loading="loading"
      :model-value="modelValue"
      :multiple="multiple"
      :placeholder="placeholderText"
      value-key="value"
      @update:model-value="onUpdateModelValue"
    />
  </div>
</template>