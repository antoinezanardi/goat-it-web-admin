import { crush } from "radashi";
import { describe, it, expect } from "vitest";

import frValidation from "~/i18n/locales/fr/validation.json";
import enValidation from "~/i18n/locales/en/validation.json";
import deValidation from "~/i18n/locales/de/validation.json";
import esValidation from "~/i18n/locales/es/validation.json";
import itValidation from "~/i18n/locales/it/validation.json";
import ptValidation from "~/i18n/locales/pt/validation.json";

describe("validation.json translations", () => {
  it.each<[string, typeof frValidation]>([
    ["de", deValidation],
    ["en", enValidation],
    ["es", esValidation],
    ["it", itValidation],
    ["pt", ptValidation],
  ])("should have the same keys in every locale as in french when context is validation.", (_locale, translations) => {
    const crushedReferenceKeys = Object.keys(crush(frValidation)).toSorted();
    const crushedTranslationKeys = Object.keys(crush(translations)).toSorted();

    expect(crushedTranslationKeys).toStrictEqual<string[]>(crushedReferenceKeys);
  });
});