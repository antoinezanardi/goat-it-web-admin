import { LOCALES } from "@goat-it/schemas/shared/locale";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import { createFakeLocalizedText, createFakeLocalizedTexts } from "@goat-it/schemas/testing/shared";

import { DEFAULT_MOCKED_LOCALE } from "~~/tests/unit/utils/mocks/composables/nuxt/useI18n/useI18n.mock.constants";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { LocaleLabel, TranslationsOverview } from "#components";

import type { TranslationsOverviewProps } from "~/components/shared/core/localization/TranslationsOverview/translations-overview.types";

describe("TranslationsOverview Component", () => {
  let wrapper: VueWrapper;
  const defaultTranslationsOverviewProps: TranslationsOverviewProps = {
    localizedText: createFakeLocalizedText({ en: "Hello", fr: "Bonjour", de: "Hallo", es: "", it: "", pt: "" }),
  } as const;

  async function mountTranslationsOverviewComponent(options: MountSuspendedOptions<typeof TranslationsOverview> = {}): Promise<VueWrapper> {
    return mountSuspended(TranslationsOverview, {
      props: defaultTranslationsOverviewProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountTranslationsOverviewComponent();
  });

  it("should render TranslationsOverview when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Header", () => {
    it("should display the other translations header when component is rendered.", () => {
      const header = wrapper.find("[data-testid='translations-overview-header']");

      expect(header.text()).toContain("localization.otherTranslations");
    });

    it("should render globe icon in header when component is rendered.", () => {
      const header = wrapper.find("[data-testid='translations-overview-header']");
      const icon = header.findComponent({ name: "UIcon" });

      expect(icon.exists()).toBeTruthy();
    });

    it("should render separator between header and content when component is rendered.", () => {
      const separator = wrapper.findComponent({ name: "USeparator" });

      expect(separator.exists()).toBeTruthy();
    });

    it("should not render header when hideHeader is true.", async() => {
      wrapper = await mountTranslationsOverviewComponent({
        props: { ...defaultTranslationsOverviewProps, hideHeader: true },
      });
      const header = wrapper.find("[data-testid='translations-overview-header']");

      expect(header.exists()).toBeFalsy();
    });

    it("should not render separator when hideHeader is true.", async() => {
      wrapper = await mountTranslationsOverviewComponent({
        props: { ...defaultTranslationsOverviewProps, hideHeader: true },
      });
      const separator = wrapper.findComponent({ name: "USeparator" });

      expect(separator.exists()).toBeFalsy();
    });
  });

  describe("Locale Rows", () => {
    const expectedLocales = LOCALES.filter(locale => locale !== DEFAULT_MOCKED_LOCALE);

    it("should render locale rows for all locales except the current one when component is rendered.", () => {
      const rows = wrapper.findAll("[data-testid^='locale-value-']");

      expect(rows).toHaveLength(expectedLocales.length);
    });

    it("should not render a row for the current locale when it is en.", () => {
      const currentLocaleRow = wrapper.find(`[data-testid='locale-value-${DEFAULT_MOCKED_LOCALE}']`);

      expect(currentLocaleRow.exists()).toBeFalsy();
    });

    it.each<string>(expectedLocales)("should render a row for %s when component is rendered.", locale => {
      const row = wrapper.find(`[data-testid='locale-value-${locale}']`);

      expect(row.exists()).toBeTruthy();
    });

    it("should render locale label component for each non-current locale when the rows are rendered.", () => {
      const frRow = wrapper.find("[data-testid='locale-value-fr']");
      const localeLabel = frRow.findComponent(LocaleLabel);

      expect(localeLabel.exists()).toBeTruthy();
    });

    it("should display the locale code in locale label when the fr row is rendered.", () => {
      const frRow = wrapper.find("[data-testid='locale-value-fr']");

      expect(frRow.text()).toContain("localization.locales.shortCode.fr");
    });
  });

  describe("LocalizedText prop", () => {
    it("should display the translated value when the locale has a value.", () => {
      const frRow = wrapper.find("[data-testid='locale-value-fr']");

      expect(frRow.text()).toContain("Bonjour");
    });

    it.each<{ cssClass: string; shouldExist: boolean }>([
      { cssClass: "text-default", shouldExist: true },
      { cssClass: "text-error", shouldExist: false },
      { cssClass: "italic", shouldExist: false },
    ])("should $shouldExist the $cssClass class on the locale value when the locale has a value.", ({ cssClass, shouldExist }) => {
      const valueSpan = wrapper.find(`[data-testid='locale-value-fr'] > span.${cssClass}`);

      expect(valueSpan.exists()).toBe(shouldExist);
    });

    it("should display the missing translation key when the locale has an empty string value.", () => {
      const esRow = wrapper.find("[data-testid='locale-value-es']");

      expect(esRow.text()).toContain("localization.missingTranslation");
    });

    it("should have text-error class when the locale has a missing value.", () => {
      const valueSpan = wrapper.find("[data-testid='locale-value-es'] > span.text-error");

      expect(valueSpan.exists()).toBeTruthy();
    });

    it("should have italic class when the locale has a missing value.", () => {
      const valueSpan = wrapper.find("[data-testid='locale-value-es'] > span.italic");

      expect(valueSpan.exists()).toBeTruthy();
    });
  });

  describe("LocalizedTexts prop", () => {
    beforeEach(async() => {
      wrapper = await mountTranslationsOverviewComponent({
        props: {
          localizedTexts: createFakeLocalizedTexts({ en: ["Hello", "World"], fr: ["Bonjour", "Monde"], de: ["Hallo", "Welt"], es: [], it: undefined, pt: undefined }),
        },
      });
    });

    it("should display comma-separated values when the locale has array values.", () => {
      const frRow = wrapper.find("[data-testid='locale-value-fr']");

      expect(frRow.text()).toContain("Bonjour, Monde");
    });

    it.each<{ locale: string }>([
      { locale: "es" },
      { locale: "it" },
    ])("should display the missing translation key when the locale has an empty array or undefined value for $locale.", ({ locale }) => {
      const row = wrapper.find(`[data-testid='locale-value-${locale}']`);

      expect(row.text()).toContain("localization.missingTranslation");
    });

    it.each<{ locale: string; cssClass: string }>([
      { locale: "fr", cssClass: "text-default" },
      { locale: "es", cssClass: "text-error" },
      { locale: "es", cssClass: "italic" },
      { locale: "it", cssClass: "text-error" },
      { locale: "it", cssClass: "italic" },
    ])("should have $cssClass class when the locale is $locale.", ({ locale, cssClass }) => {
      const valueSpan = wrapper.find(`[data-testid='locale-value-${locale}'] > span.${cssClass}`);

      expect(valueSpan.exists()).toBeTruthy();
    });
  });

  describe("No props provided", () => {
    beforeEach(async() => {
      wrapper = await mountTranslationsOverviewComponent({
        props: {},
      });
    });

    it.each<string>([
      "fr",
      "es",
      "de",
      "it",
      "pt",
    ])("should display the missing translation key for %s when no props are provided.", locale => {
      const row = wrapper.find(`[data-testid='locale-value-${locale}']`);

      expect(row.text()).toContain("localization.missingTranslation");
    });

    it.each<{ locale: string; cssClass: string }>([
      { locale: "fr", cssClass: "text-error" },
      { locale: "fr", cssClass: "italic" },
      { locale: "es", cssClass: "text-error" },
      { locale: "es", cssClass: "italic" },
      { locale: "de", cssClass: "text-error" },
      { locale: "de", cssClass: "italic" },
      { locale: "it", cssClass: "text-error" },
      { locale: "it", cssClass: "italic" },
      { locale: "pt", cssClass: "text-error" },
      { locale: "pt", cssClass: "italic" },
    ])("should have $cssClass class for $locale when no props are provided.", ({ locale, cssClass }) => {
      const valueSpan = wrapper.find(`[data-testid='locale-value-${locale}'] > span.${cssClass}`);

      expect(valueSpan.exists()).toBeTruthy();
    });
  });
});