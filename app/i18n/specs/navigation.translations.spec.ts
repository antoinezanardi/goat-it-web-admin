import { crush } from "radashi";
import { describe, it, expect } from "vitest";

import frNavigation from "~/i18n/locales/fr/navigation.json";
import enNavigation from "~/i18n/locales/en/navigation.json";
import deNavigation from "~/i18n/locales/de/navigation.json";
import esNavigation from "~/i18n/locales/es/navigation.json";
import itNavigation from "~/i18n/locales/it/navigation.json";
import ptNavigation from "~/i18n/locales/pt/navigation.json";

describe("navigation.json translations", () => {
  it.each<[string, typeof frNavigation]>([
    ["de", deNavigation],
    ["en", enNavigation],
    ["es", esNavigation],
    ["it", itNavigation],
    ["pt", ptNavigation],
  ])("should have the same keys in every locale as in french when context is navigation.", (_locale, translations) => {
    const crushedReferenceKeys = Object.keys(crush(frNavigation)).toSorted();
    const crushedTranslationKeys = Object.keys(crush(translations)).toSorted();

    expect(crushedTranslationKeys).toStrictEqual<string[]>(crushedReferenceKeys);
  });
});