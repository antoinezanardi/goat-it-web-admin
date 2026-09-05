import { crush } from "radashi";
import { describe, it, expect } from "vitest";

import frForm from "~/i18n/locales/fr/form.json";
import enForm from "~/i18n/locales/en/form.json";
import deForm from "~/i18n/locales/de/form.json";
import esForm from "~/i18n/locales/es/form.json";
import itForm from "~/i18n/locales/it/form.json";
import ptForm from "~/i18n/locales/pt/form.json";

describe("form.json translations", () => {
  it.each<[string, typeof frForm]>([
    ["de", deForm],
    ["en", enForm],
    ["es", esForm],
    ["it", itForm],
    ["pt", ptForm],
  ])("should have the same keys in every locale as in french when context is form.", (_locale, translations) => {
    const crushedReferenceKeys = Object.keys(crush(frForm)).toSorted();
    const crushedTranslationKeys = Object.keys(crush(translations)).toSorted();

    expect(crushedTranslationKeys).toStrictEqual<string[]>(crushedReferenceKeys);
  });
});