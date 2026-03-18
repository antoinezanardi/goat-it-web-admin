<script setup lang="ts">
import type { LocalizedTextProperties } from "~/components/shared/core/localization/LocalizedText/localized-text.types";

const props = defineProps<LocalizedTextProperties>();

const { locale: currentLocale, t } = useI18n();

const translatedText = computed<string | undefined>(() => props.localizedText[currentLocale.value]);
</script>

<template>
  <div class="localized-text-container">
    <UBadge
      v-if="translatedText === undefined"
      class="no-translation-badge"
      color="warning"
      icon="i-lucide-globe-x"
      variant="subtle"
    >
      {{ t("common.noTranslation") }}
    </UBadge>

    <span
      v-else
      class="localized-text"
    >
      {{ translatedText }}
    </span>
  </div>
</template>