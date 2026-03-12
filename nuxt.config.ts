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
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  imports: {
    dirs: ["~/composables/**/use*.ts"],
  },
  devtools: {
    enabled: true,
  },
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
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
  compatibilityDate: "2025-01-15",
  typescript: {
    shim: true,
    strict: true,
    typeCheck: true,
    tsConfig: {
      compilerOptions: {
        noImplicitReturns: true,
        noImplicitAny: true,
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
  pinia: {
    storesDirs: ["stores/**"],
  },
});