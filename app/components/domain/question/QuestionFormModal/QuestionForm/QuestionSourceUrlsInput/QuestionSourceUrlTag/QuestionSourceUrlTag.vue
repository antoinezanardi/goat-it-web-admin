<script setup lang="ts">
import type { QuestionSourceUrlTagProperties } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionSourceUrlsInput/QuestionSourceUrlTag/question-source-url-tag.types";

const props = defineProps<QuestionSourceUrlTagProperties>();

const { t } = useI18n();

const domain = computed<string>(() => new URL(props.url).hostname.replace(/^www\./u, ""));

const tooltipText = computed<string>(() => t("questions.sourceUrlTag.goTo", { url: props.url }));
</script>

<template>
  <UTooltip :text="tooltipText">
    <a
      class="cursor-pointer gap-1 inline-flex items-center rounded-sm"
      :href="url"
      rel="noopener noreferrer"
      target="_blank"
    >
      <UIcon
        class="size-3.5 text-muted"
        name="i-lucide-link"
      />

      <span>{{ domain }}</span>
    </a>
  </UTooltip>
</template>