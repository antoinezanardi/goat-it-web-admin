<script setup lang="ts">
import { LOCALES } from "@goat-it/schemas/shared/locale";
import type { Locale } from "@goat-it/schemas/shared/locale";

import { LOCALE_FLAG_ICONS } from "~/components/shared/core/localization/LocaleLabel/locale-label.constants";
import type { QuestionApplicableLocalesSelectorEmits, QuestionApplicableLocalesSelectorProps } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionApplicableLocalesSelector/question-applicable-locales-selector.types";

defineProps<QuestionApplicableLocalesSelectorProps>();
const emit = defineEmits<QuestionApplicableLocalesSelectorEmits>();

const { t } = useI18n();

const selectItems = computed<{ icon: string; label: string; value: Locale }[]>(() => LOCALES.map(locale => ({
  label: t(`localization.locales.shortCode.${locale}`),
  value: locale,
  icon: LOCALE_FLAG_ICONS[locale],
})));

function onUpdateModelValue(value: Locale[] | undefined): void {
  emit("update:modelValue", value);
}
</script>

<template>
  <UFormField
    data-testid="question-applicable-locales-selector"
    :label="$t('questions.fields.applicableLocales')"
    name="applicableLocales"
  >
    <USelectMenu
      data-testid="question-applicable-locales-select"
      :disabled="disabled"
      icon="i-lucide-globe"
      :items="selectItems"
      :model-value="modelValue"
      multiple
      :placeholder="$t('questions.placeholders.applicableLocales')"
      value-key="value"
      @update:model-value="onUpdateModelValue"
    >
      <template #item="{ item }">
        <UIcon
          class="size-3.5"
          :name="item.icon"
        />
        {{ item.label }}
      </template>
    </USelectMenu>
  </UFormField>
</template>