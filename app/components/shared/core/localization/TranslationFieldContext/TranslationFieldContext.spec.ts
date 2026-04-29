import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import { nextTick } from "vue";

import { createFakeLocalizedText, createFakeLocalizedTexts } from "~~/tests/unit/utils/faketories/shared/locale/locale.faketory";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { TranslationFieldContext, TranslationsOverview } from "#components";

import type { TranslationFieldContextProperties } from "~/components/shared/core/localization/TranslationFieldContext/translation-field-context.types";

describe("TranslationFieldContext Component", () => {
  let wrapper: VueWrapper;
  const defaultProps: TranslationFieldContextProperties = {
    localizedText: createFakeLocalizedText({ en: "Hello", fr: "Bonjour" }),
  };

  async function mountTranslationFieldContextComponent(options: MountSuspendedOptions<typeof TranslationFieldContext> = {}): Promise<VueWrapper> {
    return mountSuspended(TranslationFieldContext, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountTranslationFieldContextComponent();
  });

  describe("Collapsible", () => {
    it("should render collapsible with correct data-testid when rendered.", () => {
      const collapsible = wrapper.find("[data-testid='translation-field-context']");

      expect(collapsible.exists()).toBeTruthy();
    });

    it("should be collapsed when current locale value is filled for localized text.", () => {
      const collapsible = wrapper.find("[data-testid='translation-field-context']");

      expect(collapsible.attributes("data-state")).toBe("closed");
    });

    it("should be expanded when current locale value is empty for localizedText.", async() => {
      wrapper = await mountTranslationFieldContextComponent({
        props: {
          localizedText: createFakeLocalizedText({ en: "" }),
        },
      });
      const collapsible = wrapper.find("[data-testid='translation-field-context']");

      expect(collapsible.attributes("data-state")).toBe("open");
    });

    it("should be expanded when current locale value is empty for localizedTexts.", async() => {
      wrapper = await mountTranslationFieldContextComponent({
        props: {
          localizedTexts: createFakeLocalizedTexts({ en: [] }),
        },
      });
      const collapsible = wrapper.find("[data-testid='translation-field-context']");

      expect(collapsible.attributes("data-state")).toBe("open");
    });

    it("should be expanded when neither localizedText nor localizedTexts is provided.", async() => {
      wrapper = await mountTranslationFieldContextComponent({
        props: {},
      });
      const collapsible = wrapper.find("[data-testid='translation-field-context']");

      expect(collapsible.attributes("data-state")).toBe("open");
    });

    it("should be collapsed when localizedTexts has values for the current locale.", async() => {
      wrapper = await mountTranslationFieldContextComponent({
        props: {
          localizedTexts: createFakeLocalizedTexts({ en: ["alias1", "alias2"] }),
        },
      });
      const collapsible = wrapper.find("[data-testid='translation-field-context']");

      expect(collapsible.attributes("data-state")).toBe("closed");
    });

    it("should be closed when locale has a filled value before changing.", async() => {
      wrapper = await mountTranslationFieldContextComponent({
        props: {
          localizedText: createFakeLocalizedText({ en: "Hello", fr: "" }),
        },
      });
      const collapsible = wrapper.find("[data-testid='translation-field-context']");

      expect(collapsible.attributes("data-state")).toBe("closed");
    });

    it("should auto-expand when locale changes to one that is empty.", async() => {
      wrapper = await mountTranslationFieldContextComponent({
        props: {
          localizedText: createFakeLocalizedText({ en: "Hello", fr: "" }),
        },
      });

      const { locale } = useI18n();
      locale.value = "fr";
      await nextTick();
      await nextTick();
      const collapsible = wrapper.find("[data-testid='translation-field-context']");

      expect(collapsible.attributes("data-state")).toBe("open");
    });

    it("should be open when locale has an empty value before changing.", async() => {
      wrapper = await mountTranslationFieldContextComponent({
        props: {
          localizedText: createFakeLocalizedText({ en: "", fr: "Bonjour" }),
        },
      });
      const collapsible = wrapper.find("[data-testid='translation-field-context']");

      expect(collapsible.attributes("data-state")).toBe("open");
    });

    it("should auto-collapse when locale changes to one that is filled.", async() => {
      wrapper = await mountTranslationFieldContextComponent({
        props: {
          localizedText: createFakeLocalizedText({ en: "", fr: "Bonjour" }),
        },
      });

      const { locale } = useI18n();
      locale.value = "fr";
      await nextTick();
      await nextTick();
      const collapsible = wrapper.find("[data-testid='translation-field-context']");

      expect(collapsible.attributes("data-state")).toBe("closed");
    });
  });

  describe("Button", () => {
    it("should show button with other translations label when rendered.", () => {
      const button = wrapper.find("[data-testid='translation-field-context'] button");

      expect(button.text()).toContain("localization.otherTranslations");
    });

    it("should toggle collapsible open state when button is clicked.", async() => {
      const button = wrapper.find("[data-testid='translation-field-context'] button");
      await button.trigger("click");
      await nextTick();
      const collapsible = wrapper.find("[data-testid='translation-field-context']");

      expect(collapsible.attributes("data-state")).toBe("open");
    });
  });

  describe("Translations Overview", () => {
    it("should render translations overview component when collapsible is expanded.", async() => {
      wrapper = await mountTranslationFieldContextComponent({
        props: {
          localizedText: createFakeLocalizedText({ en: "" }),
        },
      });
      const translationsOverview = wrapper.findComponent(TranslationsOverview);

      expect(translationsOverview.exists()).toBeTruthy();
    });

    it("should pass localized text prop to translations overview when rendered.", async() => {
      const localizedText = createFakeLocalizedText({ en: "" });
      wrapper = await mountTranslationFieldContextComponent({
        props: {
          localizedText,
        },
      });
      const translationsOverview = wrapper.findComponent(TranslationsOverview);

      expect(translationsOverview.props("localizedText")).toStrictEqual(localizedText);
    });

    it("should pass localized texts prop to translations overview when rendered.", async() => {
      const localizedTexts = createFakeLocalizedTexts({ en: [] });
      wrapper = await mountTranslationFieldContextComponent({
        props: {
          localizedTexts,
        },
      });
      const translationsOverview = wrapper.findComponent(TranslationsOverview);

      expect(translationsOverview.props("localizedTexts")).toStrictEqual(localizedTexts);
    });
  });
});