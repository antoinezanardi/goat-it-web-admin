import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import { createFakeLocalizedText, createFakeLocalizedTexts } from "@goat-it/schemas/testing/shared";

import { DEFAULT_MOCKED_LOCALE } from "~~/tests/unit/utils/mocks/composables/nuxt/useI18n/useI18n.mock.constants";
import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { QuestionThemeTranslationCompletenessIndicator, TranslationCompletenessIndicator } from "#components";

import type { QuestionThemeTranslationCompletenessIndicatorProps } from "~/components/domain/question-theme/QuestionThemeTranslationCompletenessIndicator/question-theme-translation-completeness-indicator.types";

describe("QuestionThemeTranslationCompletenessIndicator Component", () => {
  let wrapper: VueWrapper;
  const questionTheme = createFakeQuestionTheme({
    label: createFakeLocalizedText({ [DEFAULT_MOCKED_LOCALE]: "Existing Label" }),
    description: createFakeLocalizedText({ [DEFAULT_MOCKED_LOCALE]: "Existing Description" }),
    aliases: createFakeLocalizedTexts({ [DEFAULT_MOCKED_LOCALE]: ["alias-one", "alias-two"] }),
  });
  const defaultProperties: QuestionThemeTranslationCompletenessIndicatorProps = {
    questionTheme,
  } as const;

  type ComponentOptions = MountSuspendedOptions<typeof QuestionThemeTranslationCompletenessIndicator>;

  async function mountQuestionThemeTranslationCompletenessIndicatorComponent(options: ComponentOptions = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemeTranslationCompletenessIndicator, {
      props: defaultProperties,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionThemeTranslationCompletenessIndicatorComponent();
  });

  it("should render the question theme translation completeness indicator component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Translation Completeness Indicator", () => {
    it("should render the translation completeness indicator component when mounted.", () => {
      const indicator = wrapper.findComponent(TranslationCompletenessIndicator);

      expect(indicator.exists()).toBeTruthy();
    });

    it("should pass the question theme label and description as required fields to the translation completeness indicator component when rendered.", () => {
      const indicator = wrapper.findComponent(TranslationCompletenessIndicator);

      expect(indicator.props("requiredFields")).toStrictEqual([questionTheme.label, questionTheme.description]);
    });

    it("should have the data-testid attribute on the translation completeness indicator component when rendered.", () => {
      expect(wrapper.html()).toContain("question-theme-translation-completeness-indicator");
    });
  });
});