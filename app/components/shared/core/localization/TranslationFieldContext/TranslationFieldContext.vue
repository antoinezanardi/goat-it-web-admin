<script setup lang="ts">
import type { TranslationFieldContextProperties } from "~/components/shared/core/localization/TranslationFieldContext/translation-field-context.types";
import { isLocalizedValueMissing, getLocalizedTextsDisplayValue } from "#shared/utils/helpers/localization/localization.helpers";

const props = defineProps<TranslationFieldContextProperties>();

const { locale: currentLocale, t } = useI18n();

const isCurrentLocaleEmpty = computed<boolean>(() => {
  if (props.localizedText) {
    return isLocalizedValueMissing(props.localizedText, currentLocale.value);
  }
  if (props.localizedTexts) {
    return getLocalizedTextsDisplayValue(props.localizedTexts, currentLocale.value) === undefined;
  }
  return true;
});

const isOpen = ref<boolean>(unref(isCurrentLocaleEmpty));

watch(isCurrentLocaleEmpty, isEmpty => {
  isOpen.value = isEmpty;
});
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
      :icon="isOpen ? 'i-lucide-chevron-down' : 'i-lucide-chevron-right'"
      :label="t('localization.otherTranslations')"
      size="xs"
      trailing
      variant="ghost"
    />

    <template #content>
      <div class="bg-muted/50 border border-default mt-1 p-2 rounded-md">
        <TranslationsOverview
          :localized-text="localizedText"
          :localized-texts="localizedTexts"
        />
      </div>
    </template>
  </UCollapsible>
</template>