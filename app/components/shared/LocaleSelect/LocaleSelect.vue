<script setup lang="ts">
import type { Locale } from "#ui/types";

const { locale: currentLocale, setLocale, locales } = useI18n();

function isSupportedLocale(locale: string): locale is typeof currentLocale.value {
  return locale === "fr" || locale === "en";
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
    :model-value="currentLocale"
    :locales="locales as Locale<undefined>[]"
    @update:model-value="onLocaleChange"
  />
</template>