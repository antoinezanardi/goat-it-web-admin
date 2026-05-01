import type { LocalizedText } from "@goat-it/schemas/shared/locale";

import type { UseLocalizedValue } from "~/composables/core/localization/use-localized-value/use-localized-value.types";
import { isLocalizedValueMissing, getLocalizedDisplayValue } from "#shared/utils/helpers/localization/localization.helpers";

function useLocalizedValue(localizedText: MaybeRef<Partial<LocalizedText>>): UseLocalizedValue {
  const { locale: currentLocale } = useI18n();

  const isCurrentLocaleMissing = computed<boolean>(() => isLocalizedValueMissing(toValue(localizedText), currentLocale.value));

  const currentLocaleDisplayValue = computed<string | undefined>(() => getLocalizedDisplayValue(toValue(localizedText), currentLocale.value));

  return { isCurrentLocaleMissing, currentLocaleDisplayValue };
}

export { useLocalizedValue };