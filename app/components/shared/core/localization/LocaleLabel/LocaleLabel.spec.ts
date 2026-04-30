import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { LocaleLabel } from "#components";

import { LOCALE_FLAG_ICONS } from "~/components/shared/core/localization/LocaleLabel/locale-label.constants";
import type { LocaleLabelProperties } from "~/components/shared/core/localization/LocaleLabel/locale-label.types";

describe("LocaleLabel Component", () => {
  let wrapper: VueWrapper;
  const defaultProps: LocaleLabelProperties = { locale: "fr" };

  async function mountLocaleLabelComponent(options: MountSuspendedOptions<typeof LocaleLabel> = {}): Promise<VueWrapper> {
    return mountSuspended(LocaleLabel, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountLocaleLabelComponent();
  });

  it("should render the root span with correct data-testid when locale is fr.", () => {
    const rootSpan = wrapper.find("[data-testid='locale-label-fr']");

    expect(rootSpan.exists()).toBeTruthy();
  });

  it("should render the flag icon with the correct circle-flags class when locale is fr.", () => {
    const icon = wrapper.find(".iconify");

    expect(icon.classes()).toContain("i-circle-flags:fr");
  });

  it("should render the locale text from i18n when locale is fr.", () => {
    const textSpan = wrapper.find("[data-testid='locale-label-fr'] .font-semibold");

    expect(textSpan.text()).toBe("localization.locales.shortCode.fr");
  });

  describe("With en locale", () => {
    beforeEach(async() => {
      wrapper = await mountLocaleLabelComponent({ props: { locale: "en" } });
    });

    it("should render the root span with correct data-testid when locale is en.", () => {
      const rootSpan = wrapper.find("[data-testid='locale-label-en']");

      expect(rootSpan.exists()).toBeTruthy();
    });

    it("should render the flag icon with the correct circle-flags class when locale is en.", () => {
      const icon = wrapper.find(".iconify");

      expect(icon.classes()).toContain("i-circle-flags:gb");
    });

    it("should render the locale text from i18n when locale is en.", () => {
      const textSpan = wrapper.find("[data-testid='locale-label-en'] .font-semibold");

      expect(textSpan.text()).toBe("localization.locales.shortCode.en");
    });
  });

  describe("Flag Icons", () => {
    it("should have flag icons defined for all locales when constants are loaded.", () => {
      expect(LOCALE_FLAG_ICONS).toStrictEqual({
        en: "i-circle-flags-gb",
        fr: "i-circle-flags-fr",
        de: "i-circle-flags-de",
        es: "i-circle-flags-es",
        it: "i-circle-flags-it",
        pt: "i-circle-flags-pt",
      });
    });
  });
});