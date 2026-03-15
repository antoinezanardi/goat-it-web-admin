<script setup lang="ts">
import { PageHeader } from "#components";

import { QUESTIONS_PAGE_ICON, QUESTIONS_PAGE_TITLE_KEY } from "~/pages/(questions)/questions.constants";

definePageMeta({
  titleKey: QUESTIONS_PAGE_TITLE_KEY,
  icon: QUESTIONS_PAGE_ICON,
});
</script>

<template>
  <div id="questions-page">
    <PageHeader
      :icon="QUESTIONS_PAGE_ICON"
      :title="$t(QUESTIONS_PAGE_TITLE_KEY)"
    />
  </div>
</template>