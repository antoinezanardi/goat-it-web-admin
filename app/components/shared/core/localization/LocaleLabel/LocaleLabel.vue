<script setup lang="ts">
import type { LocaleLabelProperties } from "~/components/shared/core/localization/LocaleLabel/locale-label.types";
import { LOCALE_FLAG_ICONS } from "~/components/shared/core/localization/LocaleLabel/locale-label.constants";

const props = defineProps<LocaleLabelProperties>();

const { t } = useI18n();

const flagIcon = computed<string>(() => LOCALE_FLAG_ICONS[props.locale]);
</script>

<template>
  <span
    class="gap-1 inline-flex items-center"
    :data-testid="`locale-label-${locale}`"
  >
    <UIcon
      class="size-3.5"
      :name="flagIcon"
    />

    <span class="font-semibold text-muted text-xs uppercase w-6">{{ t(`localization.locales.${locale}`) }}</span>
  </span>
</template>