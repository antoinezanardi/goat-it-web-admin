<script setup lang="ts">
import type { ArrayValues } from "type-fest";

import type { Locale } from "#ui/types";

type SupportedLocale = ArrayValues<typeof localeCodes.value>;

const { locale: currentLocale, setLocale, locales, localeCodes } = useI18n();

function isSupportedLocale(locale: string): locale is SupportedLocale {
  // This is acceptable because we are checking if the locale is included in the list of supported locale codes, which is a runtime check that ensures type safety.
   
  return localeCodes.value.includes(locale as SupportedLocale);
}

async function onLocaleChange(updatedLocale: string): Promise<void> {
  if (!isSupportedLocale(updatedLocale)) {
    return;
  }
  await setLocale(updatedLocale);
}
</script>

<template>
  <ULocaleSelect
    :locales="locales as Locale<undefined>[]"
    :model-value="currentLocale"
    @update:model-value="onLocaleChange"
  />
</template>