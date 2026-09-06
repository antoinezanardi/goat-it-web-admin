import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import { createFakeLocalizedText, createFakeLocalizedTexts } from "@goat-it/schemas/testing/shared";

import { createFakeQuestion } from "~~/tests/unit/utils/faketories/questions/entity/question.entity.faketory";
import { createFakeQuestionContent } from "~~/tests/unit/utils/faketories/questions/entity/question-content/question-content.entity.faketory";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { TranslatedText as TranslatedTextComponent } from "#components";
import { QuestionsTableExpandedRow } from "#components";

import type { Question } from "#shared/types/question.types";

describe("QuestionsTableExpandedRow Component", () => {
  let wrapper: VueWrapper;

  const fakeQuestion: Question = createFakeQuestion({
    id: "q-1",
    content: createFakeQuestionContent({
      answer: createFakeLocalizedText({ en: "Answer text" }),
      statement: createFakeLocalizedText({ en: "Statement text" }),
    }),
  });

  const defaultQuestionsTableExpandedRowProps = {
    question: fakeQuestion,
  } as const;

  async function mountQuestionsTableExpandedRowComponent(options: MountSuspendedOptions<typeof QuestionsTableExpandedRow> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionsTableExpandedRow, options);
  }

  beforeEach(async() => {
    wrapper = await mountQuestionsTableExpandedRowComponent({ props: defaultQuestionsTableExpandedRowProps });
  });

  it("should render QuestionsTableExpandedRow when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should render the answer TranslatedText component when mounted.", () => {
    const answerText = wrapper.findComponent<typeof TranslatedTextComponent>("[data-testid='expanded-answer-q-1']");

    expect(answerText.exists()).toBeTruthy();
  });

  it("should pass the answer localized text to the TranslatedText component when mounted.", () => {
    const answerText = wrapper.findComponent<typeof TranslatedTextComponent>("[data-testid='expanded-answer-q-1']");

    expect(answerText.props("localizedText")).toStrictEqual(fakeQuestion.content.answer);
  });

  it("should render the answer section label when mounted.", () => {
    expect(wrapper.text()).toContain("questions.fields.answer");
  });

  it("should render the context TranslatedText component when context is present.", async() => {
    const questionWithContext: Question = createFakeQuestion({
      id: "q-ctx",
      content: createFakeQuestionContent({
        context: createFakeLocalizedText({ en: "Context text" }),
      }),
    });

    wrapper = await mountQuestionsTableExpandedRowComponent({ props: { question: questionWithContext } });

    const contextText = wrapper.findComponent<typeof TranslatedTextComponent>("[data-testid='expanded-context-q-ctx']");

    expect(contextText.exists()).toBeTruthy();
  });

  it("should pass the context localized text to the TranslatedText component when context is present.", async() => {
    const questionWithContext: Question = createFakeQuestion({
      id: "q-ctx",
      content: createFakeQuestionContent({
        context: createFakeLocalizedText({ en: "Context text" }),
      }),
    });

    wrapper = await mountQuestionsTableExpandedRowComponent({ props: { question: questionWithContext } });

    const contextText = wrapper.findComponent<typeof TranslatedTextComponent>("[data-testid='expanded-context-q-ctx']");

    expect(contextText.props("localizedText")).toStrictEqual(questionWithContext.content.context);
  });

  it("should render the context section label when context is present.", async() => {
    const questionWithContext: Question = createFakeQuestion({
      id: "q-ctx",
      content: createFakeQuestionContent({
        context: createFakeLocalizedText({ en: "Context text" }),
      }),
    });

    wrapper = await mountQuestionsTableExpandedRowComponent({ props: { question: questionWithContext } });

    expect(wrapper.text()).toContain("questions.fields.context");
  });

  it("should not render the context section when context is undefined.", async() => {
    const questionWithoutContext: Question = createFakeQuestion({
      id: "q-no-ctx",
      content: createFakeQuestionContent({ context: undefined }),
    });

    wrapper = await mountQuestionsTableExpandedRowComponent({ props: { question: questionWithoutContext } });

    const contextText = wrapper.find("[data-testid='expanded-context-q-no-ctx']");

    expect(contextText.exists()).toBeFalsy();
  });

  it("should render the trivia list when trivia has items for the current locale.", async() => {
    const questionWithTrivia: Question = createFakeQuestion({
      id: "q-triv",
      content: createFakeQuestionContent({
        trivia: createFakeLocalizedTexts({ en: ["Fact one", "Fact two"] }),
      }),
    });

    wrapper = await mountQuestionsTableExpandedRowComponent({ props: { question: questionWithTrivia } });

    const triviaItems = wrapper.findAll("[data-testid^='expanded-trivia-q-triv-']");

    expect(triviaItems).toHaveLength(2);
  });

  it("should render each trivia item with a '-' prefix when trivia has items for the current locale.", async() => {
    const questionWithTrivia: Question = createFakeQuestion({
      id: "q-triv",
      content: createFakeQuestionContent({
        trivia: createFakeLocalizedTexts({ en: ["Fact one"] }),
      }),
    });

    wrapper = await mountQuestionsTableExpandedRowComponent({ props: { question: questionWithTrivia } });

    const listItem = wrapper.find("li");

    expect(listItem.text().startsWith("-")).toBeTruthy();
  });

  it("should pass localized text for each trivia item to the TranslatedText component when trivia has items for the current locale.", async() => {
    const questionWithTrivia: Question = createFakeQuestion({
      id: "q-triv",
      content: createFakeQuestionContent({
        trivia: createFakeLocalizedTexts({ en: ["Fact one"] }),
      }),
    });

    wrapper = await mountQuestionsTableExpandedRowComponent({ props: { question: questionWithTrivia } });

    const triviaText = wrapper.findComponent<typeof TranslatedTextComponent>("[data-testid='expanded-trivia-text-q-triv-0']");

    expect(triviaText.props("localizedText")).toStrictEqual({ en: "Fact one" });
  });

  it("should render the trivia section label when trivia has items for the current locale.", async() => {
    const questionWithTrivia: Question = createFakeQuestion({
      id: "q-triv",
      content: createFakeQuestionContent({
        trivia: createFakeLocalizedTexts({ en: ["Fact one"] }),
      }),
    });

    wrapper = await mountQuestionsTableExpandedRowComponent({ props: { question: questionWithTrivia } });

    expect(wrapper.text()).toContain("questions.fields.trivia");
  });

  it("should not render the trivia section when trivia is undefined for the current locale.", async() => {
    const questionWithoutTriviaLocale: Question = createFakeQuestion({
      id: "q-no-triv-locale",
      content: createFakeQuestionContent({
        trivia: createFakeLocalizedTexts({ en: undefined, fr: ["French fact"] }),
      }),
    });

    wrapper = await mountQuestionsTableExpandedRowComponent({ props: { question: questionWithoutTriviaLocale } });

    const triviaText = wrapper.find("[data-testid='expanded-trivia-q-no-triv-locale-0']");

    expect(triviaText.exists()).toBeFalsy();
  });

  it("should not render the trivia section when trivia is undefined.", async() => {
    const questionWithoutTrivia: Question = createFakeQuestion({
      id: "q-no-triv",
      content: createFakeQuestionContent({ trivia: undefined }),
    });

    wrapper = await mountQuestionsTableExpandedRowComponent({ props: { question: questionWithoutTrivia } });

    const triviaText = wrapper.find("[data-testid='expanded-trivia-q-no-triv-0']");

    expect(triviaText.exists()).toBeFalsy();
  });

  describe("All sections present", () => {
    const questionWithAll: Question = createFakeQuestion({
      id: "q-all",
      content: createFakeQuestionContent({
        context: createFakeLocalizedText({ en: "Context text" }),
        trivia: createFakeLocalizedTexts({ en: ["Fact one"] }),
      }),
    });

    it("should render the answer section when question has answer, context and trivia.", async() => {
      wrapper = await mountQuestionsTableExpandedRowComponent({ props: { question: questionWithAll } });

      const answerText = wrapper.findComponent<typeof TranslatedTextComponent>("[data-testid='expanded-answer-q-all']");

      expect(answerText.props("localizedText")).toStrictEqual(questionWithAll.content.answer);
    });

    it("should render the context section when question has answer, context and trivia.", async() => {
      wrapper = await mountQuestionsTableExpandedRowComponent({ props: { question: questionWithAll } });

      const contextText = wrapper.findComponent<typeof TranslatedTextComponent>("[data-testid='expanded-context-q-all']");

      expect(contextText.props("localizedText")).toStrictEqual(questionWithAll.content.context);
    });

    it("should render the trivia section when question has answer, context and trivia.", async() => {
      wrapper = await mountQuestionsTableExpandedRowComponent({ props: { question: questionWithAll } });

      const triviaText = wrapper.findComponent<typeof TranslatedTextComponent>("[data-testid='expanded-trivia-text-q-all-0']");

      expect(triviaText.props("localizedText")).toStrictEqual({ en: "Fact one" });
    });
  });
});