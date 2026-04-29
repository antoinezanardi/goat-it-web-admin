<script setup lang="ts">
import { LOCALES } from "@goat-it/schemas/shared/locale";
import type { Locale } from "@goat-it/schemas/shared/locale";

import type { TranslationsOverviewProperties } from "~/components/shared/core/localization/TranslationsOverview/translations-overview.types";
import { getLocalizedDisplayValue, getLocalizedTextsDisplayValue, isLocalizedValueMissing } from "#shared/utils/helpers/localization/localization.helpers";

const props = defineProps<TranslationsOverviewProperties>();

const { locale: currentLocale, t } = useI18n();

const otherLocales = computed<Locale[]>(() => LOCALES.filter(locale => locale !== currentLocale.value));

function getDisplayValue(locale: Locale): string {
  if (props.localizedText) {
    return getLocalizedDisplayValue(props.localizedText, locale) ?? t("localization.missingTranslation");
  }
  if (props.localizedTexts) {
    return getLocalizedTextsDisplayValue(props.localizedTexts, locale) ?? t("localization.missingTranslation");
  }
  return t("localization.missingTranslation");
}

function isMissing(locale: Locale): boolean {
  if (props.localizedText) {
    return isLocalizedValueMissing(props.localizedText, locale);
  }
  if (props.localizedTexts) {
    return getLocalizedTextsDisplayValue(props.localizedTexts, locale) === undefined;
  }
  return true;
}
</script>

<template>
  <div class="translations-overview">
    <div class="font-semibold mb-2 text-muted text-xs uppercase">
      {{ t("localization.otherTranslations") }}
    </div>

    <div class="flex flex-col gap-1">
      <div
        v-for="locale in otherLocales"
        :key="locale"
        class="flex gap-2 items-baseline text-sm"
        :data-testid="`locale-value-${locale}`"
      >
        <span class="font-semibold text-muted text-xs uppercase w-6">{{ locale.toUpperCase() }}</span>

        <span :class="isMissing(locale) ? 'text-error italic' : 'text-default'">
          {{ getDisplayValue(locale) }}
        </span>
      </div>
    </div>
  </div>
</template>