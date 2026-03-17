<script lang="ts" setup>
import type { QuestionThemeAliasesListProperties } from "~/components/domain/question-theme/QuestionThemeAliasesList/question-theme-aliases-list.types";

const props = defineProps<QuestionThemeAliasesListProperties>();

const isAtLeastOneAlias = computed<boolean>(() => !!props.aliases && props.aliases.length > 0);
</script>

<template>
  <div id="question-theme-aliases-list">
    <div
      v-if="isAtLeastOneAlias"
      class="flex gap-2 justify-center"
    >
      <QuestionThemeAliasPill
        v-for="alias in aliases"
        :key="alias"
        :alias="alias"
      />
    </div>

    <UBadge
      v-else
      class="rounded-lg"
      color="neutral"
      icon="i-lucide-circle-slash"
      variant="outline"
    >
      {{ $t("questionThemes.aliases.noneForLocale") }}
    </UBadge>
  </div>
</template>