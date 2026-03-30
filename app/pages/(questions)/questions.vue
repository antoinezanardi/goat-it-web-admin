<script setup lang="ts">
import { PageHeader } from "#components";

import { QUESTION_ICON } from "~/composables/domain/question/question.constants";
import { QUESTIONS_PAGE_TITLE_KEY } from "~/pages/(questions)/questions.constants";

const { t } = useI18n();

useHead(() => ({
  title: t(QUESTIONS_PAGE_TITLE_KEY),
}));

definePageMeta({
  titleKey: QUESTIONS_PAGE_TITLE_KEY,
  icon: QUESTION_ICON,
});
</script>

<template>
  <div id="questions-page">
    <PageHeader
      :icon="QUESTION_ICON"
      :title="$t(QUESTIONS_PAGE_TITLE_KEY)"
    />
  </div>
</template>