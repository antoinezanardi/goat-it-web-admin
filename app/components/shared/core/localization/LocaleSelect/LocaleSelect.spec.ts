import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import { nextTick } from "vue";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import { DEFAULT_MOCKED_LOCALE, MOCKED_LOCALE_CODES } from "~~/tests/unit/utils/mocks/composables/nuxt/useI18n/useI18n.mock.constants";

import type { ULocaleSelect } from "#components";
import { LocaleSelect } from "#components";

import { LOCALE_SELECT_UI } from "~/components/shared/core/localization/LocaleSelect/locale-select.constants.ts";

describe("LocaleSelect Component", () => {
  let wrapper: VueWrapper;

  async function mountLocaleSelectComponent(options: MountSuspendedOptions<typeof LocaleSelect> = {}): Promise<VueWrapper> {
    return mountSuspended(LocaleSelect, {
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountLocaleSelectComponent();
  });

  it("should render the locale select component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Nuxt UI Locale Select", () => {
    it("should pass a changed locale as modelValue prop to the Nuxt UI Locale Select component when the locale is changed.", async() => {
      const { locale } = useI18n();
      const nuxtUILocaleSelect = wrapper.getComponent<typeof ULocaleSelect>({ name: "ULocaleSelect" });
      locale.value = MOCKED_LOCALE_CODES[0];
      await nextTick();

      expect(nuxtUILocaleSelect.props("modelValue")).toBe(MOCKED_LOCALE_CODES[0]);
    });

    it("should pass the current locale as modelValue prop to the Nuxt UI Locale Select component when mounted.", () => {
      const nuxtUILocaleSelect = wrapper.getComponent<typeof ULocaleSelect>({ name: "ULocaleSelect" });

      expect(nuxtUILocaleSelect.props("modelValue")).toBe(DEFAULT_MOCKED_LOCALE);
    });

    it("should pass the supported locales as localeCodes prop to the Nuxt UI Locale Select component when mounted.", () => {
      const { locales } = useI18n();
      const nuxtUILocaleSelect = wrapper.getComponent<typeof ULocaleSelect>({ name: "ULocaleSelect" });

      expect(nuxtUILocaleSelect.props("locales")).toStrictEqual(locales.value);
    });

    it("should set a new locale when a new locale is selected in the Nuxt UI Locale Select component.", () => {
      const { setLocale } = useI18n();
      const nuxtUILocaleSelect = wrapper.getComponent<typeof ULocaleSelect>({ name: "ULocaleSelect" });

      nuxtUILocaleSelect.vm.$emit("update:modelValue", MOCKED_LOCALE_CODES[0]);

      expect(setLocale).toHaveBeenCalledExactlyOnceWith(MOCKED_LOCALE_CODES[0]);
    });

    it("should pass the ui prop to hide value text on mobile when mounted.", () => {
      const nuxtUILocaleSelect = wrapper.getComponent<typeof ULocaleSelect>({ name: "ULocaleSelect" });

      expect(nuxtUILocaleSelect.props("ui")).toStrictEqual(LOCALE_SELECT_UI);
    });

    it("should not set a new locale when the new locale is not supported.", () => {
      const { setLocale } = useI18n();
      const nuxtUILocaleSelect = wrapper.getComponent<typeof ULocaleSelect>({ name: "ULocaleSelect" });

      nuxtUILocaleSelect.vm.$emit("update:modelValue", "ja");

      expect(setLocale).not.toHaveBeenCalled();
    });
  });
});