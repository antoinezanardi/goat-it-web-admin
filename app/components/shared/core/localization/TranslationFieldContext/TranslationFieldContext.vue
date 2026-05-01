<script setup lang="ts">
import type { TranslationFieldContextProperties } from "~/components/shared/core/localization/TranslationFieldContext/translation-field-context.types";

const props = defineProps<TranslationFieldContextProperties>();

const { t } = useI18n();

const isOpen = ref<boolean>(false);

const buttonTrailingIcon = computed<string>(() => (isOpen.value ? "i-lucide-chevron-down" : "i-lucide-chevron-right"));
</script>

<template>
  <UCollapsible
    v-model:open="isOpen"
    class="mt-2"
    data-testid="translation-field-context"
  >
    <UButton
      class="justify-between w-full"
      color="info"
      icon="i-lucide-globe"
      :label="t('localization.seeTranslationsFor', { label })"
      size="xs"
      :trailing-icon="buttonTrailingIcon"
      variant="outline"
    />

    <template #content>
      <div class="bg-muted/50 border border-default mt-1 p-2 rounded-md">
        <TranslationsOverview
          v-if="props.localizedText"
          key="translations-overview-1"
          hide-header
          :localized-text="props.localizedText"
        />

        <TranslationsOverview
          v-else
          key="translations-overview-2"
          hide-header
          :localized-texts="props.localizedTexts"
        />
      </div>
    </template>
  </UCollapsible>
</template>