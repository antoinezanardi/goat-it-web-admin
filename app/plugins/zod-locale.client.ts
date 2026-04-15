export default defineNuxtPlugin(() => {
  const { $i18n } = useNuxtApp();

  useZodLocale($i18n);
});