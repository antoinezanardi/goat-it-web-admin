<script setup lang="ts">
import { LOCALES } from "@goat-it/schemas/shared/locale";
import type { Locale } from "@goat-it/schemas/shared/locale";

import type { TranslationsOverviewProps } from "~/components/shared/core/localization/TranslationsOverview/translations-overview.types";
import { getLocalizedDisplayValue, getLocalizedTextsDisplayValues, isLocalizedValueMissing } from "#shared/utils/helpers/localization/localization.helpers";

const props = withDefaults(defineProps<TranslationsOverviewProps>(), {
  hideHeader: false,
});

const { locale: currentLocale, t } = useI18n();

const otherLocales = computed<Locale[]>(() => LOCALES.filter(locale => locale !== currentLocale.value));

function isMissing(locale: Locale): boolean {
  if (props.localizedText) {
    return isLocalizedValueMissing(props.localizedText, locale);
  }
  if (props.localizedTexts) {
    return isLocalizedValueMissing(props.localizedTexts, locale);
  }
  return true;
}

function getDisplayValue(locale: Locale): string {
  if (props.localizedText) {
    return getLocalizedDisplayValue(props.localizedText, locale) ?? t("localization.missingTranslation");
  }
  return t("localization.missingTranslation");
}

function getDisplayValues(locale: Locale): string[] {
  if (!props.localizedTexts) {
    return [t("localization.missingTranslation")];
  }
  return getLocalizedTextsDisplayValues(props.localizedTexts, locale) ?? [t("localization.missingTranslation")];
}

function getDisplayValueClass(locale: Locale): string {
  return isMissing(locale) ? "text-error italic" : "text-default";
}

const localeDisplayData = computed(() => otherLocales.value.map(locale => ({
  locale,
  isList: Boolean(props.localizedTexts) && !isMissing(locale),
  values: getDisplayValues(locale),
  value: getDisplayValue(locale),
  cssClass: getDisplayValueClass(locale),
})));
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

      <USeparator
        class="mb-2"
        data-testid="translations-overview-header-separator"
      />
    </div>

    <div class="flex flex-col gap-1">
      <template
        v-for="(data, index) in localeDisplayData"
        :key="data.locale"
      >
        <USeparator
          v-if="index > 0"
          :data-testid="`locale-separator-${data.locale}`"
        />

        <div
          class="flex gap-2 items-start text-sm"
          :data-testid="`locale-value-${data.locale}`"
        >
          <LocaleLabel :locale="data.locale"/>

          <ul
            v-if="data.isList"
            class="list-disc list-inside"
          >
            <li
              v-for="(value, valueIndex) in data.values"
              :key="valueIndex"
              :class="data.cssClass"
            >
              {{ value }}
            </li>
          </ul>

          <span
            v-else
            :class="data.cssClass"
          >
            {{ data.value }}
          </span>
        </div>
      </template>
    </div>
  </div>
</template>