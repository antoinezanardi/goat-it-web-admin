import { LOCALES } from "@goat-it/schemas/shared/locale";
import type { Locale, LocalizedText, LocalizedTexts } from "@goat-it/schemas/shared/locale";

import type { UseTranslationCompleteness } from "~/composables/core/localization/use-translation-completeness/use-translation-completeness.types";
import { isLocalizedValueMissing } from "#shared/utils/helpers/localization/localization.helpers";

function useTranslationCompleteness(requiredFields: MaybeRef<(Partial<LocalizedText> | Partial<LocalizedTexts>)[]>): UseTranslationCompleteness {
  const totalCount = LOCALES.length;

  const localeStatuses = computed<Record<Locale, boolean>>(() => {
    const fields = toValue(requiredFields);

    // Acceptable as LOCALES guarantees all Locale keys will be populated
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    return Object.fromEntries(LOCALES.map(locale => [locale, fields.every(field => !isLocalizedValueMissing(field, locale))])) as Record<Locale, boolean>;
  });

  const completedCount = computed<number>(() => Object.values(localeStatuses.value).filter(Boolean).length);

  const isFullyTranslated = computed<boolean>(() => completedCount.value === totalCount);

  function isLocaleComplete(locale: Locale): boolean {
    return localeStatuses.value[locale];
  }
  return { completedCount, totalCount, localeStatuses, isFullyTranslated, isLocaleComplete };
}

export { useTranslationCompleteness };