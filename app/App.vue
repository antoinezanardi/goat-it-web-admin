<script lang="ts" setup>
import { APP_TOOLTIP_CONFIG } from "~/app.constants";

const questionThemesStore = useQuestionThemesStore();
const { fetchAndStoreQuestionThemes } = questionThemesStore;

await callOnce(fetchAndStoreQuestionThemes);
</script>

<template>
  <UApp
    :tooltip="APP_TOOLTIP_CONFIG"
  >
    <NuxtLayout name="default-layout">
      <NuxtPage/>
    </NuxtLayout>
  </UApp>
</template>