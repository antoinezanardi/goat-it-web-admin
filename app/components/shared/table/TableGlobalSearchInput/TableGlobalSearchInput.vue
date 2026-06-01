<script setup lang="ts">
import type { TableGlobalSearchInputEmits, TableGlobalSearchInputProps } from "~/components/shared/table/TableGlobalSearchInput/table-global-search-input.types";

const props = withDefaults(defineProps<TableGlobalSearchInputProps>(), {
  placeholder: undefined,
});

const emit = defineEmits<TableGlobalSearchInputEmits>();

const { t } = useI18n();

const resolvedPlaceholder = computed<string>(() => props.placeholder ?? t("common.table.search.placeholder"));

const clearLabel = computed<string>(() => t("common.table.search.clear"));

function onClickClearFilterButton(): void {
  emit("update:modelValue", "");
}

function onUpdateModelValue(event: string | number): void {
  emit("update:modelValue", String(event));
}
</script>

<template>
  <UInput
    class="max-w-sm table-global-search-input"
    data-testid="table-global-search-input"
    icon="i-lucide-search"
    :model-value="modelValue"
    :placeholder="resolvedPlaceholder"
    @update:model-value="onUpdateModelValue"
  >
    <template
      v-if="modelValue.length > 0"
      #trailing
    >
      <UTooltip :text="clearLabel">
        <UButton
          :aria-label="clearLabel"
          color="neutral"
          data-testid="table-global-search-clear-button"
          icon="i-lucide-x"
          size="xs"
          variant="ghost"
          @click="onClickClearFilterButton"
        />
      </UTooltip>
    </template>
  </UInput>
</template>