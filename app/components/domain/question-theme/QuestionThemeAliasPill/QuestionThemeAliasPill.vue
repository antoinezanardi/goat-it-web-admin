<script lang="ts" setup>
import type { QuestionThemeAliasPillProps } from "~/components/domain/question-theme/QuestionThemeAliasPill/question-theme-alias-pill.types";

defineProps<QuestionThemeAliasPillProps>();
</script>

<template>
  <UBadge
    id="question-theme-alias-pill"
    class="rounded-full"
    color="secondary"
    variant="outline"
  >
    {{ alias }}
  </UBadge>
</template>