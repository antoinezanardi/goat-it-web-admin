<script setup lang="ts">
import NumberFlow from "@number-flow/vue";

import type { DashboardSummaryTabEmits, DashboardSummaryTabProps } from "~/components/domain/dashboard/DashboardSummaryTabs/DashboardSummaryTab/dashboard-summary-tab.types";

const props = defineProps<DashboardSummaryTabProps>();

const emit = defineEmits<DashboardSummaryTabEmits>();

const cardClass = computed<Record<string, boolean>>(() => ({
  "ring-2 ring-(--ui-primary)": props.active,
}));

function onSelect(): void {
  if (!props.active) {
    emit("select");
  }
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    onSelect();
  }
}
</script>

<template>
  <UCard
    :aria-label="$t(props.labelKey)"
    :aria-selected="props.active"
    class="cursor-pointer transition-all"
    :class="cardClass"
    :data-testid="props.testId"
    role="tab"
    tabindex="0"
    @click="onSelect"
    @keydown="onKeydown"
  >
    <div class="flex gap-3 items-center">
      <UIcon
        class="size-12"
        :class="props.iconClass"
        :name="props.icon"
      />

      <div class="flex flex-col">
        <span class="text-muted text-sm">{{ $t(props.labelKey) }}</span>

        <USkeleton
          v-if="props.isFetching"
          class="h-8 w-20"
        />

        <span
          v-else
          class="font-bold text-3xl text-default"
        >
          <NumberFlow :value="props.value"/>
        </span>
      </div>
    </div>
  </UCard>
</template>