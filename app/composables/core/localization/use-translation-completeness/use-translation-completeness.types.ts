import type { ComputedRef, MaybeRef } from "vue";
import type { Locale } from "@goat-it/schemas/shared/locale";

type UseTranslationCompletenessOptions = {
  applicableLocales?: MaybeRef<Locale[]>;
};

type UseTranslationCompleteness = {
  completedCount: ComputedRef<number>;
  totalCount: ComputedRef<number>;
  localeStatuses: ComputedRef<Record<Locale, boolean>>;
  isFullyTranslated: ComputedRef<boolean>;
  isLocaleComplete: (locale: Locale) => boolean;
  isLocaleApplicable: (locale: Locale) => boolean;
};

export type { UseTranslationCompleteness, UseTranslationCompletenessOptions };