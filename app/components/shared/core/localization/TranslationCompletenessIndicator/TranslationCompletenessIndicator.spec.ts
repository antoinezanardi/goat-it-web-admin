import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { createFakeLocalizedText } from "~~/tests/unit/utils/faketories/shared/locale/locale.faketory";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { TranslationCompletenessIndicator } from "#components";

import type { TranslationCompletenessIndicatorProperties } from "~/components/shared/core/localization/TranslationCompletenessIndicator/translation-completeness-indicator.types";
import {
  TRANSLATION_COMPLETENESS_RING_CIRCUMFERENCE,
  TRANSLATION_COMPLETENESS_RING_SIZE,
} from "~/components/shared/core/localization/TranslationCompletenessIndicator/translation-completeness-indicator.constants";

describe("TranslationCompletenessIndicator Component", () => {
  let wrapper: VueWrapper;
  const fullyTranslatedField = createFakeLocalizedText({ en: "Hello", fr: "Bonjour", de: "Hallo", es: "Hola", it: "Ciao", pt: "Olá" });
  const defaultProps: TranslationCompletenessIndicatorProperties = {
    requiredFields: [fullyTranslatedField],
  };

  async function mountTranslationCompletenessIndicatorComponent(options: MountSuspendedOptions<typeof TranslationCompletenessIndicator> = {}): Promise<VueWrapper> {
    return mountSuspended(TranslationCompletenessIndicator, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountTranslationCompletenessIndicatorComponent();
  });

  describe("Ring Container", () => {
    it("should render the ring container with correct data-testid when component is rendered.", () => {
      const ring = wrapper.find("[data-testid='translation-completeness-ring']");

      expect(ring.exists()).toBeTruthy();
    });

    it("should render the ring container with correct width style when component is rendered.", () => {
      const ring = wrapper.find("[data-testid='translation-completeness-ring']");

      expect(ring.attributes("style")).toContain(`width: ${TRANSLATION_COMPLETENESS_RING_SIZE}px`);
    });

    it("should render the ring container with correct height style when component is rendered.", () => {
      const ring = wrapper.find("[data-testid='translation-completeness-ring']");

      expect(ring.attributes("style")).toContain(`height: ${TRANSLATION_COMPLETENESS_RING_SIZE}px`);
    });
  });

  describe("SVG", () => {
    it("should render svg with proper viewBox when component is rendered.", () => {
      const svg = wrapper.find("svg");

      expect(svg.attributes("viewBox")).toBe(`0 0 ${TRANSLATION_COMPLETENESS_RING_SIZE} ${TRANSLATION_COMPLETENESS_RING_SIZE}`);
    });

    it("should render svg with correct width when component is rendered.", () => {
      const svg = wrapper.find("svg");

      expect(svg.attributes("width")).toBe(`${TRANSLATION_COMPLETENESS_RING_SIZE}`);
    });

    it("should render svg with correct height when component is rendered.", () => {
      const svg = wrapper.find("svg");

      expect(svg.attributes("height")).toBe(`${TRANSLATION_COMPLETENESS_RING_SIZE}`);
    });
  });

  describe("Globe Icon", () => {
    it("should render the globe icon when component is rendered.", () => {
      const icon = wrapper.find(".iconify");

      expect(icon.classes()).toContain("i-lucide:globe");
    });
  });

  describe("Ring Color", () => {
    it("should have success stroke color when all 6 locales are complete.", () => {
      const progressCircle = wrapper.find("circle[stroke-linecap='round']");

      expect(progressCircle.attributes("stroke")).toBe("var(--ui-color-success-500)");
    });

    it("should have warning stroke color when 3 locales are complete.", async() => {
      const partialField = createFakeLocalizedText({ en: "Hello", fr: "Bonjour", de: "Hallo", es: "", it: "", pt: "" });
      wrapper = await mountTranslationCompletenessIndicatorComponent({
        props: { requiredFields: [partialField] },
      });
      const progressCircle = wrapper.find("circle[stroke-linecap='round']");

      expect(progressCircle.attributes("stroke")).toBe("var(--ui-color-warning-500)");
    });

    it("should have warning stroke color when 2 locales are complete.", async() => {
      const twoCompleteField = createFakeLocalizedText({ en: "Hello", fr: "Bonjour", de: "", es: "", it: "", pt: "" });
      wrapper = await mountTranslationCompletenessIndicatorComponent({
        props: { requiredFields: [twoCompleteField] },
      });
      const progressCircle = wrapper.find("circle[stroke-linecap='round']");

      expect(progressCircle.attributes("stroke")).toBe("var(--ui-color-warning-500)");
    });

    it("should have error stroke color when 1 locale is complete.", async() => {
      const oneCompleteField = createFakeLocalizedText({ en: "Hello", fr: "", de: "", es: "", it: "", pt: "" });
      wrapper = await mountTranslationCompletenessIndicatorComponent({
        props: { requiredFields: [oneCompleteField] },
      });
      const progressCircle = wrapper.find("circle[stroke-linecap='round']");

      expect(progressCircle.attributes("stroke")).toBe("var(--ui-color-error-500)");
    });

    it("should have error stroke color when 0 locales are complete.", async() => {
      const emptyField = createFakeLocalizedText({ en: "", fr: "", de: "", es: "", it: "", pt: "" });
      wrapper = await mountTranslationCompletenessIndicatorComponent({
        props: { requiredFields: [emptyField] },
      });
      const progressCircle = wrapper.find("circle[stroke-linecap='round']");

      expect(progressCircle.attributes("stroke")).toBe("var(--ui-color-error-500)");
    });
  });

  describe("Stroke Dash Offset", () => {
    it("should have stroke-dashoffset of 0 when all locales are complete.", () => {
      const progressCircle = wrapper.find("circle[stroke-linecap='round']");

      expect(progressCircle.attributes("stroke-dashoffset")).toBe("0");
    });

    it("should have stroke-dashoffset equal to circumference when no locales are complete.", async() => {
      const emptyField = createFakeLocalizedText({ en: "", fr: "", de: "", es: "", it: "", pt: "" });
      wrapper = await mountTranslationCompletenessIndicatorComponent({
        props: { requiredFields: [emptyField] },
      });
      const progressCircle = wrapper.find("circle[stroke-linecap='round']");

      expect(progressCircle.attributes("stroke-dashoffset")).toBe(`${TRANSLATION_COMPLETENESS_RING_CIRCUMFERENCE}`);
    });

    it("should have stroke-dashoffset reflecting half completion when 3 of 6 locales are complete.", async() => {
      const partialField = createFakeLocalizedText({ en: "Hello", fr: "Bonjour", de: "Hallo", es: "", it: "", pt: "" });
      wrapper = await mountTranslationCompletenessIndicatorComponent({
        props: { requiredFields: [partialField] },
      });
      const progressCircle = wrapper.find("circle[stroke-linecap='round']");
      const expectedOffset = TRANSLATION_COMPLETENESS_RING_CIRCUMFERENCE * (1 - 3 / 6);

      expect(progressCircle.attributes("stroke-dashoffset")).toBe(`${expectedOffset}`);
    });
  });

  describe("Popover Content", () => {
    beforeEach(async() => {
      wrapper = await mountTranslationCompletenessIndicatorComponent({
        global: {
          stubs: {
            UPopover: {
              template: "<div><slot /><slot name=\"content\" /></div>",
            },
          },
        },
      });
    });

    it("should render translation completeness popover content component when popover is open.", () => {
      const popoverContent = wrapper.findComponent({ name: "TranslationCompletenessPopoverContent" });

      expect(popoverContent.exists()).toBeTruthy();
    });

    it("should pass required fields to popover content component when popover is open.", () => {
      const popoverContent = wrapper.findComponent({ name: "TranslationCompletenessPopoverContent" });

      expect(popoverContent.props("requiredFields")).toStrictEqual(defaultProps.requiredFields);
    });
  });
});