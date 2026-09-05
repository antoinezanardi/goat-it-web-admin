import { crush } from "radashi";
import { describe, it, expect } from "vitest";

import frQuestions from "~/i18n/locales/fr/questions.json";
import enQuestions from "~/i18n/locales/en/questions.json";
import deQuestions from "~/i18n/locales/de/questions.json";
import esQuestions from "~/i18n/locales/es/questions.json";
import itQuestions from "~/i18n/locales/it/questions.json";
import ptQuestions from "~/i18n/locales/pt/questions.json";

describe("questions.json translations", () => {
  it("should have the same keys in english as in french when context is questions.", () => {
    const crushedFrQuestionsKeys = Object.keys(crush(frQuestions)).toSorted();
    const crushedEnQuestionsKeys = Object.keys(crush(enQuestions)).toSorted();

    expect(crushedEnQuestionsKeys).toStrictEqual(crushedFrQuestionsKeys);
  });

  it("should have the same keys in french as in german when context is questions.", () => {
    const crushedFrQuestionsKeys = Object.keys(crush(frQuestions)).toSorted();
    const crushedDeQuestionsKeys = Object.keys(crush(deQuestions)).toSorted();

    expect(crushedDeQuestionsKeys).toStrictEqual(crushedFrQuestionsKeys);
  });

  it("should have the same keys in french as in spanish when context is questions.", () => {
    const crushedFrQuestionsKeys = Object.keys(crush(frQuestions)).toSorted();
    const crushedEsQuestionsKeys = Object.keys(crush(esQuestions)).toSorted();

    expect(crushedEsQuestionsKeys).toStrictEqual(crushedFrQuestionsKeys);
  });

  it("should have the same keys in french as in italian when context is questions.", () => {
    const crushedFrQuestionsKeys = Object.keys(crush(frQuestions)).toSorted();
    const crushedItQuestionsKeys = Object.keys(crush(itQuestions)).toSorted();

    expect(crushedItQuestionsKeys).toStrictEqual(crushedFrQuestionsKeys);
  });

  it("should have the same keys in french as in portuguese when context is questions.", () => {
    const crushedFrQuestionsKeys = Object.keys(crush(frQuestions)).toSorted();
    const crushedPtQuestionsKeys = Object.keys(crush(ptQuestions)).toSorted();

    expect(crushedPtQuestionsKeys).toStrictEqual(crushedFrQuestionsKeys);
  });
});