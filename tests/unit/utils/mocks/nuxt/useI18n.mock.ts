import { vi, type Mock } from "vitest";
import { ref, type Ref } from "vue";

export type UseI18nMock = {
  t: Mock<(key: string) => string>;
  locale: Ref<string>;
  localeCodes: Ref<string[]>;
  locales: Ref<{ code: string; name: string; dir: string }[]>;
  setLocale: Mock<(locale: string) => void>;
};

export function createUseI18nMock(): UseI18nMock {
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
