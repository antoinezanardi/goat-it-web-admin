import { crush } from "radashi";
import { describe, it, expect } from "vitest";

import frQuestions from "~/i18n/locales/fr/questions.json";
import enQuestions from "~/i18n/locales/en/questions.json";

describe("questions.json translations", () => {
  it("should have the same keys in english as in french when context is questions.", () => {
    const crushedFrQuestionsKeys = Object.keys(crush(frQuestions)).toSorted();
    const crushedEnQuestionsKeys = Object.keys(crush(enQuestions)).toSorted();

    expect(crushedEnQuestionsKeys).toStrictEqual(crushedFrQuestionsKeys);
  });
});