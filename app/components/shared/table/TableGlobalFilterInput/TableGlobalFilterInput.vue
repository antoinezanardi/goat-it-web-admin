<script setup lang="ts">
import type { TableGlobalFilterInputEmits, TableGlobalFilterInputProps } from "~/components/shared/table/TableGlobalFilterInput/table-global-filter-input.types";

const props = withDefaults(defineProps<TableGlobalFilterInputProps>(), {
  placeholder: undefined,
});

const emit = defineEmits<TableGlobalFilterInputEmits>();

const { t } = useI18n();

const resolvedPlaceholder = computed<string>(() => props.placeholder ?? t("common.table.filter.placeholder"));

function onClickClearFilterButton(): void {
  emit("update:modelValue", "");
}

function onUpdateModelValue(event: string | number): void {
  emit("update:modelValue", String(event));
}
</script>

<template>
  <UInput
    class="max-w-sm table-global-filter-input"
    data-testid="table-global-filter-input"
    icon="i-lucide-search"
    :model-value="modelValue"
    :placeholder="resolvedPlaceholder"
    @update:model-value="onUpdateModelValue"
  >
    <template
      v-if="modelValue.length > 0"
      #trailing
    >
      <UTooltip :text="$t('common.table.filter.clear')">
        <UButton
          :aria-label="$t('common.table.filter.clear')"
          color="neutral"
          data-testid="table-global-filter-clear-button"
          icon="i-lucide-x"
          size="xs"
          variant="ghost"
          @click="onClickClearFilterButton"
        />
      </UTooltip>
    </template>
  </UInput>
</template>