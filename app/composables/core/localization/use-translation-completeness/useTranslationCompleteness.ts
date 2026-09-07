import { LOCALES } from "@goat-it/schemas/shared/locale";
import type { Locale, LocalizedText, LocalizedTexts } from "@goat-it/schemas/shared/locale";

import type { UseTranslationCompleteness, UseTranslationCompletenessOptions } from "~/composables/core/localization/use-translation-completeness/use-translation-completeness.types";
import { isLocalizedValueMissing } from "#shared/utils/helpers/localization/localization.helpers";

function useTranslationCompleteness(
  requiredFields: MaybeRef<(Partial<LocalizedText> | Partial<LocalizedTexts> | undefined)[]>,
  options?: UseTranslationCompletenessOptions,
): UseTranslationCompleteness {
  const effectiveApplicable = computed<Locale[]>(() => {
    const value = toValue(options?.applicableLocales);

    return value && value.length > 0 ? value : [...LOCALES];
  });

  const totalCount = effectiveApplicable.value.length;

  const localeStatuses = computed<Record<Locale, boolean>>(() => {
    const fields = toValue(requiredFields);
    const applicable = effectiveApplicable.value;

    // Acceptable as LOCALES guarantees all Locale keys will be populated
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    return Object.fromEntries(LOCALES.map(locale => [
      locale,
      applicable.includes(locale) ? fields.every(field => field === undefined || !isLocalizedValueMissing(field, locale)) : true,
    ])) as Record<Locale, boolean>;
  });

  const completedCount = computed<number>(() => effectiveApplicable.value.filter(locale => localeStatuses.value[locale]).length);

  const isFullyTranslated = computed<boolean>(() => completedCount.value === totalCount);

  function isLocaleComplete(locale: Locale): boolean {
    return localeStatuses.value[locale];
  }

  function isLocaleApplicable(locale: Locale): boolean {
    return effectiveApplicable.value.includes(locale);
  }
  return { completedCount, totalCount, localeStatuses, isFullyTranslated, isLocaleComplete, isLocaleApplicable };
}

export { useTranslationCompleteness };