import { crush } from "radashi";
import { describe, it, expect } from "vitest";

import frLocalization from "~/i18n/locales/fr/localization.json";
import enLocalization from "~/i18n/locales/en/localization.json";
import deLocalization from "~/i18n/locales/de/localization.json";
import esLocalization from "~/i18n/locales/es/localization.json";
import itLocalization from "~/i18n/locales/it/localization.json";
import ptLocalization from "~/i18n/locales/pt/localization.json";

describe("localization.json translations", () => {
  it.each<[string, typeof frLocalization]>([
    ["de", deLocalization],
    ["en", enLocalization],
    ["es", esLocalization],
    ["it", itLocalization],
    ["pt", ptLocalization],
  ])("should have the same keys in every locale as in french when context is localization.", (_locale, translations) => {
    const crushedReferenceKeys = Object.keys(crush(frLocalization)).toSorted();
    const crushedTranslationKeys = Object.keys(crush(translations)).toSorted();

    expect(crushedTranslationKeys).toStrictEqual<string[]>(crushedReferenceKeys);
  });
});