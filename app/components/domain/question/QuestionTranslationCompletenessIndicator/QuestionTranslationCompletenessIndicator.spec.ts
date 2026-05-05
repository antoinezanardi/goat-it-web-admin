import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { createFakeQuestion } from "~~/tests/unit/utils/faketories/questions/entity/question.entity.faketory";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { QuestionTranslationCompletenessIndicator, TranslationCompletenessIndicator } from "#components";

import type { QuestionTranslationCompletenessIndicatorProperties } from "~/components/domain/question/QuestionTranslationCompletenessIndicator/question-translation-completeness-indicator.types";

describe("QuestionTranslationCompletenessIndicator Component", () => {
  let wrapper: VueWrapper;
  const question = createFakeQuestion();
  const defaultProperties: QuestionTranslationCompletenessIndicatorProperties = {
    question,
  } as const;

  type ComponentOptions = MountSuspendedOptions<typeof QuestionTranslationCompletenessIndicator>;

  async function mountQuestionTranslationCompletenessIndicatorComponent(options: ComponentOptions = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionTranslationCompletenessIndicator, {
      props: defaultProperties,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionTranslationCompletenessIndicatorComponent();
  });

  it("should render the question translation completeness indicator component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Translation Completeness Indicator", () => {
    it("should render the translation completeness indicator component when mounted.", () => {
      const indicator = wrapper.findComponent(TranslationCompletenessIndicator);

      expect(indicator.exists()).toBeTruthy();
    });

    it("should pass the question statement and answer as required fields to the translation completeness indicator component when rendered.", () => {
      const indicator = wrapper.findComponent(TranslationCompletenessIndicator);

      expect(indicator.props("requiredFields")).toStrictEqual([question.content.statement, question.content.answer]);
    });

    it("should have the data-testid attribute on the translation completeness indicator component when rendered.", () => {
      expect(wrapper.html()).toContain("question-translation-completeness-indicator");
    });
  });
});