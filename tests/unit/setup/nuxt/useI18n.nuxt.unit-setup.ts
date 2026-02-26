import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi, beforeEach, type Mock } from "vitest";
import { ref } from "vue";

type I18nMock = {
  t: Mock<(key: string) => string>;
  locale: Ref<string>;
  localeCodes: Ref<string[]>;
  locales: Ref<{ code: string; name: string; dir: string }[]>;
  setLocale: Mock<(locale: string) => void>;
}

function createI18nMock(): I18nMock {
  return {
    t: vi.fn<(key: string) => string>((key) => key.toString()),
    locale: ref<string>("fr"),
    localeCodes: ref<string[]>(["en", "fr"]),
    locales: ref([
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
    ]),
    setLocale: vi.fn<(locale: string) => void>(),
  };
}

let i18nMock = createI18nMock();

mockNuxtImport("useI18n", () => () => i18nMock);

beforeEach(() => {
  i18nMock = createI18nMock();
});
