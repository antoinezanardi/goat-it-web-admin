<script setup lang="ts">
definePageMeta({
  titleKey: "questions.pageTitle",
  icon: "i-lucide-message-circle-question-mark",
});
</script>

<template>
  <div id="questions-page">
    <h1>
      {{ $t("questions.pageTitle") }}
    </h1>
  </div>
</template>