import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import { nextTick } from "vue";

import { createFakeLocalizedText } from "~~/tests/unit/utils/faketories/shared/locale/locale.faketory";
import { DEFAULT_MOCKED_LOCALE } from "~~/tests/unit/utils/mocks/composables/nuxt/useI18n/useI18n.mock.constants";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { LocalizedText } from "#components";
import type { UBadge } from "#components";

import type { LocalizedTextProperties } from "~/components/shared/core/localization/LocalizedText/localized-text.types";

describe("Localized Text Component", () => {
  let wrapper: VueWrapper;
  const defaultLocalizedTextProperties: LocalizedTextProperties = {
    localizedText: {
      [DEFAULT_MOCKED_LOCALE]: "Hello",
    },
  } as const;

  async function mountLocalizedTextComponent(options: MountSuspendedOptions<typeof LocalizedText> = {}): Promise<VueWrapper> {
    return mountSuspended(LocalizedText, {
      props: defaultLocalizedTextProperties,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountLocalizedTextComponent();
  });

  it("should render the localized text component when mounted.", () => {
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
      wrapper = await mountLocalizedTextComponent({
        props: {
          localizedText: createFakeLocalizedText({
            en: "Hello",
            fr: "Bonjour",
          }),
        },
      });
      const { locale } = useI18n();
      locale.value = "fr";
      await nextTick();

      const span = wrapper.find(".localized-text");

      expect(span.text()).toBe("Bonjour");
    });

    it("should not render the no-translation badge when the current locale has a translation.", () => {
      const badge = wrapper.find(".no-translation-badge");

      expect(badge.exists()).toBeFalsy();
    });
  });

  describe("No translation badge", () => {
    it("should render the no-translation badge when the current locale has no translation.", async() => {
      wrapper = await mountLocalizedTextComponent({
        props: {
          localizedText: {},
        },
      });

      const badge = wrapper.findComponent<typeof UBadge>({ name: "UBadge" });

      expect(badge.exists()).toBeTruthy();
    });

    it("should use the warning color for the no-translation badge when the current locale has no translation.", async() => {
      wrapper = await mountLocalizedTextComponent({
        props: {
          localizedText: {},
        },
      });

      const badge = wrapper.findComponent<typeof UBadge>({ name: "UBadge" });

      expect(badge.props("color")).toBe("warning");
    });

    it("should use the subtle variant for the no-translation badge when the current locale has no translation.", async() => {
      wrapper = await mountLocalizedTextComponent({
        props: {
          localizedText: {},
        },
      });

      const badge = wrapper.findComponent<typeof UBadge>({ name: "UBadge" });

      expect(badge.props("variant")).toBe("subtle");
    });

    it("should display the no translation key in the badge when the current locale has no translation.", async() => {
      wrapper = await mountLocalizedTextComponent({
        props: {
          localizedText: {},
        },
      });

      const badge = wrapper.findComponent<typeof UBadge>({ name: "UBadge" });

      expect(badge.text()).toBe("common.noTranslation");
    });

    it("should not render the localized-text span when the current locale has no translation.", async() => {
      wrapper = await mountLocalizedTextComponent({
        props: {
          localizedText: {},
        },
      });

      const span = wrapper.find(".localized-text");

      expect(span.exists()).toBeFalsy();
    });

    it("should show the no-translation badge when the locale changes to one with no translation.", async() => {
      wrapper = await mountLocalizedTextComponent({
        props: {
          localizedText: createFakeLocalizedText({
            en: "Hello",
            fr: undefined,
          }),
        },
      });
      const { locale } = useI18n();
      locale.value = "fr";
      await nextTick();

      const badge = wrapper.findComponent<typeof UBadge>({ name: "UBadge" });

      expect(badge.exists()).toBeTruthy();
    });
  });
});