<script lang="ts" setup>
import { APP_TOOLTIP_CONFIG } from "~/app.constants";
</script>

<template>
  <UApp
    ref="nuxt-ui-app"
    :tooltip="APP_TOOLTIP_CONFIG"
  >
    <NuxtLayout name="default-layout">
      <NuxtPage/>
    </NuxtLayout>
  </UApp>
</template>