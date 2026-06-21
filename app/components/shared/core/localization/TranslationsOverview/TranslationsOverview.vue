<script setup lang="ts">
import { LOCALES } from "@goat-it/schemas/shared/locale";
import type { Locale } from "@goat-it/schemas/shared/locale";

import type { TranslationsOverviewProps } from "~/components/shared/core/localization/TranslationsOverview/translations-overview.types";
import { getLocalizedDisplayValue, getLocalizedTextsDisplayValue, isLocalizedValueMissing } from "#shared/utils/helpers/localization/localization.helpers";

const props = withDefaults(defineProps<TranslationsOverviewProps>(), {
  hideHeader: false,
});

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
    return isLocalizedValueMissing(props.localizedTexts, locale);
  }
  return true;
}

function getDisplayValueClass(locale: Locale): string {
  return isMissing(locale) ? "text-error italic" : "text-default";
}
</script>

<template>
  <div class="translations-overview">
    <div v-if="!hideHeader">
      <div
        class="flex font-semibold gap-1.5 items-center mb-2 text-muted text-sm"
        data-testid="translations-overview-header"
      >
        <UIcon
          class="size-4"
          name="i-lucide-globe"
        />

        {{ t("localization.otherTranslations") }}
      </div>

      <USeparator class="mb-2"/>
    </div>

    <div class="flex flex-col gap-1">
      <div
        v-for="locale in otherLocales"
        :key="locale"
        class="flex gap-2 items-center text-sm"
        :data-testid="`locale-value-${locale}`"
      >
        <LocaleLabel :locale="locale"/>

        <span :class="getDisplayValueClass(locale)">
          {{ getDisplayValue(locale) }}
        </span>
      </div>
    </div>
  </div>
</template>