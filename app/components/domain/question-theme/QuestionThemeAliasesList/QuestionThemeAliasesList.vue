<script lang="ts" setup>
import type { QuestionThemeAliasesListProps } from "~/components/domain/question-theme/QuestionThemeAliasesList/question-theme-aliases-list.types";

const props = defineProps<QuestionThemeAliasesListProps>();

const { locale: currentLocale } = useI18n();

const aliases = computed<string[]>(() => {
  const values = props.localizedTexts[currentLocale.value];

  if (!values) {
    return [];
  }
  return values.map(value => value.trim()).filter(Boolean);
});

const isAtLeastOneAlias = computed<boolean>(() => aliases.value.length > 0);
</script>

<template>
  <div id="question-theme-aliases-list">
    <div
      v-if="isAtLeastOneAlias"
      class="flex flex-wrap gap-2 justify-center"
    >
      <QuestionThemeAliasPill
        v-for="alias in aliases"
        :key="alias"
        :alias="alias"
        :data-testid="`alias-pill-${alias}`"
      />
    </div>

    <UPopover v-else>
      <UBadge
        class="border-dashed cursor-pointer rounded-lg"
        color="neutral"
        data-testid="aliases-none-badge"
        icon="i-lucide-circle-slash"
        variant="outline"
      >
        {{ $t("questionThemes.aliases.noneForLocale") }}
      </UBadge>

      <template #content>
        <div class="p-3">
          <TranslationsOverview :localized-texts="localizedTexts"/>
        </div>
      </template>
    </UPopover>
  </div>
</template>