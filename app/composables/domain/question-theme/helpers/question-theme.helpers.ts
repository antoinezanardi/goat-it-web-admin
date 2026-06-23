import type { Locale } from "@goat-it/schemas/shared/locale";

import { getLocalizedDisplayValue } from "#shared/utils/helpers/localization/localization.helpers";
import { QUESTION_THEME_SLUG_ICON_MAP, QUESTION_THEME_UNKNOWN_ICON } from "~/composables/domain/question-theme/constants/question-theme.constants";

function getThemeLocalizedLabel(theme: QuestionTheme | undefined, locale: Locale, missingTranslation: string): string {
  if (!theme) {
    return missingTranslation;
  }
  return getLocalizedDisplayValue(theme.label, locale) ?? missingTranslation;
}

function getThemeIcon(slug: string): string {
  return QUESTION_THEME_SLUG_ICON_MAP[slug] ?? QUESTION_THEME_UNKNOWN_ICON;
}

export {
  getThemeIcon,
  getThemeLocalizedLabel,
};