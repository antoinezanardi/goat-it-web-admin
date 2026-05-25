import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { createFakeQuestionThemeAssignmentCreationDto } from "~~/tests/unit/utils/faketories/questions/dto/question-theme-assignment-creation/question-theme-assignment-creation.dto.faketory";
import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";
import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { QuestionThemeIcon, UButton, UTooltip } from "#components";
import { QuestionThemeSelectorItem } from "#components";

import type { QuestionThemeSelectorItemProperties } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionThemeSelector/QuestionThemeSelectorItem/question-theme-selector-item.types";

describe("QuestionThemeSelectorItem Component", () => {
  let wrapper: VueWrapper;
  const fakeTheme = createFakeQuestionTheme({
    id: "theme-1",
    label: { en: "Geography", fr: "Géographie", es: undefined, de: undefined, it: undefined, pt: undefined },
    color: "#FF0000",
    slug: "geography",
  });
  const fakeAssignment = createFakeQuestionThemeAssignmentCreationDto({ themeId: "theme-1", isPrimary: true, isHint: true });

  const defaultProperties: QuestionThemeSelectorItemProperties = {
    assignment: fakeAssignment,
    theme: fakeTheme,
    isPrimaryDisabled: false,
    isRemoveDisabled: false,
    isRemoveVisible: true,
    isHintDisabled: false,
  };

  async function mountQuestionThemeSelectorItemComponent(options: MountSuspendedOptions<typeof QuestionThemeSelectorItem> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemeSelectorItem, {
      props: defaultProperties,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionThemeSelectorItemComponent();
  });

  it("should render the question theme selector item component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should render with correct data-testid based on assignment themeId when mounted.", () => {
    const container = wrapper.find("[data-testid='question-theme-selector-item-theme-1']");

    expect(container.exists()).toBeTruthy();
  });

  describe("Primary Button", () => {
    it("should use warning color when assignment is primary.", () => {
      const primaryButton = wrapper.findComponent<typeof UButton>("[data-testid='question-theme-selector-primary-theme-1']");

      expect(primaryButton.props("color")).toBe("warning");
    });

    it("should use soft variant when assignment is primary.", () => {
      const primaryButton = wrapper.findComponent<typeof UButton>("[data-testid='question-theme-selector-primary-theme-1']");

      expect(primaryButton.props("variant")).toBe("soft");
    });

    it("should use neutral color when assignment is not primary.", async() => {
      wrapper = await mountQuestionThemeSelectorItemComponent({
        props: { ...defaultProperties, assignment: { ...fakeAssignment, isPrimary: false } },
      });
      const primaryButton = wrapper.findComponent<typeof UButton>("[data-testid='question-theme-selector-primary-theme-1']");

      expect(primaryButton.props("color")).toBe("neutral");
    });

    it("should use outline variant when assignment is not primary.", async() => {
      wrapper = await mountQuestionThemeSelectorItemComponent({
        props: { ...defaultProperties, assignment: { ...fakeAssignment, isPrimary: false } },
      });
      const primaryButton = wrapper.findComponent<typeof UButton>("[data-testid='question-theme-selector-primary-theme-1']");

      expect(primaryButton.props("variant")).toBe("outline");
    });

    it("should disable primary button when isPrimaryDisabled is true.", async() => {
      wrapper = await mountQuestionThemeSelectorItemComponent({
        props: { ...defaultProperties, isPrimaryDisabled: true },
      });
      const primaryButton = wrapper.findComponent<typeof UButton>("[data-testid='question-theme-selector-primary-theme-1']");

      expect(primaryButton.props("disabled")).toBeTruthy();
    });

    it("should not disable primary button when isPrimaryDisabled is false.", () => {
      const primaryButton = wrapper.findComponent<typeof UButton>("[data-testid='question-theme-selector-primary-theme-1']");

      expect(primaryButton.props("disabled")).toBeFalsy();
    });

    it("should emit setPrimary when primary button is clicked.", () => {
      const primaryButton = wrapper.findComponent<typeof UButton>("[data-testid='question-theme-selector-primary-theme-1']");
      getWrapperVm(primaryButton).$emit("click");

      expect(wrapper.emitted("setPrimary")).toBeDefined();
    });

    it("should have questions.primaryTheme as aria-label when assignment is primary.", () => {
      const primaryButton = wrapper.findComponent<typeof UButton>("[data-testid='question-theme-selector-primary-theme-1']");

      expect(primaryButton.attributes("aria-label")).toBe("questions.primaryTheme");
    });

    it("should have questions.promoteAsPrimaryTheme as aria-label when assignment is not primary.", async() => {
      wrapper = await mountQuestionThemeSelectorItemComponent({
        props: { ...defaultProperties, assignment: { ...fakeAssignment, isPrimary: false } },
      });
      const primaryButton = wrapper.findComponent<typeof UButton>("[data-testid='question-theme-selector-primary-theme-1']");

      expect(primaryButton.attributes("aria-label")).toBe("questions.promoteAsPrimaryTheme");
    });
  });

  describe("Primary Button Tooltip", () => {
    it("should pass questions.primaryTheme as text when assignment is primary.", () => {
      const tooltips = wrapper.findAllComponents<typeof UTooltip>({ name: "UTooltip" });

      expect(tooltips[0]?.props("text")).toBe("questions.primaryTheme");
    });

    it("should pass questions.promoteAsPrimaryTheme as text when assignment is not primary.", async() => {
      wrapper = await mountQuestionThemeSelectorItemComponent({
        props: { ...defaultProperties, assignment: { ...fakeAssignment, isPrimary: false } },
      });
      const tooltips = wrapper.findAllComponents<typeof UTooltip>({ name: "UTooltip" });
      const primaryTooltip = tooltips[0];

      expect(primaryTooltip?.props("text")).toBe("questions.promoteAsPrimaryTheme");
    });
  });

  describe("Theme Icon", () => {
    it("should pass theme color to QuestionThemeIcon when theme is defined.", () => {
      const icon = wrapper.findComponent<typeof QuestionThemeIcon>("[data-testid='question-theme-selector-icon-theme-1']");

      expect(icon.props("color")).toBe("#FF0000");
    });

    it("should pass theme slug to QuestionThemeIcon when theme is defined.", () => {
      const icon = wrapper.findComponent<typeof QuestionThemeIcon>("[data-testid='question-theme-selector-icon-theme-1']");

      expect(icon.props("slug")).toBe("geography");
    });

    it("should pass empty string as slug when theme is undefined.", async() => {
      wrapper = await mountQuestionThemeSelectorItemComponent({
        props: { ...defaultProperties, theme: undefined },
      });
      const icon = wrapper.findComponent<typeof QuestionThemeIcon>("[data-testid='question-theme-selector-icon-theme-1']");

      expect(icon.props("slug")).toBe("");
    });

    it("should pass undefined as color when theme is undefined.", async() => {
      wrapper = await mountQuestionThemeSelectorItemComponent({
        props: { ...defaultProperties, theme: undefined },
      });
      const icon = wrapper.findComponent<typeof QuestionThemeIcon>("[data-testid='question-theme-selector-icon-theme-1']");

      expect(icon.props("color")).toBeUndefined();
    });
  });

  describe("Theme Label", () => {
    it("should display the localized theme label when theme has a label for the current locale.", () => {
      const label = wrapper.find("span.flex-1");

      expect(label.text()).toBe("Geography");
    });

    it("should display missingThemeTranslation when theme is undefined.", async() => {
      wrapper = await mountQuestionThemeSelectorItemComponent({
        props: { ...defaultProperties, theme: undefined },
      });
      const label = wrapper.find("span.flex-1");

      expect(label.text()).toBe("questions.missingThemeTranslation");
    });

    it("should display missingThemeTranslation when theme has no localized value for current locale.", async() => {
      const themeWithNoEnLabel = createFakeQuestionTheme({ label: { en: undefined, fr: "Géographie", es: undefined, de: undefined, it: undefined, pt: undefined } });
      wrapper = await mountQuestionThemeSelectorItemComponent({
        props: { ...defaultProperties, theme: themeWithNoEnLabel },
      });
      const label = wrapper.find("span.flex-1");

      expect(label.text()).toBe("questions.missingThemeTranslation");
    });
  });

  describe("Hint Switch", () => {
    it("should pass assignment isHint as model-value to the switch when mounted.", () => {
      const switchComponent = wrapper.findComponent("[data-testid='question-theme-selector-hint-theme-1']") as VueWrapper;

      expect((switchComponent.props() as Record<string, unknown>).modelValue).toBe(fakeAssignment.isHint);
    });

    it("should disable switch when isHintDisabled is true.", async() => {
      wrapper = await mountQuestionThemeSelectorItemComponent({
        props: { ...defaultProperties, isHintDisabled: true },
      });
      const switchComponent = wrapper.findComponent("[data-testid='question-theme-selector-hint-theme-1']") as VueWrapper;

      expect((switchComponent.props() as Record<string, unknown>).disabled).toBeTruthy();
    });

    it("should not disable switch when isHintDisabled is false.", () => {
      const switchComponent = wrapper.findComponent("[data-testid='question-theme-selector-hint-theme-1']") as VueWrapper;

      expect((switchComponent.props() as Record<string, unknown>).disabled).toBeFalsy();
    });

    it("should emit toggleHint when switch value changes.", () => {
      const switchComponent = wrapper.findComponent("[data-testid='question-theme-selector-hint-theme-1']") as VueWrapper;
      getWrapperVm(switchComponent).$emit("update:modelValue", false);

      expect(wrapper.emitted("toggleHint")).toBeDefined();
    });
  });

  describe("Remove Button", () => {
    it("should not render remove button when isRemoveVisible is false.", async() => {
      wrapper = await mountQuestionThemeSelectorItemComponent({
        props: { ...defaultProperties, isRemoveVisible: false },
      });
      const removeButton = wrapper.find("[data-testid='question-theme-selector-remove-theme-1']");

      expect(removeButton.exists()).toBeFalsy();
    });

    it("should render remove button when isRemoveVisible is true.", () => {
      const removeButton = wrapper.findComponent<typeof UButton>("[data-testid='question-theme-selector-remove-theme-1']");

      expect(removeButton.exists()).toBeTruthy();
    });

    it("should disable remove button when isRemoveDisabled is true.", async() => {
      wrapper = await mountQuestionThemeSelectorItemComponent({
        props: { ...defaultProperties, isRemoveDisabled: true },
      });
      const removeButton = wrapper.findComponent<typeof UButton>("[data-testid='question-theme-selector-remove-theme-1']");

      expect(removeButton.props("disabled")).toBeTruthy();
    });

    it("should not disable remove button when isRemoveDisabled is false.", () => {
      const removeButton = wrapper.findComponent<typeof UButton>("[data-testid='question-theme-selector-remove-theme-1']");

      expect(removeButton.props("disabled")).toBeFalsy();
    });

    it("should emit remove when remove button is clicked.", () => {
      const removeButton = wrapper.findComponent<typeof UButton>("[data-testid='question-theme-selector-remove-theme-1']");
      getWrapperVm(removeButton).$emit("click");

      expect(wrapper.emitted("remove")).toBeDefined();
    });

    it("should show questions.cantRemovePrimaryTheme as tooltip text when isRemoveDisabled and assignment is primary.", async() => {
      wrapper = await mountQuestionThemeSelectorItemComponent({
        props: { ...defaultProperties, isRemoveDisabled: true, assignment: { ...fakeAssignment, isPrimary: true } },
      });
      const tooltips = wrapper.findAllComponents<typeof UTooltip>({ name: "UTooltip" });
      const removeTooltip = tooltips[1];

      expect(removeTooltip?.props("text")).toBe("questions.cantRemovePrimaryTheme");
    });

    it("should show questions.removeTheme as tooltip text when not isRemoveDisabled and isPrimary.", () => {
      const tooltips = wrapper.findAllComponents<typeof UTooltip>({ name: "UTooltip" });
      const removeTooltip = tooltips[1];

      expect(removeTooltip?.props("text")).toBe("questions.removeTheme");
    });
  });
});