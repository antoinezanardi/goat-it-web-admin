<script lang="ts" setup>
import type { LoadingSpinnerProps } from "~/components/shared/ui/LoadingSpinner/loading-spinner.types";
import { isNonEmptyString } from "#shared/utils/helpers/string/string.helpers";

defineProps<LoadingSpinnerProps>();
</script>

<template>
  <div
    id="loading-spinner"
    class="flex gap-2 items-center justify-center"
  >
    <UIcon
      class="animate-spin size-10 text-primary"
      name="i-lucide-loader-circle"
    />

    <span
      v-if="isNonEmptyString(label)"
      id="loading-spinner-label"
      class="font-medium text-xl"
    >
      {{ label }}
    </span>
  </div>
</template>