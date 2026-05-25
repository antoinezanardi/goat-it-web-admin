import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { flushPromises } from "@vue/test-utils";
import { nextTick } from "vue";
import { beforeEach, describe, expect, it } from "vitest";

import { createFakeQuestionThemeAssignmentCreationDto } from "~~/tests/unit/utils/faketories/questions/dto/question-theme-assignment-creation/question-theme-assignment-creation.dto.faketory";
import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";
import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { QuestionThemeIcon, UButton, UFormField, USelectMenu, UTooltip } from "#components";
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

  describe("Form Field", () => {
    it("should render the form field with the correct label when mounted.", () => {
      const formField = wrapper.findComponent<typeof UFormField>("[data-testid='question-theme-selector']");

      expect(formField.props("label")).toBe("questions.fields.themes");
    });

    it("should render the form field with the correct name when mounted.", () => {
      const formField = wrapper.findComponent<typeof UFormField>("[data-testid='question-theme-selector']");

      expect(formField.props("name")).toBe("themes");
    });

    it("should render the form field as required when mounted.", () => {
      const formField = wrapper.findComponent<typeof UFormField>("[data-testid='question-theme-selector']");

      expect(formField.props("required")).toBeTruthy();
    });
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

    it("should pass undefined as model value to the select menu when themes are selected.", async() => {
      wrapper = await mountQuestionThemeSelectorComponent({
        props: {
          ...defaultProperties,
          modelValue: [createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: false })],
        },
      });

      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

      expect(selectMenu.props("modelValue")).toBeUndefined();
    });

    it("should include a previously selected theme back in items when that theme is removed from selection.", async() => {
      wrapper = await mountQuestionThemeSelectorComponent({
        props: {
          ...defaultProperties,
          modelValue: [
            createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: false }),
            createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-2", isPrimary: false, isHint: false }),
          ],
        },
      });

      await wrapper.setProps({
        modelValue: [createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: false })],
      });

      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });
      const items = selectMenu.props("items") as { label: string; value: string }[];

      expect(items.map(item => item.value)).toContain("theme-2");
    });

    it("should pass search input properties with translated placeholder to the select menu when mounted.", () => {
      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

      expect(selectMenu.props("searchInput")).toStrictEqual({ placeholder: "questions.searchThemes" });
    });

    describe("Item Leading Slot", () => {
      async function openSelectMenu(): Promise<VueWrapper> {
        const mountedWrapper = await mountQuestionThemeSelectorComponent({ attachTo: document.body });
        const selectMenu = mountedWrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });
        const trigger = selectMenu.find("button");

        await trigger.trigger("click");
        await flushPromises();
        await nextTick();
        await nextTick();

        return mountedWrapper;
      }

      it("should render question theme icons in the dropdown items when the select menu is open.", async() => {
        wrapper = await openSelectMenu();
        const icons = wrapper.findAllComponents<typeof QuestionThemeIcon>({ name: "QuestionThemeIcon" });

        expect(icons.length).toBeGreaterThan(0);
      });

      it("should pass theme slug to the question theme icon in the dropdown when the select menu is open.", async() => {
        wrapper = await openSelectMenu();
        const icons = wrapper.findAllComponents<typeof QuestionThemeIcon>({ name: "QuestionThemeIcon" });

        expect(icons[0]?.props("slug")).toBe(fakeThemes[0]?.slug);
      });

      it("should pass theme color to the question theme icon in the dropdown when the select menu is open.", async() => {
        wrapper = await openSelectMenu();
        const icons = wrapper.findAllComponents<typeof QuestionThemeIcon>({ name: "QuestionThemeIcon" });

        expect(icons[0]?.props("color")).toBe(fakeThemes[0]?.color);
      });
    });

    describe("Empty Slot", () => {
      it("should render no matching theme text when the select menu has no items.", async() => {
        wrapper = await mountQuestionThemeSelectorComponent({
          props: {
            ...defaultProperties,
            availableThemes: [],
          },
          attachTo: document.body,
        });
        const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });
        const trigger = selectMenu.find("button");

        await trigger.trigger("click");
        await flushPromises();
        await nextTick();
        await nextTick();

        expect(document.body.innerHTML).toContain("questions.noMatchingTheme");
      });
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

      it("should use soft variant for the primary button when theme is primary.", async() => {
        wrapper = await mountQuestionThemeSelectorComponent({
          props: {
            ...defaultProperties,
            modelValue: [createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: false })],
          },
        });

        const primaryButton = wrapper.getComponent<typeof UButton>("[data-testid='question-theme-selector-primary-theme-1']");

        expect(primaryButton.props("variant")).toBe("soft");
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

      it("should use outline variant for the primary button when theme is not primary.", async() => {
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

        expect(primaryButton.props("variant")).toBe("outline");
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

  describe("Disabled State", () => {
    it("should disable the select menu when disabled prop is true.", async() => {
      wrapper = await mountQuestionThemeSelectorComponent({
        props: {
          ...defaultProperties,
          disabled: true,
        },
      });

      const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

      expect(selectMenu.props("disabled")).toBeTruthy();
    });

    it("should disable the primary button when disabled prop is true.", async() => {
      wrapper = await mountQuestionThemeSelectorComponent({
        props: {
          ...defaultProperties,
          disabled: true,
          modelValue: [
            createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: false, isHint: false }),
            createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-2", isPrimary: true, isHint: false }),
          ],
        },
      });

      const primaryButton = wrapper.getComponent<typeof UButton>("[data-testid='question-theme-selector-primary-theme-1']");

      expect(primaryButton.props("disabled")).toBeTruthy();
    });

    it("should disable the hint switch when disabled prop is true.", async() => {
      wrapper = await mountQuestionThemeSelectorComponent({
        props: {
          ...defaultProperties,
          disabled: true,
          modelValue: [createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: false })],
        },
      });

      const hintSwitch = wrapper.getComponent("[data-testid='question-theme-selector-hint-theme-1']") as VueWrapper;

      expect((hintSwitch.props() as Record<string, unknown>).disabled).toBeTruthy();
    });

    it("should disable the remove button when disabled is true.", async() => {
      wrapper = await mountQuestionThemeSelectorComponent({
        props: {
          ...defaultProperties,
          disabled: true,
          modelValue: [createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: false })],
        },
      });
      const removeButton = wrapper.getComponent<typeof UButton>("[data-testid='question-theme-selector-remove-theme-1']");

      expect(removeButton.props("disabled")).toBeTruthy();
    });
  });

  describe("Edit mode", () => {
    const editModeAssignments = [
      createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: false }),
      createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-2", isPrimary: false, isHint: true }),
    ];

    async function mountInEditMode(overrides: Partial<QuestionThemeSelectorProperties> = {}): Promise<VueWrapper> {
      return mountQuestionThemeSelectorComponent({
        props: {
          ...defaultProperties,
          modelValue: editModeAssignments,
          mode: "edit",
          ...overrides,
        },
      });
    }

    describe("Assign theme", () => {
      it("should emit assignThemeInEditMode with isPrimary true when adding the first theme ever in edit mode.", async() => {
        wrapper = await mountInEditMode({ modelValue: [] });
        const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

        getWrapperVm(selectMenu).$emit("update:modelValue", "theme-1");

        expect(wrapper.emitted("assignThemeInEditMode")).toStrictEqual([[{ themeId: "theme-1", isPrimary: true, isHint: false }]]);
      });

      it("should emit assignThemeInEditMode with isPrimary false and isHint false when adding a theme in edit mode.", async() => {
        wrapper = await mountInEditMode();
        const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

        getWrapperVm(selectMenu).$emit("update:modelValue", "theme-3");

        expect(wrapper.emitted("assignThemeInEditMode")).toStrictEqual([[{ themeId: "theme-3", isPrimary: false, isHint: false }]]);
      });

      it("should not emit update:modelValue when adding a theme in edit mode.", async() => {
        wrapper = await mountInEditMode();
        const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

        getWrapperVm(selectMenu).$emit("update:modelValue", "theme-3");

        expect(wrapper.emitted("update:modelValue")).toBeUndefined();
      });
    });

    describe("Remove theme", () => {
      it("should emit removeThemeInEditMode with themeId when removing a theme in edit mode.", async() => {
        wrapper = await mountInEditMode();
        const removeButton = wrapper.getComponent<typeof UButton>("[data-testid='question-theme-selector-remove-theme-2']");

        await removeButton.trigger("click");

        expect(wrapper.emitted("removeThemeInEditMode")).toStrictEqual([["theme-2"]]);
      });

      it("should not emit update:modelValue when removing a theme in edit mode.", async() => {
        wrapper = await mountInEditMode();
        const removeButton = wrapper.getComponent<typeof UButton>("[data-testid='question-theme-selector-remove-theme-2']");

        await removeButton.trigger("click");

        expect(wrapper.emitted("update:modelValue")).toBeUndefined();
      });

      it("should not render the remove button when only one theme remains in edit mode.", async() => {
        wrapper = await mountInEditMode({
          modelValue: [createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: false })],
        });
        const removeButton = wrapper.find("[data-testid='question-theme-selector-remove-theme-1']");

        expect(removeButton.exists()).toBeFalsy();
      });

      it("should disable the remove button for the primary theme when more than one theme exists in edit mode.", async() => {
        wrapper = await mountInEditMode();
        const removeButton = wrapper.getComponent<typeof UButton>("[data-testid='question-theme-selector-remove-theme-1']");

        expect(removeButton.props("disabled")).toBeTruthy();
      });

      it("should not disable the remove button for a non-primary theme when more than one theme exists in edit mode.", async() => {
        wrapper = await mountInEditMode();
        const removeButton = wrapper.getComponent<typeof UButton>("[data-testid='question-theme-selector-remove-theme-2']");

        expect(removeButton.props("disabled")).toBeFalsy();
      });

      it("should pass the cant remove primary theme tooltip to the UTooltip wrapping the remove button when theme is primary in edit mode.", async() => {
        wrapper = await mountInEditMode();
        const item = wrapper.findComponent("[data-testid='question-theme-selector-item-theme-1']");
        const tooltips = item.findAllComponents<typeof UTooltip>({ name: "UTooltip" });
        const removeTooltip = tooltips[1];

        expect(removeTooltip?.props("text")).toBe("questions.cantRemovePrimaryTheme");
      });

      it("should pass the remove theme tooltip to the UTooltip wrapping the remove button when theme is not primary in edit mode.", async() => {
        wrapper = await mountInEditMode();
        const item = wrapper.findComponent("[data-testid='question-theme-selector-item-theme-2']");
        const tooltips = item.findAllComponents<typeof UTooltip>({ name: "UTooltip" });
        const removeTooltip = tooltips[1];

        expect(removeTooltip?.props("text")).toBe("questions.removeTheme");
      });

      it("should not render the remove button when disabled is true and theme is primary in edit mode.", async() => {
        wrapper = await mountInEditMode({ disabled: true });
        const removeButton = wrapper.find("[data-testid='question-theme-selector-remove-theme-1']");

        expect(removeButton.exists()).toBeFalsy();
      });
    });

    describe("Set primary", () => {
      it("should emit modifyThemeInEditMode with isPrimary true when setting a theme as primary in edit mode.", async() => {
        wrapper = await mountInEditMode();
        const primaryButton = wrapper.getComponent<typeof UButton>("[data-testid='question-theme-selector-primary-theme-2']");

        await primaryButton.trigger("click");

        expect(wrapper.emitted("modifyThemeInEditMode")).toStrictEqual([["theme-2", { isPrimary: true }]]);
      });

      it("should not emit update:modelValue when setting primary in edit mode.", async() => {
        wrapper = await mountInEditMode();
        const primaryButton = wrapper.getComponent<typeof UButton>("[data-testid='question-theme-selector-primary-theme-2']");

        await primaryButton.trigger("click");

        expect(wrapper.emitted("update:modelValue")).toBeUndefined();
      });
    });

    describe("Toggle hint", () => {
      it("should emit modifyThemeInEditMode with isHint true when toggling hint from false in edit mode.", async() => {
        wrapper = await mountInEditMode();
        const hintSwitch = wrapper.findComponent("[data-testid='question-theme-selector-hint-theme-1']") as VueWrapper;

        getWrapperVm(hintSwitch).$emit("update:modelValue", true);

        expect(wrapper.emitted("modifyThemeInEditMode")).toStrictEqual([["theme-1", { isHint: true }]]);
      });

      it("should emit modifyThemeInEditMode with isHint false when toggling hint from true in edit mode.", async() => {
        wrapper = await mountInEditMode();
        const hintSwitch = wrapper.findComponent("[data-testid='question-theme-selector-hint-theme-2']") as VueWrapper;

        getWrapperVm(hintSwitch).$emit("update:modelValue", false);

        expect(wrapper.emitted("modifyThemeInEditMode")).toStrictEqual([["theme-2", { isHint: false }]]);
      });

      it("should not emit update:modelValue when toggling hint in edit mode.", async() => {
        wrapper = await mountInEditMode();
        const hintSwitch = wrapper.findComponent("[data-testid='question-theme-selector-hint-theme-1']") as VueWrapper;

        getWrapperVm(hintSwitch).$emit("update:modelValue", true);

        expect(wrapper.emitted("update:modelValue")).toBeUndefined();
      });
    });

    describe("isSubmitting state", () => {
      it("should disable the select menu when isSubmitting is true.", async() => {
        wrapper = await mountInEditMode({ isSubmitting: true });
        const selectMenu = wrapper.findComponent<typeof USelectMenu>({ name: "USelectMenu" });

        expect(selectMenu.props("disabled")).toBeTruthy();
      });

      it("should disable the primary button when isSubmitting is true.", async() => {
        wrapper = await mountInEditMode({ isSubmitting: true });
        const primaryButton = wrapper.getComponent<typeof UButton>("[data-testid='question-theme-selector-primary-theme-2']");

        expect(primaryButton.props("disabled")).toBeTruthy();
      });

      it("should disable the hint switch when isSubmitting is true.", async() => {
        wrapper = await mountInEditMode({ isSubmitting: true });
        const hintSwitch = wrapper.find("[data-testid='question-theme-selector-hint-theme-1']");

        expect(hintSwitch.attributes("disabled")).toBeDefined();
      });

      it("should disable the remove button when isSubmitting is true.", async() => {
        wrapper = await mountInEditMode({ isSubmitting: true });
        const removeButton = wrapper.getComponent<typeof UButton>("[data-testid='question-theme-selector-remove-theme-2']");

        expect(removeButton.props("disabled")).toBeTruthy();
      });
    });
  });
});