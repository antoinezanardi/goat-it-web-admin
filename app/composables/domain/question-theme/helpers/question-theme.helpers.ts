import type { Locale } from "@goat-it/schemas/shared/locale";

import { getLocalizedDisplayValue } from "#shared/utils/helpers/localization/localization.helpers";

function getThemeLocalizedLabel(theme: QuestionTheme | undefined, locale: Locale, missingTranslation: string): string {
  if (!theme) {
    return missingTranslation;
  }
  return getLocalizedDisplayValue(theme.label, locale) ?? missingTranslation;
}

export { getThemeLocalizedLabel };