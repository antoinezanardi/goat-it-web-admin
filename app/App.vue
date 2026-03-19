<script lang="ts" setup>
import { APP_TOAST_CONFIG, APP_TOOLTIP_CONFIG } from "~/app.constants";

const questionThemesStore = useQuestionThemesStore();
const { fetchAndStoreQuestionThemes } = questionThemesStore;
const { locale } = useI18n();

useHead({
  htmlAttrs: {
    lang: locale,
  },
});

void callOnce(fetchAndStoreQuestionThemes);
</script>

<template>
  <UApp
    :toaster="APP_TOAST_CONFIG"
    :tooltip="APP_TOOLTIP_CONFIG"
  >
    <NuxtLayout name="default-layout">
      <NuxtPage/>
    </NuxtLayout>
  </UApp>
</template>