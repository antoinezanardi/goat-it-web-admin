<script setup lang="ts">
import {
  BOOLEAN_FILTER_SELECT_NO_VALUE,
  BOOLEAN_FILTER_SELECT_YES_VALUE,
} from "~/components/shared/table/BooleanFilterSelect/boolean-filter-select.constants";
import type {
  BooleanFilterSelectEmits,
  BooleanFilterSelectOption,
  BooleanFilterSelectProps,
  BooleanFilterSelectValue,
} from "~/components/shared/table/BooleanFilterSelect/boolean-filter-select.types";

const props = defineProps<BooleanFilterSelectProps>();

const emit = defineEmits<BooleanFilterSelectEmits>();

const { t } = useI18n();

const anyLabel = computed<string>(() => t("common.table.filters.any"));

const options = computed<BooleanFilterSelectOption[]>(() => [
  { label: anyLabel.value, value: undefined },
  { label: t("common.table.filters.yes"), value: BOOLEAN_FILTER_SELECT_YES_VALUE },
  { label: t("common.table.filters.no"), value: BOOLEAN_FILTER_SELECT_NO_VALUE },
]);

const selectedValue = computed<BooleanFilterSelectValue | undefined>((): BooleanFilterSelectValue | undefined => {
  if (props.modelValue === undefined) {
    return undefined;
  }
  return props.modelValue ? BOOLEAN_FILTER_SELECT_YES_VALUE : BOOLEAN_FILTER_SELECT_NO_VALUE;
});

function onUpdateModelValue(value: BooleanFilterSelectValue | undefined): void {
  if (value === undefined) {
    // Acceptable as the any placeholder clears the filter, represented as undefined in the boolean model
    // oxlint-disable-next-line unicorn/no-useless-undefined
    emit("update:modelValue", undefined);

    return;
  }

  emit("update:modelValue", value === BOOLEAN_FILTER_SELECT_YES_VALUE);
}
</script>

<template>
  <div
    class="flex gap-2 items-center"
    data-testid="boolean-filter-select"
  >
    <span class="font-medium text-muted text-sm">{{ label }}</span>

    <USelect
      :items="options"
      :model-value="selectedValue"
      :placeholder="anyLabel"
      value-key="value"
      @update:model-value="onUpdateModelValue"
    />
  </div>
</template>