<script setup lang="ts">
import { LOCALES } from "@goat-it/schemas/shared/locale";
import type { Locale } from "@goat-it/schemas/shared/locale";

import type { TranslationCompletenessPopoverContentProperties } from "~/components/shared/core/localization/TranslationCompletenessPopoverContent/translation-completeness-popover-content.types";

const props = defineProps<TranslationCompletenessPopoverContentProperties>();

const { t } = useI18n();

const requiredFieldsReference = toRef(() => props.requiredFields);
const { localeStatuses } = useTranslationCompleteness(requiredFieldsReference);

function isLocaleComplete(locale: Locale): boolean {
  return localeStatuses.value[locale];
}

function getBadgeColor(locale: Locale): "success" | "error" {
  return isLocaleComplete(locale) ? "success" : "error";
}
</script>

<template>
  <div
    class="p-3"
    data-testid="translation-completeness-popover"
  >
    <div class="flex font-semibold gap-1.5 items-center mb-2 text-muted text-sm">
      <UIcon
        class="size-4"
        name="i-lucide-globe"
      />

      {{ t("localization.translationStatus") }}
    </div>

    <USeparator class="mb-2"/>

    <div class="flex flex-wrap gap-1">
      <UBadge
        v-for="locale in LOCALES"
        :key="locale"
        :color="getBadgeColor(locale)"
        :data-testid="`locale-status-${locale}`"
        size="xs"
        variant="subtle"
      >
        <LocaleLabel :locale="locale"/>

        <UIcon
          :class="isLocaleComplete(locale) ? 'size-3' : 'size-3'"
          data-testid="locale-status-icon"
          :name="isLocaleComplete(locale) ? 'i-lucide-check' : 'i-lucide-x'"
        />
      </UBadge>
    </div>
  </div>
</template>