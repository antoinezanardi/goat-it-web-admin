import type { SupportedMockedLocale, SupportedLocaleCodeForMock } from "~~/tests/unit/utils/mocks/nuxt/useI18n/useI18n.mock.types";

const DEFAULT_MOCKED_LOCALE = "fr" as const satisfies SupportedLocaleCodeForMock;

const MOCKED_LOCALE_CODES = [
  "en",
  "fr"
] as const satisfies SupportedLocaleCodeForMock[];

const MOCKED_LOCALES: SupportedMockedLocale[] = [
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
] as const;

export {
  DEFAULT_MOCKED_LOCALE,
  MOCKED_LOCALE_CODES,
  MOCKED_LOCALES
};
