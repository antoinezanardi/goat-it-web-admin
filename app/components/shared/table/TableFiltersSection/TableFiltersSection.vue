<script setup lang="ts">
import type { TableFiltersSectionEmits, TableFiltersSectionProps } from "~/components/shared/table/TableFiltersSection/table-filters-section.types";

const props = withDefaults(defineProps<TableFiltersSectionProps>(), {
  activeFilterCount: 0,
});

const emit = defineEmits<TableFiltersSectionEmits>();

defineSlots<{ default: () => unknown }>();

const { t } = useI18n();

const isExpanded = ref<boolean>(false);

const toggleIcon = computed<string>(() => (isExpanded.value ? "i-lucide-chevron-up" : "i-lucide-chevron-down"));

function onClickClear(): void {
  emit("clear");
}
</script>

<template>
  <UCollapsible
    v-model:open="isExpanded"
    data-testid="table-filters-section"
  >
    <UButton
      color="neutral"
      data-testid="table-filters-section-toggle"
      :icon="toggleIcon"
      variant="outline"
    >
      {{ t('common.table.filters.label') }}

      <UBadge
        v-if="props.activeFilterCount > 0"
        color="primary"
        data-testid="table-filters-section-badge"
        size="sm"
      >
        {{ props.activeFilterCount }}
      </UBadge>
    </UButton>

    <template #content>
      <div class="bg-elevated border border-default flex gap-3 items-center mt-2 p-3 rounded-lg">
        <slot/>

        <UButton
          v-if="props.activeFilterCount > 0"
          :aria-label="t('common.table.filters.clearAll')"
          class="ml-auto"
          color="neutral"
          data-testid="table-filters-section-clear"
          icon="i-lucide-x"
          size="sm"
          variant="ghost"
          @click="onClickClear"
        >
          {{ t('common.table.filters.clearAll') }}
        </UButton>
      </div>
    </template>
  </UCollapsible>
</template>