import { LocaleSelect, ULocaleSelect } from "#components";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import { nextTick } from "vue";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

describe("Locale Select Component", () => {
  let wrapper: VueWrapper;

  async function mountLocaleSelectComponent(options: MountSuspendedOptions = {}): Promise<VueWrapper> {
    return await mountSuspended(LocaleSelect, {
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountLocaleSelectComponent();
  });

  it("should render the locale select component when mounted.", async() => {
    expect(wrapper.exists()).toBe(true);
  });

  describe("Nuxt UI Locale Select", () => {
    it("should pass a changed locale as modelValue prop to the Nuxt UI Locale Select component when the locale is changed.", async() => {
      const { locale } = useI18n();
      const nuxtUILocaleSelect = wrapper.findComponent<typeof ULocaleSelect>({ ref: "nuxt-ui-locale-select" });
      locale.value = "en";
      await nextTick();

      expect(nuxtUILocaleSelect.props("modelValue")).toBe("en");
    });

    it("should pass the current locale as modelValue prop to the Nuxt UI Locale Select component when mounted.", async() => {
      const nuxtUILocaleSelect = wrapper.findComponent<typeof ULocaleSelect>({ ref: "nuxt-ui-locale-select" });

      expect(nuxtUILocaleSelect.props("modelValue")).toBe("fr");
    });

    it("should pass the supported locales as localeCodes prop to the Nuxt UI Locale Select component when mounted.", async() => {
      const { locales } = useI18n();
      const nuxtUILocaleSelect = wrapper.findComponent<typeof ULocaleSelect>({ ref: "nuxt-ui-locale-select" });

      expect(nuxtUILocaleSelect.props("locales")).toStrictEqual(locales.value);
    });

    it("should set a new locale when a new locale is selected in the Nuxt UI Locale Select component.", async() => {
      const { setLocale } = useI18n();
      const nuxtUILocaleSelect = wrapper.findComponent<typeof ULocaleSelect>({ ref: "nuxt-ui-locale-select" });

      nuxtUILocaleSelect.vm.$emit("update:modelValue", "fr");

      expect(setLocale).toHaveBeenCalledExactlyOnceWith("fr");
    });

    it("should not set a new locale when the new locale is not supported.", async() => {
      const { setLocale } = useI18n();
      const nuxtUILocaleSelect = wrapper.findComponent<typeof ULocaleSelect>({ ref: "nuxt-ui-locale-select" });

      nuxtUILocaleSelect.vm.$emit("update:modelValue", "es");

      expect(setLocale).not.toHaveBeenCalled();
    });
  });
});
