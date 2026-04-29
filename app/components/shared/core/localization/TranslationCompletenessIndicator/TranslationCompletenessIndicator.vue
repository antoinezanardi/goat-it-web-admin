<script setup lang="ts">
import type { LocalizedText } from "@goat-it/schemas/shared/locale";

import type { TranslationCompletenessIndicatorProperties } from "~/components/shared/core/localization/TranslationCompletenessIndicator/translation-completeness-indicator.types";
import {
  TRANSLATION_COMPLETENESS_RING_CIRCUMFERENCE,
  TRANSLATION_COMPLETENESS_RING_RADIUS,
  TRANSLATION_COMPLETENESS_RING_SIZE,
} from "~/components/shared/core/localization/TranslationCompletenessIndicator/translation-completeness-indicator.constants";

const props = defineProps<TranslationCompletenessIndicatorProperties>();

const { t } = useI18n();

// Acceptable as requiredFields may contain LocalizedTexts but isLocalizedValueMissing handles both
// oxlint-disable-next-line typescript/no-unsafe-type-assertion
const requiredFieldsReference = toRef(() => props.requiredFields as LocalizedText[]);
const { completedCount, totalCount, isFullyTranslated } = useTranslationCompleteness(requiredFieldsReference);
const strokeDashoffset = computed<number>(() => TRANSLATION_COMPLETENESS_RING_CIRCUMFERENCE * (1 - completedCount.value / totalCount));

const ringColor = computed<string>(() => {
  if (isFullyTranslated.value) {
    return "var(--ui-color-success-500)";
  }
  if (completedCount.value <= 1) {
    return "var(--ui-color-error-500)";
  }
  return "var(--ui-color-warning-500)";
});
</script>

<template>
  <UPopover>
    <div
      :aria-label="t('localization.translationStatus')"
      class="cursor-pointer relative"
      data-testid="translation-completeness-ring"
      role="button"
      :style="{ 'width': `${TRANSLATION_COMPLETENESS_RING_SIZE}px`, 'height': `${TRANSLATION_COMPLETENESS_RING_SIZE}px` }"
      tabindex="0"
    >
      <svg
        :height="TRANSLATION_COMPLETENESS_RING_SIZE"
        :viewBox="`0 0 ${TRANSLATION_COMPLETENESS_RING_SIZE} ${TRANSLATION_COMPLETENESS_RING_SIZE}`"
        :width="TRANSLATION_COMPLETENESS_RING_SIZE"
      >
        <circle
          :cx="TRANSLATION_COMPLETENESS_RING_SIZE / 2"
          :cy="TRANSLATION_COMPLETENESS_RING_SIZE / 2"
          fill="none"
          :r="TRANSLATION_COMPLETENESS_RING_RADIUS"
          stroke="var(--ui-border)"
          stroke-width="3"
        />

        <circle
          :cx="TRANSLATION_COMPLETENESS_RING_SIZE / 2"
          :cy="TRANSLATION_COMPLETENESS_RING_SIZE / 2"
          fill="none"
          :r="TRANSLATION_COMPLETENESS_RING_RADIUS"
          :stroke="ringColor"
          :stroke-dasharray="TRANSLATION_COMPLETENESS_RING_CIRCUMFERENCE"
          :stroke-dashoffset="strokeDashoffset"
          stroke-linecap="round"
          stroke-width="3"
          :transform="`rotate(-90 ${TRANSLATION_COMPLETENESS_RING_SIZE / 2} ${TRANSLATION_COMPLETENESS_RING_SIZE / 2})`"
        />
      </svg>

      <UIcon
        class="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-4 top-1/2"
        name="i-lucide-globe"
      />
    </div>

    <template #content>
      <TranslationCompletenessPopoverContent :required-fields="requiredFields"/>
    </template>
  </UPopover>
</template>