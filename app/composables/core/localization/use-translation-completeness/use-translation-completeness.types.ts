import type { ComputedRef } from "vue";
import type { Locale } from "@goat-it/schemas/shared/locale";

type UseTranslationCompleteness = {
  completedCount: ComputedRef<number>;
  totalCount: number;
  localeStatuses: ComputedRef<Record<Locale, boolean>>;
  isFullyTranslated: ComputedRef<boolean>;
  isLocaleComplete: (locale: Locale) => boolean;
};

export type { UseTranslationCompleteness };