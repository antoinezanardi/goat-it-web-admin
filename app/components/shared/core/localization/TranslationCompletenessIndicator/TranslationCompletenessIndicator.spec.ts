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
  const threeCompleteField = createFakeLocalizedText({ en: "Hello", fr: "Bonjour", de: "Hallo", es: "", it: "", pt: "" });
  const twoCompleteField = createFakeLocalizedText({ en: "Hello", fr: "Bonjour", de: "", es: "", it: "", pt: "" });
  const oneCompleteField = createFakeLocalizedText({ en: "Hello", fr: "", de: "", es: "", it: "", pt: "" });
  const noneCompleteField = createFakeLocalizedText({ en: "", fr: "", de: "", es: "", it: "", pt: "" });
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

    it.each<{ attribute: string; expected: string }>([
      { attribute: "width", expected: `width: ${TRANSLATION_COMPLETENESS_RING_SIZE}px` },
      { attribute: "height", expected: `height: ${TRANSLATION_COMPLETENESS_RING_SIZE}px` },
    ])("should render the ring container with correct $attribute style when component is rendered.", ({ expected }) => {
      const ring = wrapper.find("[data-testid='translation-completeness-ring']");

      expect(ring.attributes("style")).toContain(expected);
    });
  });

  describe("SVG", () => {
    it.each<{ attribute: string; expected: string }>([
      { attribute: "viewBox", expected: `0 0 ${TRANSLATION_COMPLETENESS_RING_SIZE} ${TRANSLATION_COMPLETENESS_RING_SIZE}` },
      { attribute: "width", expected: `${TRANSLATION_COMPLETENESS_RING_SIZE}` },
      { attribute: "height", expected: `${TRANSLATION_COMPLETENESS_RING_SIZE}` },
    ])("should render svg with correct $attribute when component is rendered.", ({ attribute, expected }) => {
      const svg = wrapper.find("svg");

      expect(svg.attributes(attribute)).toBe(expected);
    });
  });

  describe("Ring Color", () => {
    it.each<{ description: string; field: ReturnType<typeof createFakeLocalizedText>; expected: string }>([
      { description: "all 6 locales are complete", field: fullyTranslatedField, expected: "var(--ui-color-success-500)" },
      { description: "3 locales are complete", field: threeCompleteField, expected: "var(--ui-color-warning-500)" },
      { description: "2 locales are complete", field: twoCompleteField, expected: "var(--ui-color-warning-500)" },
      { description: "1 locale is complete", field: oneCompleteField, expected: "var(--ui-color-error-500)" },
      { description: "0 locales are complete", field: noneCompleteField, expected: "var(--ui-color-error-500)" },
    ])("should have $expected stroke color when $description.", async({ field, expected }) => {
      wrapper = await mountTranslationCompletenessIndicatorComponent({
        props: { requiredFields: [field] },
      });
      const progressCircle = wrapper.find("circle[stroke-linecap='round']");

      expect(progressCircle.attributes("stroke")).toBe(expected);
    });
  });

  describe("Stroke Dash Offset", () => {
    it.each<{ description: string; field: ReturnType<typeof createFakeLocalizedText>; expected: string }>([
      { description: "all locales are complete", field: fullyTranslatedField, expected: "0" },
      {
        description: "no locales are complete",
        field: noneCompleteField,
        expected: `${TRANSLATION_COMPLETENESS_RING_CIRCUMFERENCE}`,
      },
      {
        description: "3 of 6 locales are complete",
        field: threeCompleteField,
        expected: `${TRANSLATION_COMPLETENESS_RING_CIRCUMFERENCE * (1 - 3 / 6)}`,
      },
    ])("should have correct stroke-dashoffset when $description.", async({ field, expected }) => {
      wrapper = await mountTranslationCompletenessIndicatorComponent({
        props: { requiredFields: [field] },
      });
      const progressCircle = wrapper.find("circle[stroke-linecap='round']");

      expect(progressCircle.attributes("stroke-dashoffset")).toBe(expected);
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