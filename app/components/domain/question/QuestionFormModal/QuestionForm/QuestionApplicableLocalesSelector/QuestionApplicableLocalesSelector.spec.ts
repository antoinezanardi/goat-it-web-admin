import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { flushPromises } from "@vue/test-utils";
import { nextTick } from "vue";
import { beforeEach, describe, expect, it } from "vitest";
import type { Locale } from "@goat-it/schemas/shared/locale";

import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { UFormField, USelectMenu } from "#components";
import { QuestionApplicableLocalesSelector } from "#components";

import type { QuestionApplicableLocalesSelectorProps } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionApplicableLocalesSelector/question-applicable-locales-selector.types";

describe("QuestionApplicableLocalesSelector Component", () => {
  let wrapper: VueWrapper;
  const defaultQuestionApplicableLocalesSelectorProps: QuestionApplicableLocalesSelectorProps = {
    modelValue: undefined,
  } as const;

  async function mountQuestionApplicableLocalesSelectorComponent(options: MountSuspendedOptions<typeof QuestionApplicableLocalesSelector> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionApplicableLocalesSelector, {
      props: defaultQuestionApplicableLocalesSelectorProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionApplicableLocalesSelectorComponent();
  });

  it("should render the question applicable locales selector component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Form Field", () => {
    it("should render the form field with the correct label when mounted.", () => {
      const formField = wrapper.findComponent<typeof UFormField>("[data-testid='question-applicable-locales-selector']");

      expect(formField.props("label")).toBe("questions.fields.applicableLocales");
    });

    it("should render the form field with the correct name when mounted.", () => {
      const formField = wrapper.findComponent<typeof UFormField>("[data-testid='question-applicable-locales-selector']");

      expect(formField.props("name")).toBe("applicableLocales");
    });

    it("should not render the form field as required when mounted.", () => {
      const formField = wrapper.findComponent<typeof UFormField>("[data-testid='question-applicable-locales-selector']");

      expect(formField.props("required")).toBeFalsy();
    });
  });

  describe("Select Menu", () => {
    it("should pass the globe icon to the select menu when mounted.", () => {
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

      expect(selectMenu.props("icon")).toBe("i-lucide-globe");
    });

    it("should pass the applicable locales placeholder to the select menu when mounted.", () => {
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

      expect(selectMenu.props("placeholder")).toBe("questions.placeholders.applicableLocales");
    });

    it("should enable multiple selection on the select menu when mounted.", () => {
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

      expect(selectMenu.props("multiple")).toBeTruthy();
    });

    it("should pass valueKey as value to the select menu when mounted.", () => {
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

      expect(selectMenu.props("valueKey")).toBe("value");
    });

    it("should pass undefined as model value to the select menu when no locales are selected.", () => {
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

      expect(selectMenu.props("modelValue")).toBeUndefined();
    });

    it("should pass the selected locales as model value to the select menu when locales are selected.", async() => {
      wrapper = await mountQuestionApplicableLocalesSelectorComponent({ props: { modelValue: ["en", "fr"] } });

      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

      expect(selectMenu.props("modelValue")).toStrictEqual(["en", "fr"]);
    });

    it("should disable the select menu when the disabled prop is true.", async() => {
      wrapper = await mountQuestionApplicableLocalesSelectorComponent({ props: { disabled: true, modelValue: undefined } });

      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

      expect(selectMenu.props("disabled")).toBeTruthy();
    });

    it("should not disable the select menu when the disabled prop is false.", () => {
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

      expect(selectMenu.props("disabled")).toBeFalsy();
    });

    it.each<{ icon: string; label: string; locale: Locale }>([
      { locale: "en", label: "localization.locales.shortCode.en", icon: "i-circle-flags-gb" },
      { locale: "fr", label: "localization.locales.shortCode.fr", icon: "i-circle-flags-fr" },
      { locale: "es", label: "localization.locales.shortCode.es", icon: "i-circle-flags-es" },
      { locale: "de", label: "localization.locales.shortCode.de", icon: "i-circle-flags-de" },
      { locale: "it", label: "localization.locales.shortCode.it", icon: "i-circle-flags-it" },
      { locale: "pt", label: "localization.locales.shortCode.pt", icon: "i-circle-flags-pt" },
    ])("should pass $locale with correct label key and flag icon when items are rendered.", ({ locale, label, icon }) => {
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });
      const items = selectMenu.props("items") as { icon: string; label: string; value: Locale }[];

      expect(items.find(item => item.value === locale)).toStrictEqual({ icon, label, value: locale });
    });

    describe("Item Slot", () => {
      async function openSelectMenu(): Promise<VueWrapper> {
        const mountedWrapper = await mountQuestionApplicableLocalesSelectorComponent({ attachTo: document.body });
        const selectMenu = mountedWrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });
        const trigger = selectMenu.find("button");

        await trigger.trigger("click");
        await flushPromises();
        await nextTick();
        await nextTick();

        return mountedWrapper;
      }

      it.each<{ locale: Locale }>([
        { locale: "en" },
        { locale: "fr" },
        { locale: "es" },
        { locale: "de" },
        { locale: "it" },
        { locale: "pt" },
      ])("should render the $locale label in the item slot when the select menu is open.", async({ locale }) => {
        wrapper = await openSelectMenu();

        expect(document.body.innerHTML).toContain(`localization.locales.shortCode.${locale}`);
      });
    });

    describe("Emits", () => {
      it("should emit update:modelValue with the new array when the select menu value changes.", () => {
        const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

        getWrapperVm(selectMenu).$emit("update:modelValue", ["en"]);

        expect(wrapper.emitted("update:modelValue")).toStrictEqual([[["en"]]]);
      });

      it("should emit update:modelValue with an empty array when the select menu value is cleared.", () => {
        const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

        getWrapperVm(selectMenu).$emit("update:modelValue", []);

        expect(wrapper.emitted("update:modelValue")).toStrictEqual([[[]]]);
      });
    });
  });
});