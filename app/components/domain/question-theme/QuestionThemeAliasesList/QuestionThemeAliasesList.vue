<script lang="ts" setup>
import type { LocalizedTexts } from "@goat-it/schemas/shared/locale";

import type { QuestionThemeAliasesListProperties } from "~/components/domain/question-theme/QuestionThemeAliasesList/question-theme-aliases-list.types";

const props = defineProps<QuestionThemeAliasesListProperties>();

const isAtLeastOneAlias = computed<boolean>(() => !!props.aliases && props.aliases.length > 0);

const hasLocalizedTextsContext = computed<boolean>(() => !!props.localizedTexts);

// Acceptable as this computed is only accessed in template when hasLocalizedTextsContext is true
// oxlint-disable-next-line typescript/no-unsafe-type-assertion
const definedLocalizedTexts = computed<Partial<LocalizedTexts>>(() => props.localizedTexts as Partial<LocalizedTexts>);
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

    <UPopover v-else-if="hasLocalizedTextsContext">
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
          <TranslationsOverview :localized-texts="definedLocalizedTexts"/>
        </div>
      </template>
    </UPopover>

    <UBadge
      v-else
      class="rounded-lg"
      color="neutral"
      data-testid="aliases-none-badge"
      icon="i-lucide-circle-slash"
      variant="outline"
    >
      {{ $t("questionThemes.aliases.noneForLocale") }}
    </UBadge>
  </div>
</template>