import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi } from "vitest";
import { ref } from "vue";

const mockInstance = {
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

const { useI18nMock } = vi.hoisted(() => ({
  useI18nMock: vi.fn(() => mockInstance),
}));

mockNuxtImport("useI18n", () => useI18nMock);

export {
  useI18nMock,
};
