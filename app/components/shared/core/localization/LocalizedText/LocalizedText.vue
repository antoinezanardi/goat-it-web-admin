<script setup lang="ts">
import type { LocalizedTextProperties } from "~/components/shared/core/localization/LocalizedText/localized-text.types";
import { isNonEmptyString } from "#shared/utils/helpers/string.helpers";

const props = defineProps<LocalizedTextProperties>();

const { locale: currentLocale, t } = useI18n();

const trimmedTranslatedText = computed<string | undefined>(() => props.localizedText[currentLocale.value]?.trim());

const isTranslatedTextAvailable = computed<boolean>(() => isNonEmptyString(trimmedTranslatedText.value));
</script>

<template>
  <div class="localized-text-container">
    <UBadge
      v-if="!isTranslatedTextAvailable"
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
      {{ trimmedTranslatedText }}
    </span>
  </div>
</template>