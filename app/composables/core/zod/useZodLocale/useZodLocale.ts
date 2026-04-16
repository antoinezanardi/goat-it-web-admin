import type { Composer } from "vue-i18n";
import { z } from "zod";

import { INVALID_FORMAT_PATTERN_TO_I18N_KEY_MAP, ZOD_LOCALE_MAP } from "~/composables/core/zod/useZodLocale/use-zod-locale.constants";

function getInvalidFormatTranslation(issue: z.core.$ZodRawIssue, t: Composer["t"]): string | undefined {
  if (issue.code !== "invalid_format" || !("pattern" in issue) || typeof issue.pattern !== "string") {
    return undefined;
  }
  const i18nKey = INVALID_FORMAT_PATTERN_TO_I18N_KEY_MAP[issue.pattern as keyof typeof INVALID_FORMAT_PATTERN_TO_I18N_KEY_MAP];

  if (!i18nKey) {
    return undefined;
  }
  return t(i18nKey);
}

function getCustomErrorMessage(issue: z.core.$ZodRawIssue, t: Composer["t"]): string | undefined {
  return getInvalidFormatTranslation(issue, t);
}

function isLocaleSupported(locale: string): locale is keyof typeof ZOD_LOCALE_MAP {
  return locale in ZOD_LOCALE_MAP;
}

function useZodLocale(i18n: Composer): void {
  const { locale, t } = i18n;

  function setCurrentLocaleInZodConfig(currentLocale: string): void {
    const localeFactory = isLocaleSupported(currentLocale) ? ZOD_LOCALE_MAP[currentLocale] : z.locales.en;

    z.config({
      ...localeFactory(),
      customError: issue => getCustomErrorMessage(issue, t),
    });
  }

  setCurrentLocaleInZodConfig(locale.value);

  watch(locale, (updatedLocale: string) => {
    setCurrentLocaleInZodConfig(updatedLocale);
  });
}

export {
  getCustomErrorMessage,
  getInvalidFormatTranslation,
  isLocaleSupported,
  useZodLocale,
};