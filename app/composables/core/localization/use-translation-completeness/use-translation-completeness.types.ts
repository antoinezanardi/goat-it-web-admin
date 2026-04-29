import type { ComputedRef } from "vue";
import type { Locale } from "@goat-it/schemas/shared/locale";

type TranslationCompleteness = {
  completedCount: ComputedRef<number>;
  totalCount: number;
  localeStatuses: ComputedRef<Record<Locale, boolean>>;
  isFullyTranslated: ComputedRef<boolean>;
};

export type { TranslationCompleteness };