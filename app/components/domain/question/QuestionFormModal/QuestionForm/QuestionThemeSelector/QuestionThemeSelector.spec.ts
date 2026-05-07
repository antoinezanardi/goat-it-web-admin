import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { createFakeQuestionThemeAssignmentCreationDto } from "~~/tests/unit/utils/faketories/questions/dto/question-theme-assignment-creation/question-theme-assignment-creation.dto.faketory";
import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";
import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { UButton, USelectMenu } from "#components";
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
          modelValue: [createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: false })],
        },
      });

      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });
      const items = selectMenu.props("items") as { label: string; value: string }[];

      expect(items).toHaveLength(2);
    });

    it("should pass the themes placeholder to the select menu when no themes are selected.", () => {
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

      expect(selectMenu.props("placeholder")).toBe("questions.selectThemes");
    });

    it("should pass the static themes placeholder to the select menu when themes are selected.", async() => {
      wrapper = await mountQuestionThemeSelectorComponent({
        props: {
          ...defaultProperties,
          modelValue: [
            createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: false }),
            createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-2", isPrimary: false, isHint: false }),
          ],
        },
      });

      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

      expect(selectMenu.props("placeholder")).toBe("questions.selectThemes");
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
            createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: false }),
            createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-2", isPrimary: false, isHint: false }),
            createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-3", isPrimary: false, isHint: false }),
            createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-4", isPrimary: false, isHint: false }),
            createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-5", isPrimary: false, isHint: false }),
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

        expect(wrapper.emitted("update:modelValue")).toStrictEqual([[[{ themeId: "theme-1", isPrimary: true, isHint: false }]]]);
      });

      it("should emit update:modelValue with the new theme as non-primary when adding a second theme.", async() => {
        wrapper = await mountQuestionThemeSelectorComponent({
          props: {
            ...defaultProperties,
            modelValue: [createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: false })],
          },
        });

        const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

        getWrapperVm(selectMenu).$emit("update:modelValue", "theme-2");

        expect(wrapper.emitted("update:modelValue")).toStrictEqual([
          [
            [
              { themeId: "theme-1", isPrimary: true, isHint: false },
              { themeId: "theme-2", isPrimary: false, isHint: false },
            ],
          ],
        ]);
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
          modelValue: [createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: false })],
        },
      });

      const list = wrapper.find("[data-testid='question-theme-selector-list']");

      expect(list.exists()).toBeTruthy();
    });

    it("should display missing theme translation as label when the theme is not found in available themes.", async() => {
      wrapper = await mountQuestionThemeSelectorComponent({
        props: {
          ...defaultProperties,
          modelValue: [createFakeQuestionThemeAssignmentCreationDto({ themeId: "unknown-theme", isPrimary: true, isHint: false })],
        },
      });

      const item = wrapper.find("[data-testid='question-theme-selector-item-unknown-theme']");

      expect(item.text()).toContain("questions.missingThemeTranslation");
    });

    it("should display missing theme translation as label when the theme is found but has no localized value for the current locale.", async() => {
      wrapper = await mountQuestionThemeSelectorComponent({
        props: {
          ...defaultProperties,
          availableThemes: [createFakeQuestionTheme({ id: "theme-no-en", label: { en: undefined, fr: "Thème", es: undefined, de: undefined, it: undefined, pt: undefined } })],
          modelValue: [createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-no-en", isPrimary: true, isHint: false })],
        },
      });

      const item = wrapper.find("[data-testid='question-theme-selector-item-theme-no-en']");

      expect(item.text()).toContain("questions.missingThemeTranslation");
    });

    it.each<{ themeId: string }>([
      { themeId: "theme-1" },
      { themeId: "theme-2" },
    ])("should render a theme item for $themeId when themes are selected.", async({ themeId }) => {
      wrapper = await mountQuestionThemeSelectorComponent({
        props: {
          ...defaultProperties,
          modelValue: [
            createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: false }),
            createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-2", isPrimary: false, isHint: false }),
          ],
        },
      });

      const item = wrapper.find(`[data-testid='question-theme-selector-item-${themeId}']`);

      expect(item.exists()).toBeTruthy();
    });

    describe("Primary Button", () => {
      it("should use warning color for the primary button when theme is primary.", async() => {
        wrapper = await mountQuestionThemeSelectorComponent({
          props: {
            ...defaultProperties,
            modelValue: [createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: false })],
          },
        });

        const primaryButton = wrapper.getComponent<typeof UButton>("[data-testid='question-theme-selector-primary-theme-1']");

        expect(primaryButton.props("color")).toBe("warning");
      });

      it("should use solid variant for the primary button when theme is primary.", async() => {
        wrapper = await mountQuestionThemeSelectorComponent({
          props: {
            ...defaultProperties,
            modelValue: [createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: false })],
          },
        });

        const primaryButton = wrapper.getComponent<typeof UButton>("[data-testid='question-theme-selector-primary-theme-1']");

        expect(primaryButton.props("variant")).toBe("solid");
      });

      it("should use neutral color for the primary button when theme is not primary.", async() => {
        wrapper = await mountQuestionThemeSelectorComponent({
          props: {
            ...defaultProperties,
            modelValue: [
              createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: false }),
              createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-2", isPrimary: false, isHint: false }),
            ],
          },
        });

        const primaryButton = wrapper.getComponent<typeof UButton>("[data-testid='question-theme-selector-primary-theme-2']");

        expect(primaryButton.props("color")).toBe("neutral");
      });

      it("should use ghost variant for the primary button when theme is not primary.", async() => {
        wrapper = await mountQuestionThemeSelectorComponent({
          props: {
            ...defaultProperties,
            modelValue: [
              createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: false }),
              createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-2", isPrimary: false, isHint: false }),
            ],
          },
        });

        const primaryButton = wrapper.getComponent<typeof UButton>("[data-testid='question-theme-selector-primary-theme-2']");

        expect(primaryButton.props("variant")).toBe("ghost");
      });

      it("should disable the primary button for the already-primary theme when theme is primary.", async() => {
        wrapper = await mountQuestionThemeSelectorComponent({
          props: {
            ...defaultProperties,
            modelValue: [createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: false })],
          },
        });

        const primaryButton = wrapper.getComponent<typeof UButton>("[data-testid='question-theme-selector-primary-theme-1']");

        expect(primaryButton.props("disabled")).toBeTruthy();
      });

      it("should not disable the primary button for a non-primary theme when theme is not primary.", async() => {
        wrapper = await mountQuestionThemeSelectorComponent({
          props: {
            ...defaultProperties,
            modelValue: [
              createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: false }),
              createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-2", isPrimary: false, isHint: false }),
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
              createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: false }),
              createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-2", isPrimary: false, isHint: false }),
            ],
          },
        });

        const primaryButton = wrapper.getComponent<typeof UButton>("[data-testid='question-theme-selector-primary-theme-2']");
        await primaryButton.trigger("click");

        expect(wrapper.emitted("update:modelValue")).toStrictEqual([
          [
            [
              { themeId: "theme-1", isPrimary: false, isHint: false },
              { themeId: "theme-2", isPrimary: true, isHint: false },
            ],
          ],
        ]);
      });
    });

    describe("Hint Switch", () => {
      it("should pass false as model value to the hint switch when theme is not a hint.", async() => {
        wrapper = await mountQuestionThemeSelectorComponent({
          props: {
            ...defaultProperties,
            modelValue: [createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: false })],
          },
        });

        const hintSwitch = wrapper.getComponent("[data-testid='question-theme-selector-hint-theme-1']") as VueWrapper;

        expect((hintSwitch.props() as Record<string, unknown>).modelValue).toBeFalsy();
      });

      it("should pass true as model value to the hint switch when theme is a hint.", async() => {
        wrapper = await mountQuestionThemeSelectorComponent({
          props: {
            ...defaultProperties,
            modelValue: [createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: true })],
          },
        });

        const hintSwitch = wrapper.getComponent("[data-testid='question-theme-selector-hint-theme-1']") as VueWrapper;

        expect((hintSwitch.props() as Record<string, unknown>).modelValue).toBeTruthy();
      });

      it("should emit update:modelValue with toggled hint when hint switch is toggled.", async() => {
        wrapper = await mountQuestionThemeSelectorComponent({
          props: {
            ...defaultProperties,
            modelValue: [createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: false })],
          },
        });

        const hintSwitch = wrapper.findComponent("[data-testid='question-theme-selector-hint-theme-1']") as VueWrapper;
        getWrapperVm(hintSwitch).$emit("update:modelValue", true);

        expect(wrapper.emitted("update:modelValue")).toStrictEqual([[[{ themeId: "theme-1", isPrimary: true, isHint: true }]]]);
      });

      it("should only toggle hint for the targeted theme when multiple themes are selected.", async() => {
        wrapper = await mountQuestionThemeSelectorComponent({
          props: {
            ...defaultProperties,
            modelValue: [
              createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: false }),
              createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-2", isPrimary: false, isHint: false }),
            ],
          },
        });

        const hintSwitch = wrapper.findComponent("[data-testid='question-theme-selector-hint-theme-1']") as VueWrapper;
        getWrapperVm(hintSwitch).$emit("update:modelValue", true);

        expect(wrapper.emitted("update:modelValue")).toStrictEqual([
          [
            [
              { themeId: "theme-1", isPrimary: true, isHint: true },
              { themeId: "theme-2", isPrimary: false, isHint: false },
            ],
          ],
        ]);
      });
    });

    describe("Remove Button", () => {
      it("should emit update:modelValue without the removed theme when remove button is clicked.", async() => {
        wrapper = await mountQuestionThemeSelectorComponent({
          props: {
            ...defaultProperties,
            modelValue: [
              createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: false }),
              createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-2", isPrimary: false, isHint: false }),
            ],
          },
        });

        const removeButton = wrapper.getComponent<typeof UButton>("[data-testid='question-theme-selector-remove-theme-2']");
        await removeButton.trigger("click");

        expect(wrapper.emitted("update:modelValue")).toStrictEqual([[[{ themeId: "theme-1", isPrimary: true, isHint: false }]]]);
      });

      it("should promote the first remaining theme to primary when removing the primary theme.", async() => {
        wrapper = await mountQuestionThemeSelectorComponent({
          props: {
            ...defaultProperties,
            modelValue: [
              createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: false }),
              createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-2", isPrimary: false, isHint: false }),
            ],
          },
        });

        const removeButton = wrapper.getComponent<typeof UButton>("[data-testid='question-theme-selector-remove-theme-1']");
        await removeButton.trigger("click");

        expect(wrapper.emitted("update:modelValue")).toStrictEqual([[[{ themeId: "theme-2", isPrimary: true, isHint: false }]]]);
      });

      it("should emit update:modelValue with an empty array when removing the last theme.", async() => {
        wrapper = await mountQuestionThemeSelectorComponent({
          props: {
            ...defaultProperties,
            modelValue: [createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: false })],
          },
        });

        const removeButton = wrapper.getComponent<typeof UButton>("[data-testid='question-theme-selector-remove-theme-1']");
        await removeButton.trigger("click");

        expect(wrapper.emitted("update:modelValue")).toStrictEqual([[[]]]);
      });
    });
  });
});