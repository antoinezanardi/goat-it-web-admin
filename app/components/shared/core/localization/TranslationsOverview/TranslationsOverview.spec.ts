import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { createFakeLocalizedText, createFakeLocalizedTexts } from "~~/tests/unit/utils/faketories/shared/locale/locale.faketory";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { LocaleLabel, TranslationsOverview } from "#components";

import type { TranslationsOverviewProperties } from "~/components/shared/core/localization/TranslationsOverview/translations-overview.types";

describe("TranslationsOverview Component", () => {
  let wrapper: VueWrapper;
  const defaultProps: TranslationsOverviewProperties = {
    localizedText: createFakeLocalizedText({ en: "Hello", fr: "Bonjour", de: "Hallo", es: "", it: "", pt: "" }),
  };

  async function mountTranslationsOverviewComponent(options: MountSuspendedOptions<typeof TranslationsOverview> = {}): Promise<VueWrapper> {
    return mountSuspended(TranslationsOverview, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountTranslationsOverviewComponent();
  });

  describe("Header", () => {
    it("should display the other translations header when component is rendered.", () => {
      const header = wrapper.find(".text-sm.font-semibold.text-muted");

      expect(header.text()).toContain("localization.otherTranslations");
    });

    it("should render globe icon in header when component is rendered.", () => {
      const header = wrapper.find(".text-sm.font-semibold.text-muted");
      const icon = header.findComponent({ name: "UIcon" });

      expect(icon.exists()).toBeTruthy();
    });

    it("should render separator between header and content when component is rendered.", () => {
      const separator = wrapper.findComponent({ name: "USeparator" });

      expect(separator.exists()).toBeTruthy();
    });

    it("should not render header when hideHeader is true.", async() => {
      wrapper = await mountTranslationsOverviewComponent({
        props: { ...defaultProps, hideHeader: true },
      });
      const header = wrapper.find(".text-sm.font-semibold.text-muted.mb-2");

      expect(header.exists()).toBeFalsy();
    });

    it("should not render separator when hideHeader is true.", async() => {
      wrapper = await mountTranslationsOverviewComponent({
        props: { ...defaultProps, hideHeader: true },
      });
      const separator = wrapper.findComponent({ name: "USeparator" });

      expect(separator.exists()).toBeFalsy();
    });
  });

  describe("Locale Rows", () => {
    it("should render 5 locale rows when the current locale is en.", () => {
      const rows = wrapper.findAll("[data-testid^='locale-value-']");

      expect(rows).toHaveLength(5);
    });

    it("should not render a row for en when it is the current locale.", () => {
      const enRow = wrapper.find("[data-testid='locale-value-en']");

      expect(enRow.exists()).toBeFalsy();
    });

    it("should render a row for fr when component is rendered.", () => {
      const row = wrapper.find("[data-testid='locale-value-fr']");

      expect(row.exists()).toBeTruthy();
    });

    it("should render a row for es when component is rendered.", () => {
      const row = wrapper.find("[data-testid='locale-value-es']");

      expect(row.exists()).toBeTruthy();
    });

    it("should render a row for de when component is rendered.", () => {
      const row = wrapper.find("[data-testid='locale-value-de']");

      expect(row.exists()).toBeTruthy();
    });

    it("should render a row for it when component is rendered.", () => {
      const row = wrapper.find("[data-testid='locale-value-it']");

      expect(row.exists()).toBeTruthy();
    });

    it("should render a row for pt when component is rendered.", () => {
      const row = wrapper.find("[data-testid='locale-value-pt']");

      expect(row.exists()).toBeTruthy();
    });

    it("should render locale label component for fr when the fr row is rendered.", () => {
      const frRow = wrapper.find("[data-testid='locale-value-fr']");
      const localeLabel = frRow.findComponent(LocaleLabel);

      expect(localeLabel.exists()).toBeTruthy();
    });

    it("should display the locale code in locale label when the fr row is rendered.", () => {
      const frRow = wrapper.find("[data-testid='locale-value-fr']");

      expect(frRow.text()).toContain("localization.locales.fr");
    });
  });

  describe("LocalizedText prop", () => {
    it("should display the translated value when the locale has a value.", () => {
      const frRow = wrapper.find("[data-testid='locale-value-fr']");

      expect(frRow.text()).toContain("Bonjour");
    });

    it("should display the text-default class when the locale has a value.", () => {
      const valueSpan = wrapper.find("[data-testid='locale-value-fr'] > span.text-default");

      expect(valueSpan.exists()).toBeTruthy();
    });

    it("should not have text-error class when the locale has a value.", () => {
      const valueSpan = wrapper.find("[data-testid='locale-value-fr'] > span.text-error");

      expect(valueSpan.exists()).toBeFalsy();
    });

    it("should not have italic class when the locale has a value.", () => {
      const valueSpan = wrapper.find("[data-testid='locale-value-fr'] > span.italic");

      expect(valueSpan.exists()).toBeFalsy();
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

    it("should display the text-default class when the locale has array values.", () => {
      const valueSpan = wrapper.find("[data-testid='locale-value-fr'] > span.text-default");

      expect(valueSpan.exists()).toBeTruthy();
    });

    it("should display the missing translation key when the locale has an empty array.", () => {
      const esRow = wrapper.find("[data-testid='locale-value-es']");

      expect(esRow.text()).toContain("localization.missingTranslation");
    });

    it("should have text-error class when the locale has an empty array.", () => {
      const valueSpan = wrapper.find("[data-testid='locale-value-es'] > span.text-error");

      expect(valueSpan.exists()).toBeTruthy();
    });

    it("should have italic class when the locale has an empty array.", () => {
      const valueSpan = wrapper.find("[data-testid='locale-value-es'] > span.italic");

      expect(valueSpan.exists()).toBeTruthy();
    });

    it("should display the missing translation key when the locale has undefined value.", () => {
      const itRow = wrapper.find("[data-testid='locale-value-it']");

      expect(itRow.text()).toContain("localization.missingTranslation");
    });

    it("should have text-error class when the locale has undefined value.", () => {
      const valueSpan = wrapper.find("[data-testid='locale-value-it'] > span.text-error");

      expect(valueSpan.exists()).toBeTruthy();
    });

    it("should have italic class when the locale has undefined value.", () => {
      const valueSpan = wrapper.find("[data-testid='locale-value-it'] > span.italic");

      expect(valueSpan.exists()).toBeTruthy();
    });
  });

  describe("No props provided", () => {
    beforeEach(async() => {
      wrapper = await mountTranslationsOverviewComponent({
        props: {},
      });
    });

    it("should display the missing translation key for fr when no props are provided.", () => {
      const row = wrapper.find("[data-testid='locale-value-fr']");

      expect(row.text()).toContain("localization.missingTranslation");
    });

    it("should display the missing translation key for es when no props are provided.", () => {
      const row = wrapper.find("[data-testid='locale-value-es']");

      expect(row.text()).toContain("localization.missingTranslation");
    });

    it("should display the missing translation key for de when no props are provided.", () => {
      const row = wrapper.find("[data-testid='locale-value-de']");

      expect(row.text()).toContain("localization.missingTranslation");
    });

    it("should display the missing translation key for it when no props are provided.", () => {
      const row = wrapper.find("[data-testid='locale-value-it']");

      expect(row.text()).toContain("localization.missingTranslation");
    });

    it("should display the missing translation key for pt when no props are provided.", () => {
      const row = wrapper.find("[data-testid='locale-value-pt']");

      expect(row.text()).toContain("localization.missingTranslation");
    });

    it("should have text-error class for fr when no props are provided.", () => {
      const valueSpan = wrapper.find("[data-testid='locale-value-fr'] > span.text-error");

      expect(valueSpan.exists()).toBeTruthy();
    });

    it("should have italic class for fr when no props are provided.", () => {
      const valueSpan = wrapper.find("[data-testid='locale-value-fr'] > span.italic");

      expect(valueSpan.exists()).toBeTruthy();
    });

    it("should have text-error class for es when no props are provided.", () => {
      const valueSpan = wrapper.find("[data-testid='locale-value-es'] > span.text-error");

      expect(valueSpan.exists()).toBeTruthy();
    });

    it("should have italic class for es when no props are provided.", () => {
      const valueSpan = wrapper.find("[data-testid='locale-value-es'] > span.italic");

      expect(valueSpan.exists()).toBeTruthy();
    });

    it("should have text-error class for de when no props are provided.", () => {
      const valueSpan = wrapper.find("[data-testid='locale-value-de'] > span.text-error");

      expect(valueSpan.exists()).toBeTruthy();
    });

    it("should have italic class for de when no props are provided.", () => {
      const valueSpan = wrapper.find("[data-testid='locale-value-de'] > span.italic");

      expect(valueSpan.exists()).toBeTruthy();
    });

    it("should have text-error class for it when no props are provided.", () => {
      const valueSpan = wrapper.find("[data-testid='locale-value-it'] > span.text-error");

      expect(valueSpan.exists()).toBeTruthy();
    });

    it("should have italic class for it when no props are provided.", () => {
      const valueSpan = wrapper.find("[data-testid='locale-value-it'] > span.italic");

      expect(valueSpan.exists()).toBeTruthy();
    });

    it("should have text-error class for pt when no props are provided.", () => {
      const valueSpan = wrapper.find("[data-testid='locale-value-pt'] > span.text-error");

      expect(valueSpan.exists()).toBeTruthy();
    });

    it("should have italic class for pt when no props are provided.", () => {
      const valueSpan = wrapper.find("[data-testid='locale-value-pt'] > span.italic");

      expect(valueSpan.exists()).toBeTruthy();
    });
  });
});