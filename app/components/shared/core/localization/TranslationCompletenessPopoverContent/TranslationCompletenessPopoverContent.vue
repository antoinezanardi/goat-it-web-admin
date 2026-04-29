<script setup lang="ts">
import { LOCALES } from "@goat-it/schemas/shared/locale";
import type { Locale, LocalizedText } from "@goat-it/schemas/shared/locale";

import type { TranslationCompletenessPopoverContentProperties } from "~/components/shared/core/localization/TranslationCompletenessPopoverContent/translation-completeness-popover-content.types";

const props = defineProps<TranslationCompletenessPopoverContentProperties>();

const { t } = useI18n();

// Acceptable as requiredFields may contain LocalizedTexts but isLocalizedValueMissing handles both
// oxlint-disable-next-line typescript/no-unsafe-type-assertion
const requiredFieldsReference = toRef(() => props.requiredFields as LocalizedText[]);
const { localeStatuses } = useTranslationCompleteness(requiredFieldsReference);

function isLocaleComplete(locale: Locale): boolean {
  return localeStatuses.value[locale];
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
        :color="isLocaleComplete(locale) ? 'success' : 'error'"
        :data-testid="`locale-status-${locale}`"
        size="xs"
        variant="subtle"
      >
        <LocaleLabel :locale="locale"/>
        {{ isLocaleComplete(locale) ? "✓" : "✗" }}
      </UBadge>
    </div>
  </div>
</template>