import type { ComputedRef } from "vue";

type UseLocalizedValue = {
  isCurrentLocaleMissing: ComputedRef<boolean>;
  currentLocaleDisplayValue: ComputedRef<string | undefined>;
};

export type { UseLocalizedValue };