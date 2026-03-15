<script setup lang="ts">
import { HOME_PAGE_ICON, HOME_PAGE_TITLE_KEY } from "~/pages/index.constants";

definePageMeta({
  titleKey: HOME_PAGE_TITLE_KEY,
  icon: HOME_PAGE_ICON,
});
</script>

<template>
  <div id="home-page">
    <PageHeader
      :icon="HOME_PAGE_ICON"
      :title="$t(HOME_PAGE_TITLE_KEY)"
    />
  </div>
</template>