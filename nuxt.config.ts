// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "@vueuse/nuxt",
  ],
  devtools: {
    enabled: true,
  },
  ui: {
    fonts: false,

  },
  css: ["~/assets/css/main.css"],
  compatibilityDate: "2025-01-15",
});