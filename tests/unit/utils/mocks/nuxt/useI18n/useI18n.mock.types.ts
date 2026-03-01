import type { LocaleObject } from "@nuxtjs/i18n";

type SupportedLocaleCodeForMock = "en" | "fr";

type SupportedMockedLocale = LocaleObject<SupportedLocaleCodeForMock>;

export type {
  SupportedMockedLocale,
  SupportedLocaleCodeForMock
};