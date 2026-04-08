<script setup lang="ts">
import { HOME_PAGE_ICON, HOME_PAGE_ORDER, HOME_PAGE_TITLE_KEY } from "~/pages/index.constants";

const { t } = useI18n();

useHead(() => ({
  title: t(HOME_PAGE_TITLE_KEY),
}));

definePageMeta({
  titleKey: HOME_PAGE_TITLE_KEY,
  icon: HOME_PAGE_ICON,
  order: HOME_PAGE_ORDER,
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