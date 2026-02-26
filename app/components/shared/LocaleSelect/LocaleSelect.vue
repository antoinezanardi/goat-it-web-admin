<script setup lang="ts">
import type { Locale } from "#ui/types";
import type { ArrayValues } from "type-fest";

type SupportedLocale = ArrayValues<typeof localeCodes.value>;

const { locale: currentLocale, setLocale, locales, localeCodes } = useI18n();

function isSupportedLocale(locale: string): locale is SupportedLocale {
  return localeCodes.value.includes(locale as SupportedLocale);
}

function onLocaleChange(newLocale: string): void {
  if (!isSupportedLocale(newLocale)) {
    return;
  }
  setLocale(newLocale);
}
</script>

<template>
  <ULocaleSelect
    ref="nuxt-ui-locale-select"
    :model-value="currentLocale"
    :locales="locales as Locale<undefined>[]"
    @update:model-value="onLocaleChange"
  />
</template>