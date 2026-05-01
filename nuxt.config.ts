// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "@nuxt/hints",
    "@pinia/nuxt",
    "@nuxt/eslint",
  ],
  ssr: false,
  pages: {
    pattern: [
      "**/*.vue",
      "!**/*.ts",
    ],
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
      extensions: [".vue"],
    },
  ],
  imports: {
    dirs: [
      "~/composables/**/use*.ts",
      "~/repositories/**/*.repository.ts",
    ],
  },
  devtools: {
    enabled: true,
  },
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    head: {
      htmlAttrs: {
        lang: process.env.NUXT_PUBLIC_DEFAULT_LOCALE,
      },
      title: "Goat It Web Admin",
    },
  },
  css: ["~/assets/css/main.css"],
  ui: {
    experimental: {
      componentDetection: true,
    },
  },
  runtimeConfig: {
    goatItApi: {
      baseUrl: "",
      adminKey: "",
    },
  },
  ignore: [
    "configs/**/*.ts",
    "eslint.config.ts",
  ],
  sourcemap: { client: "hidden" },
  experimental: {
    serverAppConfig: false,
  },
  compatibilityDate: "2025-01-15",
  nitro: {
    imports: {
      dirs: ["shared/utils/helpers/*.helpers.ts"],
    },
  },
  vite: {
    optimizeDeps: {
      include: [
        "@goat-it/schemas/question-theme",
        "@goat-it/schemas/shared/locale",
        "zod",
        "fuse.js",
      ],
    },
  },
  typescript: {
    shim: true,
    strict: true,
    typeCheck: true,
    tsConfig: {
      compilerOptions: {
        noImplicitReturns: true,
        noImplicitAny: true,
        allowImportingTsExtensions: true,
      },
      include: [
        "../tests/",
        "../eslint.config.ts",
        "../configs/",
      ],
    },
  },
  eslint: {
    config: {
      typescript: {
        tsconfigPath: "./tsconfig.json",
      },
      stylistic: true,
    },
  },
  fonts: {
    families: [
      {
        name: "General Sans",
        weights: [
          200,
          300,
          400,
          500,
          600,
          700,
        ],
        styles: [
          "normal",
          "italic",
        ],
        provider: "local",
      },
    ],
  },
  i18n: {
    defaultLocale: process.env.NUXT_PUBLIC_DEFAULT_LOCALE,
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
          "fr/form.json",
          "fr/errors.json",
          "fr/validation.json",
          "fr/localization.json",
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
          "en/form.json",
          "en/errors.json",
          "en/validation.json",
          "en/localization.json",
        ],
      },
      {
        code: "de",
        language: "de-DE",
        name: "Deutsch",
        files: [
          "de/home.json",
          "de/questions.json",
          "de/question-themes.json",
          "de/common.json",
          "de/navigation.json",
          "de/form.json",
          "de/errors.json",
          "de/validation.json",
          "de/localization.json",
        ],
      },
      {
        code: "es",
        language: "es-ES",
        name: "Español",
        files: [
          "es/home.json",
          "es/questions.json",
          "es/question-themes.json",
          "es/common.json",
          "es/navigation.json",
          "es/form.json",
          "es/errors.json",
          "es/validation.json",
          "es/localization.json",
        ],
      },
      {
        code: "it",
        language: "it-IT",
        name: "Italiano",
        files: [
          "it/home.json",
          "it/questions.json",
          "it/question-themes.json",
          "it/common.json",
          "it/navigation.json",
          "it/form.json",
          "it/errors.json",
          "it/validation.json",
          "it/localization.json",
        ],
      },
      {
        code: "pt",
        language: "pt-PT",
        name: "Português",
        files: [
          "pt/home.json",
          "pt/questions.json",
          "pt/question-themes.json",
          "pt/common.json",
          "pt/navigation.json",
          "pt/form.json",
          "pt/errors.json",
          "pt/validation.json",
          "pt/localization.json",
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
  pinia: {
    storesDirs: ["stores/**"],
  },
});