import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { createFakeLocalizedText, createFakeLocalizedTexts } from "~~/tests/unit/utils/faketories/shared/locale/locale.faketory";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { TranslationFieldContext, TranslationsOverview } from "#components";

import type { TranslationFieldContextProps } from "~/components/shared/core/localization/TranslationFieldContext/translation-field-context.types";

describe("TranslationFieldContext Component", () => {
  let wrapper: VueWrapper;
  const defaultProps: TranslationFieldContextProps = {
    localizedText: createFakeLocalizedText({ en: "Hello", fr: "Bonjour" }),
    label: "Label",
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

    it("should be collapsed when localizedTexts has values for the current locale.", async() => {
      wrapper = await mountTranslationFieldContextComponent({
        props: {
          localizedTexts: createFakeLocalizedTexts({ en: ["alias1", "alias2"] }),
          label: "Label",
        },
      });
      const collapsible = wrapper.find("[data-testid='translation-field-context']");

      expect(collapsible.attributes("data-state")).toBe("closed");
    });

    it("should be closed when component is rendered.", async() => {
      wrapper = await mountTranslationFieldContextComponent({
        props: {
          localizedText: createFakeLocalizedText({ en: "Hello", fr: "" }),
          label: "Label",
        },
      });
      const collapsible = wrapper.find("[data-testid='translation-field-context']");

      expect(collapsible.attributes("data-state")).toBe("closed");
    });
  });

  describe("Button", () => {
    it("should show button with see translations label when rendered.", () => {
      const button = wrapper.find("[data-testid='translation-field-context'] button");

      expect(button.text()).toContain("localization.seeTranslationsFor");
    });

    it("should toggle collapsible open state when button is clicked.", async() => {
      const button = wrapper.find("[data-testid='translation-field-context'] button");
      await button.trigger("click");
      const collapsible = wrapper.find("[data-testid='translation-field-context']");

      expect(collapsible.attributes("data-state")).toBe("open");
    });
  });

  describe("Translations Overview", () => {
    async function openCollapsible(): Promise<void> {
      const button = wrapper.find("[data-testid='translation-field-context'] button");
      await button.trigger("click");
    }

    it("should render translations overview component when collapsible is expanded.", async() => {
      await openCollapsible();
      const translationsOverview = wrapper.findComponent(TranslationsOverview);

      expect(translationsOverview.exists()).toBeTruthy();
    });

    it("should pass localized text prop to translations overview when rendered.", async() => {
      const localizedText = createFakeLocalizedText({ en: "" });
      wrapper = await mountTranslationFieldContextComponent({
        props: {
          localizedText,
          label: "Label",
        },
      });
      await openCollapsible();
      const translationsOverview = wrapper.findComponent(TranslationsOverview);

      expect(translationsOverview.props("localizedText")).toStrictEqual(localizedText);
    });

    it("should pass localized texts prop to translations overview when rendered.", async() => {
      const localizedTexts = createFakeLocalizedTexts({ en: [] });
      wrapper = await mountTranslationFieldContextComponent({
        props: {
          localizedTexts,
          label: "Label",
        },
      });
      await openCollapsible();
      const translationsOverview = wrapper.findComponent(TranslationsOverview);

      expect(translationsOverview.props("localizedTexts")).toStrictEqual(localizedTexts);
    });

    it("should pass hide header prop to translations overview when rendered.", async() => {
      await openCollapsible();
      const translationsOverview = wrapper.findComponent(TranslationsOverview);

      expect(translationsOverview.props("hideHeader")).toBeTruthy();
    });
  });
});