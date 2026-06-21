<script setup lang="ts">
import type { TableFiltersSectionEmits, TableFiltersSectionProps, TableFiltersSectionSlots } from "~/components/shared/table/TableFiltersSection/table-filters-section.types";

const props = withDefaults(defineProps<TableFiltersSectionProps>(), {
  activeFilterCount: 0,
});

const emit = defineEmits<TableFiltersSectionEmits>();

defineSlots<TableFiltersSectionSlots>();

const { t } = useI18n();

const CONTENT_ID = "table-filters-section-content";

const isExpanded = ref<boolean>(false);

const toggleIcon = computed<string>(() => (isExpanded.value ? "i-lucide-chevron-up" : "i-lucide-chevron-down"));

function onToggle(): void {
  isExpanded.value = !isExpanded.value;
}

function onClickClear(): void {
  emit("clear");
}
</script>

<template>
  <div
    :data-state="isExpanded ? 'open' : 'closed'"
    data-testid="table-filters-section"
  >
    <div class="flex items-center justify-between w-full">
      <UButton
        :aria-controls="CONTENT_ID"
        :aria-expanded="isExpanded"
        color="neutral"
        data-testid="table-filters-section-toggle"
        :icon="toggleIcon"
        variant="outline"
        @click="onToggle"
      >
        {{ t('common.table.filters.label') }}

        <UBadge
          v-if="props.activeFilterCount > 0"
          class="font-bold ml-1"
          color="info"
          data-testid="table-filters-section-badge"
          size="sm"
        >
          {{ props.activeFilterCount }}
        </UBadge>
      </UButton>

      <slot name="toolbarEnd"/>
    </div>

    <div
      v-if="isExpanded"
      :id="CONTENT_ID"
      class="bg-elevated border border-default flex flex-wrap gap-3 items-center mt-2 p-3 rounded-lg w-full"
      :data-state="isExpanded ? 'open' : 'closed'"
    >
      <slot/>

      <UButton
        v-if="props.activeFilterCount > 0"
        :aria-label="t('common.table.filters.clearAll')"
        class="ml-auto"
        color="error"
        data-testid="table-filters-section-clear"
        icon="i-lucide-x"
        size="sm"
        variant="outline"
        @click="onClickClear"
      >
        {{ t('common.table.filters.clearAll') }}
      </UButton>
    </div>
  </div>
</template>