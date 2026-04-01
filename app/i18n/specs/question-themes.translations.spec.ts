import { crush } from "radashi";
import { describe, it, expect } from "vitest";

import frQuestionThemes from "~/i18n/locales/fr/question-themes.json";
import enQuestionThemes from "~/i18n/locales/en/question-themes.json";

describe("question-themes.json translations", () => {
  it("should have the same keys in english as in french when context is question-themes.", () => {
    const crushedFrQuestionThemesKeys = Object.keys(crush(frQuestionThemes)).toSorted();
    const crushedEnQuestionThemesKeys = Object.keys(crush(enQuestionThemes)).toSorted();

    expect(crushedEnQuestionThemesKeys).toStrictEqual(crushedFrQuestionThemesKeys);
  });
});