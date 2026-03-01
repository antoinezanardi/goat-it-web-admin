import { vi, type Mock } from "vitest";
import { ref, type Ref } from "vue";
import type { SupportedLocaleCodeForMock, SupportedMockedLocale } from "~~/tests/unit/utils/mocks/nuxt/useI18n/useI18n.mock.types";
import { DEFAULT_MOCKED_LOCALE, MOCKED_LOCALE_CODES, MOCKED_LOCALES } from "./useI18n.mock.constants";

type UseI18nMock = {
  t: Mock<(key: string) => string>;
  locale: Ref<SupportedLocaleCodeForMock>;
  localeCodes: Ref<SupportedLocaleCodeForMock[]>;
  locales: Ref<SupportedMockedLocale[]>;
  setLocale: Mock<(locale: SupportedLocaleCodeForMock) => void>;
};

/**
 * Creates a mock implementation of the `useI18n` composable for unit testing purposes.
 * Can only be used from unit tests setup functions.
 */
function createUseI18nMock(): UseI18nMock {
  return {
    t: vi.fn<(key: string) => string>((key: string) => key),
    locale: ref<SupportedLocaleCodeForMock>(DEFAULT_MOCKED_LOCALE),
    localeCodes: ref<SupportedLocaleCodeForMock[]>([...MOCKED_LOCALE_CODES]),
    locales: ref<SupportedMockedLocale[]>([...MOCKED_LOCALES]),
    setLocale: vi.fn<(locale: SupportedLocaleCodeForMock) => void>(),
  };
}

export type { UseI18nMock };

export { createUseI18nMock };