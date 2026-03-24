<script setup lang="ts">
import { QUESTION_THEMES_PAGE_ICON } from "~/pages/(questions-themes)/question-themes.constants";

const open = defineModel("open", { type: Boolean, default: false });

function onCloseModal(): void {
  open.value = false;
}
</script>

<template>
  <LazyUModal
    v-model:open="open"
    @close="onCloseModal"
  >
    <template #title>
      <DefaultModalTitle
        :icon="QUESTION_THEMES_PAGE_ICON"
        :title="$t('questionThemes.createNew')"
      />
    </template>

    <template #footer>
      <DefaultModalFooter
        primary-button-icon="i-lucide-circle-plus"
        :primary-button-label="$t('common.create')"
        @close-modal="onCloseModal"
      />
    </template>
  </LazyUModal>
</template>