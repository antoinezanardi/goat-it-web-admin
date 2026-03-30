<script setup lang="ts">
import type { DefaultModalTitleProperties } from "~/components/shared/ui/modal/DefaultModalTitle/default-modal-title.types";

defineProps<DefaultModalTitleProperties>();
</script>

<template>
  <div class="default-modal-title flex gap-2 items-center">
    <UIcon
      class="text-primary"
      :name="icon"
    />

    <span
      data-testid="default-modal-title-text"
    >
      {{ title }}
    </span>
  </div>
</template>