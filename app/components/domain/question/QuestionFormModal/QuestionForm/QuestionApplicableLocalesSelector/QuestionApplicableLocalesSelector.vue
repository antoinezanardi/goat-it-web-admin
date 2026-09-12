<script setup lang="ts">
import { LOCALES } from "@goat-it/schemas/shared/locale";
import type { Locale } from "@goat-it/schemas/shared/locale";

import { LOCALE_FLAG_ICONS } from "~/components/shared/core/localization/LocaleLabel/locale-label.constants";
import type { QuestionApplicableLocalesSelectorEmits, QuestionApplicableLocalesSelectorProps } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionApplicableLocalesSelector/question-applicable-locales-selector.types";

const props = defineProps<QuestionApplicableLocalesSelectorProps>();
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

function isLocaleSelected(locale: Locale): boolean {
  return props.modelValue?.includes(locale) ?? false;
}
</script>

<template>
  <UFormField
    class="w-full"
    data-testid="question-applicable-locales-selector"
    :label="$t('questions.fields.applicableLocales')"
    name="applicableLocales"
  >
    <USelectMenu
      class="w-full"
      data-testid="question-applicable-locales-select"
      :disabled="disabled"
      :items="selectItems"
      :model-value="modelValue"
      multiple
      :placeholder="$t('questions.placeholders.applicableLocales')"
      value-key="value"
      @update:model-value="onUpdateModelValue"
    >
      <template #default="{ 'modelValue': selected }">
        <span
          v-if="Array.isArray(selected) && selected.length > 0"
          class="flex flex-wrap gap-x-1.5 gap-y-1 items-center"
        >
          <span
            v-for="locale in selected"
            :key="locale"
            class="gap-1 inline-flex items-center"
            :data-testid="`question-applicable-locales-trigger-${locale}`"
          >
            <UIcon
              class="size-3.5"
              :name="LOCALE_FLAG_ICONS[locale]"
            />
            {{ t(`localization.locales.shortCode.${locale}`) }}
          </span>
        </span>

        <span
          v-else
          data-slot="placeholder"
        >
          {{ $t('questions.placeholders.applicableLocales') }}
        </span>
      </template>

      <template #item="{ item, ui }">
        <span class="flex flex-1 gap-2 items-center">
          <UIcon
            class="size-3.5"
            :name="item.icon"
          />
          {{ item.label }}
        </span>

        <UIcon
          v-if="isLocaleSelected(item.value)"
          :class="ui.itemTrailingIcon()"
          data-slot="itemTrailingIcon"
          name="i-lucide-check"
        />
      </template>
    </USelectMenu>
  </UFormField>
</template>