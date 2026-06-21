<script setup lang="ts">
import type { TranslatedTextProps } from "~/components/shared/core/localization/TranslatedText/translated-text.types";

const props = defineProps<TranslatedTextProps>();

const { isCurrentLocaleMissing, currentLocaleDisplayValue } = useLocalizedValue(toRef(() => props.localizedText));

const { t } = useI18n();
</script>

<template>
  <div class="localized-text-container">
    <UPopover v-if="isCurrentLocaleMissing">
      <UBadge
        class="border-dashed cursor-pointer no-translation-badge"
        color="warning"
        icon="i-lucide-globe-x"
        variant="subtle"
      >
        {{ t("common.noTranslation") }}
      </UBadge>

      <template #content>
        <div class="p-3">
          <TranslationsOverview :localized-text="localizedText"/>
        </div>
      </template>
    </UPopover>

    <span
      v-else
      class="localized-text"
    >
      {{ currentLocaleDisplayValue }}
    </span>
  </div>
</template>