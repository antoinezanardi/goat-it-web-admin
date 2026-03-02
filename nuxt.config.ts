// https://nuxt.com/docs/api/configuration/nuxt-config
import type { NuxtConfig } from "@nuxt/schema";

const config: NuxtConfig = {
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },
  modules: [
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "@nuxt/hints",
    "@pinia/nuxt",
  ],
  typescript: {
    shim: true,
    strict: true,
    typeCheck: true,
    tsConfig: {
      include: ["../tests/"],
    },
  },
  devtools: {
    enabled: true,
  },
  ui: {
    experimental: {
      componentDetection: true,
    },
  },
  css: ["~/assets/css/main.css"],
  compatibilityDate: "2025-01-15",
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  i18n: {
    defaultLocale: "fr",
    locales: [
      {
        code: "fr",
        language: "fr-FR",
        name: "Français",
        files: [
          "fr/home.json",
          "fr/questions.json",
          "fr/question-themes.json",
          "fr/common.json",
          "fr/navigation.json",
        ],
      },
      {
        code: "en",
        language: "en-US",
        name: "English",
        files: [
          "en/home.json",
          "en/questions.json",
          "en/question-themes.json",
          "en/common.json",
          "en/navigation.json",
        ],
      },
    ],
    strategy: "no_prefix",
    restructureDir: "app/i18n",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },
};

export default defineNuxtConfig(config) as NuxtConfig;