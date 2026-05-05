import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";
import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { UButton, USelectMenu, USwitch } from "#components";
import { QuestionThemeSelector } from "#components";

import type { QuestionThemeSelectorProperties } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionThemeSelector/question-theme-selector.types";

describe("QuestionThemeSelector Component", () => {
  let wrapper: VueWrapper;
  const fakeThemes = [
    createFakeQuestionTheme({ id: "theme-1", label: { en: "Geography", fr: "Géographie", es: undefined, de: undefined, it: undefined, pt: undefined } }),
    createFakeQuestionTheme({ id: "theme-2", label: { en: "History", fr: "Histoire", es: undefined, de: undefined, it: undefined, pt: undefined } }),
    createFakeQuestionTheme({ id: "theme-3", label: { en: "Science", fr: "Science", es: undefined, de: undefined, it: undefined, pt: undefined } }),
  ];

  const defaultProperties: QuestionThemeSelectorProperties = {
    modelValue: [],
    availableThemes: fakeThemes,
  };

  async function mountQuestionThemeSelectorComponent(options: MountSuspendedOptions<typeof QuestionThemeSelector> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemeSelector, {
      props: defaultProperties,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionThemeSelectorComponent();
  });

  it("should render the question theme selector component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Select Menu", () => {
    it("should pass all available themes as items to the select menu when no themes are selected.", () => {
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });
      const items = selectMenu.props("items") as { label: string; value: string }[];

      expect(items).toHaveLength(3);
    });

    it("should pass only unselected themes as items to the select menu when some themes are already selected.", async() => {
      wrapper = await mountQuestionThemeSelectorComponent({
        props: {
          ...defaultProperties,
          modelValue: [{ themeId: "theme-1", isPrimary: true, isHint: false }],
        },
      });

      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });
      const items = selectMenu.props("items") as { label: string; value: string }[];

      expect(items).toHaveLength(2);
    });

    it("should pass the themes placeholder to the select menu.", () => {
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

      expect(selectMenu.props("placeholder")).toBe("questions.fields.themes");
    });

    it("should disable the select menu when maximum themes are reached.", async() => {
      wrapper = await mountQuestionThemeSelectorComponent({
        props: {
          ...defaultProperties,
          availableThemes: [
            ...fakeThemes,
            createFakeQuestionTheme({ id: "theme-4" }),
            createFakeQuestionTheme({ id: "theme-5" }),
          ],
          modelValue: [
            { themeId: "theme-1", isPrimary: true, isHint: false },
            { themeId: "theme-2", isPrimary: false, isHint: false },
            { themeId: "theme-3", isPrimary: false, isHint: false },
            { themeId: "theme-4", isPrimary: false, isHint: false },
            { themeId: "theme-5", isPrimary: false, isHint: false },
          ],
        },
      });

      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

      expect(selectMenu.props("disabled")).toBeTruthy();
    });

    it("should not disable the select menu when maximum themes are not reached.", () => {
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

      expect(selectMenu.props("disabled")).toBeFalsy();
    });

    describe("Adding Themes", () => {
      it("should emit update:modelValue with the first theme as primary when adding the first theme.", () => {
        const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

        getWrapperVm(selectMenu).$emit("update:modelValue", "theme-1");

        expect(wrapper.emitted("update:modelValue")).toStrictEqual([[
          [{ themeId: "theme-1", isPrimary: true, isHint: false }],
        ]]);
      });

      it("should emit update:modelValue with the new theme as non-primary when adding a second theme.", async() => {
        wrapper = await mountQuestionThemeSelectorComponent({
          props: {
            ...defaultProperties,
            modelValue: [{ themeId: "theme-1", isPrimary: true, isHint: false }],
          },
        });

        const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

        getWrapperVm(selectMenu).$emit("update:modelValue", "theme-2");

        expect(wrapper.emitted("update:modelValue")).toStrictEqual([[
          [
            { themeId: "theme-1", isPrimary: true, isHint: false },
            { themeId: "theme-2", isPrimary: false, isHint: false },
          ],
        ]]);
      });
    });
  });

  describe("Theme List", () => {
    it("should not render the theme list when no themes are selected.", () => {
      const list = wrapper.find("[data-testid='question-theme-selector-list']");

      expect(list.exists()).toBeFalsy();
    });

    it("should render the theme list when themes are selected.", async() => {
      wrapper = await mountQuestionThemeSelectorComponent({
        props: {
          ...defaultProperties,
          modelValue: [{ themeId: "theme-1", isPrimary: true, isHint: false }],
        },
      });

      const list = wrapper.find("[data-testid='question-theme-selector-list']");

      expect(list.exists()).toBeTruthy();
    });

    it("should render a theme item for each selected theme.", async() => {
      wrapper = await mountQuestionThemeSelectorComponent({
        props: {
          ...defaultProperties,
          modelValue: [
            { themeId: "theme-1", isPrimary: true, isHint: false },
            { themeId: "theme-2", isPrimary: false, isHint: false },
          ],
        },
      });

      const item1 = wrapper.find("[data-testid='question-theme-selector-item-theme-1']");
      const item2 = wrapper.find("[data-testid='question-theme-selector-item-theme-2']");

      expect(item1.exists()).toBeTruthy();
      expect(item2.exists()).toBeTruthy();
    });

    describe("Primary Button", () => {
      it("should use warning color and solid variant for the primary theme.", async() => {
        wrapper = await mountQuestionThemeSelectorComponent({
          props: {
            ...defaultProperties,
            modelValue: [{ themeId: "theme-1", isPrimary: true, isHint: false }],
          },
        });

        const primaryButton = wrapper.getComponent<typeof UButton>("[data-testid='question-theme-selector-primary-theme-1']");

        expect(primaryButton.props("color")).toBe("warning");
        expect(primaryButton.props("variant")).toBe("solid");
      });

      it("should use neutral color and ghost variant for a non-primary theme.", async() => {
        wrapper = await mountQuestionThemeSelectorComponent({
          props: {
            ...defaultProperties,
            modelValue: [
              { themeId: "theme-1", isPrimary: true, isHint: false },
              { themeId: "theme-2", isPrimary: false, isHint: false },
            ],
          },
        });

        const primaryButton = wrapper.getComponent<typeof UButton>("[data-testid='question-theme-selector-primary-theme-2']");

        expect(primaryButton.props("color")).toBe("neutral");
        expect(primaryButton.props("variant")).toBe("ghost");
      });

      it("should disable the primary button for the already-primary theme.", async() => {
        wrapper = await mountQuestionThemeSelectorComponent({
          props: {
            ...defaultProperties,
            modelValue: [{ themeId: "theme-1", isPrimary: true, isHint: false }],
          },
        });

        const primaryButton = wrapper.getComponent<typeof UButton>("[data-testid='question-theme-selector-primary-theme-1']");

        expect(primaryButton.props("disabled")).toBeTruthy();
      });

      it("should not disable the primary button for a non-primary theme.", async() => {
        wrapper = await mountQuestionThemeSelectorComponent({
          props: {
            ...defaultProperties,
            modelValue: [
              { themeId: "theme-1", isPrimary: true, isHint: false },
              { themeId: "theme-2", isPrimary: false, isHint: false },
            ],
          },
        });

        const primaryButton = wrapper.getComponent<typeof UButton>("[data-testid='question-theme-selector-primary-theme-2']");

        expect(primaryButton.props("disabled")).toBeFalsy();
      });

      it("should emit update:modelValue with new primary when clicking star on a non-primary theme.", async() => {
        wrapper = await mountQuestionThemeSelectorComponent({
          props: {
            ...defaultProperties,
            modelValue: [
              { themeId: "theme-1", isPrimary: true, isHint: false },
              { themeId: "theme-2", isPrimary: false, isHint: false },
            ],
          },
        });

        const primaryButton = wrapper.getComponent<typeof UButton>("[data-testid='question-theme-selector-primary-theme-2']");
        await primaryButton.trigger("click");

        expect(wrapper.emitted("update:modelValue")).toStrictEqual([[
          [
            { themeId: "theme-1", isPrimary: false, isHint: false },
            { themeId: "theme-2", isPrimary: true, isHint: false },
          ],
        ]]);
      });
    });

    describe("Hint Switch", () => {
      it("should pass false as model value to the hint switch when theme is not a hint.", async() => {
        wrapper = await mountQuestionThemeSelectorComponent({
          props: {
            ...defaultProperties,
            modelValue: [{ themeId: "theme-1", isPrimary: true, isHint: false }],
          },
        });

        const hintSwitch = wrapper.findComponent<typeof USwitch>("[data-testid='question-theme-selector-hint-theme-1']");

        expect(hintSwitch.props("modelValue")).toBeFalsy();
      });

      it("should pass true as model value to the hint switch when theme is a hint.", async() => {
        wrapper = await mountQuestionThemeSelectorComponent({
          props: {
            ...defaultProperties,
            modelValue: [{ themeId: "theme-1", isPrimary: true, isHint: true }],
          },
        });

        const hintSwitch = wrapper.findComponent<typeof USwitch>("[data-testid='question-theme-selector-hint-theme-1']");

        expect(hintSwitch.props("modelValue")).toBeTruthy();
      });

      it("should emit update:modelValue with toggled hint when hint switch is toggled.", async() => {
        wrapper = await mountQuestionThemeSelectorComponent({
          props: {
            ...defaultProperties,
            modelValue: [{ themeId: "theme-1", isPrimary: true, isHint: false }],
          },
        });

        const hintSwitch = wrapper.findComponent<typeof USwitch>("[data-testid='question-theme-selector-hint-theme-1']");
        getWrapperVm(hintSwitch).$emit("update:modelValue", true);

        expect(wrapper.emitted("update:modelValue")).toStrictEqual([[
          [{ themeId: "theme-1", isPrimary: true, isHint: true }],
        ]]);
      });
    });

    describe("Remove Button", () => {
      it("should emit update:modelValue without the removed theme when remove button is clicked.", async() => {
        wrapper = await mountQuestionThemeSelectorComponent({
          props: {
            ...defaultProperties,
            modelValue: [
              { themeId: "theme-1", isPrimary: true, isHint: false },
              { themeId: "theme-2", isPrimary: false, isHint: false },
            ],
          },
        });

        const removeButton = wrapper.getComponent<typeof UButton>("[data-testid='question-theme-selector-remove-theme-2']");
        await removeButton.trigger("click");

        expect(wrapper.emitted("update:modelValue")).toStrictEqual([[
          [{ themeId: "theme-1", isPrimary: true, isHint: false }],
        ]]);
      });

      it("should promote the first remaining theme to primary when removing the primary theme.", async() => {
        wrapper = await mountQuestionThemeSelectorComponent({
          props: {
            ...defaultProperties,
            modelValue: [
              { themeId: "theme-1", isPrimary: true, isHint: false },
              { themeId: "theme-2", isPrimary: false, isHint: false },
            ],
          },
        });

        const removeButton = wrapper.getComponent<typeof UButton>("[data-testid='question-theme-selector-remove-theme-1']");
        await removeButton.trigger("click");

        expect(wrapper.emitted("update:modelValue")).toStrictEqual([[
          [{ themeId: "theme-2", isPrimary: true, isHint: false }],
        ]]);
      });

      it("should emit update:modelValue with an empty array when removing the last theme.", async() => {
        wrapper = await mountQuestionThemeSelectorComponent({
          props: {
            ...defaultProperties,
            modelValue: [{ themeId: "theme-1", isPrimary: true, isHint: false }],
          },
        });

        const removeButton = wrapper.getComponent<typeof UButton>("[data-testid='question-theme-selector-remove-theme-1']");
        await removeButton.trigger("click");

        expect(wrapper.emitted("update:modelValue")).toStrictEqual([[[]]]);
      });
    });
  });
});