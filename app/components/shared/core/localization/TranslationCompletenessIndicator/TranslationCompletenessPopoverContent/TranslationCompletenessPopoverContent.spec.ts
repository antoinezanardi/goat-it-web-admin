import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { createFakeLocalizedText } from "~~/tests/unit/utils/faketories/shared/locale/locale.faketory";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { TranslationCompletenessPopoverContent } from "#components";

import type { TranslationCompletenessPopoverContentProperties } from "~/components/shared/core/localization/TranslationCompletenessIndicator/TranslationCompletenessPopoverContent/translation-completeness-popover-content.types";

describe("TranslationCompletenessPopoverContent Component", () => {
  let wrapper: VueWrapper;
  const fullyTranslatedField = createFakeLocalizedText({ en: "Hello", fr: "Bonjour", de: "Hallo", es: "Hola", it: "Ciao", pt: "Olá" });
  const defaultProps: TranslationCompletenessPopoverContentProperties = {
    requiredFields: [fullyTranslatedField],
  };

  async function mountTranslationCompletenessPopoverContentComponent(options: MountSuspendedOptions<typeof TranslationCompletenessPopoverContent> = {}): Promise<VueWrapper> {
    return mountSuspended(TranslationCompletenessPopoverContent, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountTranslationCompletenessPopoverContentComponent();
  });

  describe("Container", () => {
    it("should render the container with correct data-testid when component is rendered.", () => {
      const container = wrapper.find("[data-testid='translation-completeness-popover']");

      expect(container.exists()).toBeTruthy();
    });
  });

  describe("Header", () => {
    it("should display the translation status text when component is rendered.", () => {
      const header = wrapper.find("[data-testid='translation-completeness-popover']");

      expect(header.text()).toContain("localization.translationStatus");
    });

    it("should render a separator when component is rendered.", () => {
      const separator = wrapper.findComponent({ name: "USeparator" });

      expect(separator.exists()).toBeTruthy();
    });
  });

  describe("Locale Badges", () => {
    it("should render a badge for en locale when component is rendered.", () => {
      expect(wrapper.find("[data-testid='locale-status-en']").exists()).toBeTruthy();
    });

    it("should render a badge for fr locale when component is rendered.", () => {
      expect(wrapper.find("[data-testid='locale-status-fr']").exists()).toBeTruthy();
    });

    it("should render a badge for de locale when component is rendered.", () => {
      expect(wrapper.find("[data-testid='locale-status-de']").exists()).toBeTruthy();
    });

    it("should render a badge for es locale when component is rendered.", () => {
      expect(wrapper.find("[data-testid='locale-status-es']").exists()).toBeTruthy();
    });

    it("should render a badge for it locale when component is rendered.", () => {
      expect(wrapper.find("[data-testid='locale-status-it']").exists()).toBeTruthy();
    });

    it("should render a badge for pt locale when component is rendered.", () => {
      expect(wrapper.find("[data-testid='locale-status-pt']").exists()).toBeTruthy();
    });

    it("should display check icon in badge when locale is complete.", () => {
      const badge = wrapper.find("[data-testid='locale-status-en']");
      const icon = badge.find("[data-testid='locale-status-icon']");

      expect(icon.classes()).toContain("i-lucide:check");
    });

    it("should render locale label component in badge when component is rendered.", () => {
      const badge = wrapper.find("[data-testid='locale-status-en']");
      const localeLabel = badge.findComponent({ name: "LocaleLabel" });

      expect(localeLabel.exists()).toBeTruthy();
    });
  });

  describe("Incomplete Locales", () => {
    const partialField = createFakeLocalizedText({ en: "Hello", fr: "", de: "", es: "", it: "", pt: "" });

    beforeEach(async() => {
      wrapper = await mountTranslationCompletenessPopoverContentComponent({
        props: { requiredFields: [partialField] },
      });
    });

    it("should display x icon in badge when locale is incomplete.", () => {
      const badge = wrapper.find("[data-testid='locale-status-fr']");
      const icon = badge.find("[data-testid='locale-status-icon']");

      expect(icon.classes()).toContain("i-lucide:x");
    });

    it("should display check icon in badge when locale is complete with partial fields.", () => {
      const badge = wrapper.find("[data-testid='locale-status-en']");
      const icon = badge.find("[data-testid='locale-status-icon']");

      expect(icon.classes()).toContain("i-lucide:check");
    });
  });
});