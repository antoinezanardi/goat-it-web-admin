<script setup lang="ts">
import { LOCALES } from "@goat-it/schemas/shared/locale";
import type { Locale } from "@goat-it/schemas/shared/locale";

import type { TranslationCompletenessPopoverContentProps } from "~/components/shared/core/localization/TranslationCompletenessIndicator/TranslationCompletenessPopoverContent/translation-completeness-popover-content.types";

const props = defineProps<TranslationCompletenessPopoverContentProps>();

const { t } = useI18n();

const requiredFieldsReference = toRef(() => props.requiredFields);
const applicableLocalesReference = computed<Locale[] | undefined>(() => props.applicableLocales);
const { isLocaleComplete, isLocaleApplicable } = useTranslationCompleteness(requiredFieldsReference, {
  applicableLocales: applicableLocalesReference,
});

const applicableLocaleLabels = computed<string>(() => props.applicableLocales?.map(locale => t(`localization.locales.shortCode.${locale}`)).join(", ") ?? "");

function getBadgeColor(locale: Locale): "success" | "error" | "neutral" {
  if (!isLocaleApplicable(locale)) {
    return "neutral";
  }
  return isLocaleComplete(locale) ? "success" : "error";
}

function getIconName(locale: Locale): string {
  if (!isLocaleApplicable(locale)) {
    return "i-lucide-minus";
  }
  return isLocaleComplete(locale) ? "i-lucide-check" : "i-lucide-x";
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

    <div
      v-if="applicableLocaleLabels"
      class="mb-2 text-muted text-xs"
      data-testid="translation-completeness-applies-to"
    >
      {{ t("localization.appliesTo", { "locales": applicableLocaleLabels }) }}
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
          class="size-3"
          data-testid="locale-status-icon"
          :name="getIconName(locale)"
          :title="!isLocaleApplicable(locale) ? t('localization.notApplicable') : undefined"
        />
      </UBadge>
    </div>
  </div>
</template>