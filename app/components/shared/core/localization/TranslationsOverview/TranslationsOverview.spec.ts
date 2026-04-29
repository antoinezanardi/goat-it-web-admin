import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { createFakeLocalizedText, createFakeLocalizedTexts } from "~~/tests/unit/utils/faketories/shared/locale/locale.faketory";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { TranslationsOverview } from "#components";

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
      const header = wrapper.find(".text-xs.font-semibold.text-muted.uppercase.mb-2");

      expect(header.text()).toBe("localization.otherTranslations");
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

    it("should display the locale code in uppercase when the fr row is rendered.", () => {
      const frRow = wrapper.find("[data-testid='locale-value-fr']");
      const localeLabel = frRow.find(".font-semibold.text-muted.uppercase");

      expect(localeLabel.text()).toBe("FR");
    });
  });

  describe("LocalizedText prop", () => {
    it("should display the translated value when the locale has a value.", () => {
      const frRow = wrapper.find("[data-testid='locale-value-fr']");

      expect(frRow.text()).toContain("Bonjour");
    });

    it("should display the text-default class when the locale has a value.", () => {
      const frRow = wrapper.find("[data-testid='locale-value-fr']");
      const valueSpan = frRow.findAll("span").at(1);

      expect(valueSpan?.classes()).toContain("text-default");
    });

    it("should not have text-error class when the locale has a value.", () => {
      const frRow = wrapper.find("[data-testid='locale-value-fr']");
      const valueSpan = frRow.findAll("span").at(1);

      expect(valueSpan?.classes()).not.toContain("text-error");
    });

    it("should not have italic class when the locale has a value.", () => {
      const frRow = wrapper.find("[data-testid='locale-value-fr']");
      const valueSpan = frRow.findAll("span").at(1);

      expect(valueSpan?.classes()).not.toContain("italic");
    });

    it("should display the missing translation key when the locale has an empty string value.", () => {
      const esRow = wrapper.find("[data-testid='locale-value-es']");

      expect(esRow.text()).toContain("localization.missingTranslation");
    });

    it("should have text-error class when the locale has a missing value.", () => {
      const esRow = wrapper.find("[data-testid='locale-value-es']");
      const valueSpan = esRow.findAll("span").at(1);

      expect(valueSpan?.classes()).toContain("text-error");
    });

    it("should have italic class when the locale has a missing value.", () => {
      const esRow = wrapper.find("[data-testid='locale-value-es']");
      const valueSpan = esRow.findAll("span").at(1);

      expect(valueSpan?.classes()).toContain("italic");
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
      const frRow = wrapper.find("[data-testid='locale-value-fr']");
      const valueSpan = frRow.findAll("span").at(1);

      expect(valueSpan?.classes()).toContain("text-default");
    });

    it("should display the missing translation key when the locale has an empty array.", () => {
      const esRow = wrapper.find("[data-testid='locale-value-es']");

      expect(esRow.text()).toContain("localization.missingTranslation");
    });

    it("should have text-error class when the locale has an empty array.", () => {
      const esRow = wrapper.find("[data-testid='locale-value-es']");
      const valueSpan = esRow.findAll("span").at(1);

      expect(valueSpan?.classes()).toContain("text-error");
    });

    it("should have italic class when the locale has an empty array.", () => {
      const esRow = wrapper.find("[data-testid='locale-value-es']");
      const valueSpan = esRow.findAll("span").at(1);

      expect(valueSpan?.classes()).toContain("italic");
    });

    it("should display the missing translation key when the locale has undefined value.", () => {
      const itRow = wrapper.find("[data-testid='locale-value-it']");

      expect(itRow.text()).toContain("localization.missingTranslation");
    });

    it("should have text-error class when the locale has undefined value.", () => {
      const itRow = wrapper.find("[data-testid='locale-value-it']");
      const valueSpan = itRow.findAll("span").at(1);

      expect(valueSpan?.classes()).toContain("text-error");
    });

    it("should have italic class when the locale has undefined value.", () => {
      const itRow = wrapper.find("[data-testid='locale-value-it']");
      const valueSpan = itRow.findAll("span").at(1);

      expect(valueSpan?.classes()).toContain("italic");
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
      const row = wrapper.find("[data-testid='locale-value-fr']");
      const valueSpan = row.findAll("span").at(1);

      expect(valueSpan?.classes()).toContain("text-error");
    });

    it("should have italic class for fr when no props are provided.", () => {
      const row = wrapper.find("[data-testid='locale-value-fr']");
      const valueSpan = row.findAll("span").at(1);

      expect(valueSpan?.classes()).toContain("italic");
    });

    it("should have text-error class for es when no props are provided.", () => {
      const row = wrapper.find("[data-testid='locale-value-es']");
      const valueSpan = row.findAll("span").at(1);

      expect(valueSpan?.classes()).toContain("text-error");
    });

    it("should have italic class for es when no props are provided.", () => {
      const row = wrapper.find("[data-testid='locale-value-es']");
      const valueSpan = row.findAll("span").at(1);

      expect(valueSpan?.classes()).toContain("italic");
    });

    it("should have text-error class for de when no props are provided.", () => {
      const row = wrapper.find("[data-testid='locale-value-de']");
      const valueSpan = row.findAll("span").at(1);

      expect(valueSpan?.classes()).toContain("text-error");
    });

    it("should have italic class for de when no props are provided.", () => {
      const row = wrapper.find("[data-testid='locale-value-de']");
      const valueSpan = row.findAll("span").at(1);

      expect(valueSpan?.classes()).toContain("italic");
    });

    it("should have text-error class for it when no props are provided.", () => {
      const row = wrapper.find("[data-testid='locale-value-it']");
      const valueSpan = row.findAll("span").at(1);

      expect(valueSpan?.classes()).toContain("text-error");
    });

    it("should have italic class for it when no props are provided.", () => {
      const row = wrapper.find("[data-testid='locale-value-it']");
      const valueSpan = row.findAll("span").at(1);

      expect(valueSpan?.classes()).toContain("italic");
    });

    it("should have text-error class for pt when no props are provided.", () => {
      const row = wrapper.find("[data-testid='locale-value-pt']");
      const valueSpan = row.findAll("span").at(1);

      expect(valueSpan?.classes()).toContain("text-error");
    });

    it("should have italic class for pt when no props are provided.", () => {
      const row = wrapper.find("[data-testid='locale-value-pt']");
      const valueSpan = row.findAll("span").at(1);

      expect(valueSpan?.classes()).toContain("italic");
    });
  });
});