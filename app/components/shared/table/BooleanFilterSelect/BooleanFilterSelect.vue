<script setup lang="ts">
import {
  BOOLEAN_FILTER_SELECT_ANY_TOKEN,
  BOOLEAN_FILTER_SELECT_NO_TOKEN,
  BOOLEAN_FILTER_SELECT_YES_TOKEN,
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

const options = computed<BooleanFilterSelectOption[]>(() => [
  { label: t("common.table.filters.any"), value: BOOLEAN_FILTER_SELECT_ANY_TOKEN },
  { label: t("common.table.filters.yes"), value: BOOLEAN_FILTER_SELECT_YES_TOKEN },
  { label: t("common.table.filters.no"), value: BOOLEAN_FILTER_SELECT_NO_TOKEN },
]);

const selectedToken = computed<BooleanFilterSelectValue>(() => {
  if (props.modelValue === undefined) {
    return BOOLEAN_FILTER_SELECT_ANY_TOKEN;
  }
  return props.modelValue ? BOOLEAN_FILTER_SELECT_YES_TOKEN : BOOLEAN_FILTER_SELECT_NO_TOKEN;
});

function onUpdateModelValue(value: BooleanFilterSelectValue): void {
  const isYesToken = value === BOOLEAN_FILTER_SELECT_YES_TOKEN;

  emit("update:modelValue", value === BOOLEAN_FILTER_SELECT_ANY_TOKEN ? undefined : isYesToken);
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
      :model-value="selectedToken"
      value-key="value"
      @update:model-value="onUpdateModelValue"
    />
  </div>
</template>