<script setup lang="ts">
import type { PageHeaderProperties } from "~/components/shared/PageHeader/page-header.types";

defineProps<PageHeaderProperties>();
</script>

<template>
  <UContainer>
    <UPageHeader>
      <template #title>
        <div class="flex gap-4 items-center justify-center">
          <UIcon
            class="text-primary"
            :name="icon"
          />

          {{ title }}
        </div>
      </template>
    </UPageHeader>
  </UContainer>
</template>