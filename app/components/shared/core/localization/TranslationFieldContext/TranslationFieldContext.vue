<script setup lang="ts">
import type { TranslationFieldContextProperties } from "~/components/shared/core/localization/TranslationFieldContext/translation-field-context.types";

defineProps<TranslationFieldContextProperties>();

const { t } = useI18n();

const isOpen = ref<boolean>(false);
</script>

<template>
  <UCollapsible
    v-model:open="isOpen"
    class="mt-2"
    data-testid="translation-field-context"
  >
    <UButton
      class="justify-between w-full"
      color="neutral"
      icon="i-lucide-globe"
      :label="t('localization.seeTranslationsFor', { label })"
      size="xs"
      :trailing-icon="isOpen ? 'i-lucide-chevron-down' : 'i-lucide-chevron-right'"
      variant="ghost"
    />

    <template #content>
      <div class="bg-muted/50 border border-default mt-1 p-2 rounded-md">
        <TranslationsOverview
          hide-header
          :localized-text="localizedText"
          :localized-texts="localizedTexts"
        />
      </div>
    </template>
  </UCollapsible>
</template>