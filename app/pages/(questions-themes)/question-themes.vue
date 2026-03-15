<script setup lang="ts">
import { PageHeader } from "#components";

import { QUESTION_THEMES_PAGE_ICON, QUESTION_THEMES_PAGE_TITLE_KEY } from "~/pages/(questions-themes)/question-themes.constants";

definePageMeta({
  titleKey: QUESTION_THEMES_PAGE_TITLE_KEY,
  icon: QUESTION_THEMES_PAGE_ICON,
});
</script>

<template>
  <div id="question-themes-page">
    <PageHeader
      :icon="QUESTION_THEMES_PAGE_ICON"
      :title="$t(QUESTION_THEMES_PAGE_TITLE_KEY)"
    />
  </div>
</template>