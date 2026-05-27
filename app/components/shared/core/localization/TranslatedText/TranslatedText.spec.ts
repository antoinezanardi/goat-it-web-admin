import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import { nextTick } from "vue";

import { createFakeLocalizedText } from "~~/tests/unit/utils/faketories/shared/locale/locale.faketory";
import { DEFAULT_MOCKED_LOCALE } from "~~/tests/unit/utils/mocks/composables/nuxt/useI18n/useI18n.mock.constants";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { TranslatedText, TranslationsOverview } from "#components";
import type { UBadge, UPopover } from "#components";

import type { TranslatedTextProperties } from "~/components/shared/core/localization/TranslatedText/translated-text.types";

describe("TranslatedText Component", () => {
  let wrapper: VueWrapper;
  const defaultTranslatedTextProperties: TranslatedTextProperties = {
    localizedText: createFakeLocalizedText({
      [DEFAULT_MOCKED_LOCALE]: "Hello",
    }),
  };

  async function mountTranslatedTextComponent(options: MountSuspendedOptions<typeof TranslatedText> = {}): Promise<VueWrapper> {
    return mountSuspended(TranslatedText, {
      props: defaultTranslatedTextProperties,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountTranslatedTextComponent();
  });

  it("should render the translated text component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Translated text span", () => {
    it("should render the localized-text span when the current locale has a translation.", () => {
      const span = wrapper.find(".localized-text");

      expect(span.exists()).toBeTruthy();
    });

    it("should display the translated text when the current locale has a translation.", () => {
      const span = wrapper.find(".localized-text");

      expect(span.text()).toBe("Hello");
    });

    it("should update the displayed text when the locale changes to another locale with a translation.", async() => {
      await wrapper.setProps({
        localizedText: createFakeLocalizedText({
          en: "Hello",
          fr: "Bonjour",
        }),
      });
      const { locale } = useI18n();
      locale.value = "fr";
      await nextTick();

      const span = wrapper.find(".localized-text");

      expect(span.text()).toBe("Bonjour");
    });

    it("should display the translated text with trimmed text when the current locale has a translation with extra spaces.", async() => {
      await wrapper.setProps({
        localizedText: createFakeLocalizedText({
          [DEFAULT_MOCKED_LOCALE]: "   Hello   ",
        }),
      });

      const span = wrapper.find(".localized-text");

      expect(span.text()).toBe("Hello");
    });
  });

  describe("No translation badge", () => {
    it("should not render the no-translation badge when the current locale has a translation.", () => {
      const badge = wrapper.find(".no-translation-badge");

      expect(badge.exists()).toBeFalsy();
    });

    it("should render the no-translation badge when the current locale has no translation.", async() => {
      await wrapper.setProps({ localizedText: createFakeLocalizedText({ [DEFAULT_MOCKED_LOCALE]: undefined }) });

      const badge = wrapper.findComponent<typeof UBadge>({ name: "UBadge" });

      expect(badge.exists()).toBeTruthy();
    });

    it("should display the no translation key in the badge when the current locale has no translation.", async() => {
      await wrapper.setProps({ localizedText: createFakeLocalizedText({ [DEFAULT_MOCKED_LOCALE]: undefined }) });

      const badge = wrapper.findComponent<typeof UBadge>({ name: "UBadge" });

      expect(badge.text()).toBe("common.noTranslation");
    });

    it("should not render the localized-text span when the current locale has no translation.", async() => {
      await wrapper.setProps({ localizedText: createFakeLocalizedText({ [DEFAULT_MOCKED_LOCALE]: undefined }) });

      const span = wrapper.find(".localized-text");

      expect(span.exists()).toBeFalsy();
    });

    it("should not render the localized-text span when the current locale has an empty trimmed translation.", async() => {
      await wrapper.setProps({ localizedText: createFakeLocalizedText({ [DEFAULT_MOCKED_LOCALE]: "    " }) });

      const span = wrapper.find(".localized-text");

      expect(span.exists()).toBeFalsy();
    });

    it("should show the no-translation badge when the locale changes to one with no translation.", async() => {
      await wrapper.setProps({
        localizedText: createFakeLocalizedText({
          en: "Hello",
          fr: undefined,
        }),
      });
      const { locale } = useI18n();
      locale.value = "fr";
      await nextTick();

      const badge = wrapper.findComponent<typeof UBadge>({ name: "UBadge" });

      expect(badge.exists()).toBeTruthy();
    });

    it("should wrap the no-translation badge in a UPopover when the current locale has no translation.", async() => {
      await wrapper.setProps({ localizedText: createFakeLocalizedText({ [DEFAULT_MOCKED_LOCALE]: undefined }) });

      const popover = wrapper.findComponent<typeof UPopover>({ name: "UPopover" });

      expect(popover.exists()).toBeTruthy();
    });

    it("should render the TranslationsOverview component in the popover content when the current locale has no translation.", async() => {
      wrapper = await mountTranslatedTextComponent({
        props: { localizedText: createFakeLocalizedText({ [DEFAULT_MOCKED_LOCALE]: undefined }) },
        global: {
          stubs: {
            UPopover: {
              template: "<div><slot /><slot name=\"content\" /></div>",
            },
          },
        },
      });

      const translationsOverview = wrapper.findComponent(TranslationsOverview);

      expect(translationsOverview.exists()).toBeTruthy();
    });

    it("should pass the localizedText prop to the TranslationsOverview component when the current locale has no translation.", async() => {
      const localizedText = createFakeLocalizedText({ fr: "Bonjour", [DEFAULT_MOCKED_LOCALE]: undefined });
      wrapper = await mountTranslatedTextComponent({
        props: { localizedText },
        global: {
          stubs: {
            UPopover: {
              template: "<div><slot /><slot name=\"content\" /></div>",
            },
          },
        },
      });

      const translationsOverview = wrapper.findComponent(TranslationsOverview);

      expect(translationsOverview.props("localizedText")).toStrictEqual(localizedText);
    });

    it("should not render the UPopover when the current locale has a translation.", () => {
      const popover = wrapper.findComponent<typeof UPopover>({ name: "UPopover" });

      expect(popover.exists()).toBeFalsy();
    });
  });
});