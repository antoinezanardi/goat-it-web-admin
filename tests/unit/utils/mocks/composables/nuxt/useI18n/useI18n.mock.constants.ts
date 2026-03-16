import type { SupportedMockedLocale, SupportedLocaleCodeForMock } from "~~/tests/unit/utils/mocks/composables/nuxt/useI18n/useI18n.mock.types";

const DEFAULT_MOCKED_LOCALE = "en" as const satisfies SupportedLocaleCodeForMock;

const MOCKED_LOCALE_CODES = [
  "en",
  "fr",
] as const satisfies readonly SupportedLocaleCodeForMock[];

const MOCKED_LOCALES = [
  {
    code: "en",
    name: "English",
    dir: "ltr",
  },
  {
    code: "fr",
    name: "Français",
    dir: "ltr",
  },
] as const satisfies readonly SupportedMockedLocale[];

export {
  DEFAULT_MOCKED_LOCALE,
  MOCKED_LOCALE_CODES,
  MOCKED_LOCALES,
};