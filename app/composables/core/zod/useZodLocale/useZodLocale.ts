import type { Ref } from "vue";
import { z } from "zod";

type ZodLocaleI18n = {
  locale: Ref<string>;
  t: (key: string) => string;
};

const SLUG_REGEX_PATTERN = String.raw`/^[\da-z]+(?:-[\da-z]+)*$/u`;
const HEX_COLOR_REGEX_PATTERN = String.raw`/^#[\dA-Fa-f]{6}$/u`;

const zodLocaleMap: Record<string, () => ReturnType<typeof z.locales.fr>> = {
  fr: z.locales.fr,
  en: z.locales.en,
};

function useZodLocale(i18n: ZodLocaleI18n): void {
  const { locale, t } = i18n;

  function getCustomErrorMessage(issue: z.core.$ZodRawIssue): string | undefined {
    if (issue.code === "invalid_format" && "pattern" in issue) {
      if (issue.pattern === SLUG_REGEX_PATTERN) {
        return t("validation.invalidKebabCase");
      }

      if (issue.pattern === HEX_COLOR_REGEX_PATTERN) {
        return t("validation.invalidHexColor");
      }
    }
    return undefined;
  }

  function setCurrentLocaleInZodConfig(currentLocale: string): void {
    const localeFactory = zodLocaleMap[currentLocale] ?? z.locales.en;

    z.config({
      ...localeFactory(),
      customError: issue => getCustomErrorMessage(issue),
    });
  }

  setCurrentLocaleInZodConfig(locale.value);

  watch(locale, (updatedLocale: string) => {
    setCurrentLocaleInZodConfig(updatedLocale);
  });
}

export type { ZodLocaleI18n };

export { useZodLocale };