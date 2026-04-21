import { crush } from "radashi";
import { describe, it, expect } from "vitest";

import frValidation from "~/i18n/locales/fr/validation.json";
import enValidation from "~/i18n/locales/en/validation.json";
import deValidation from "~/i18n/locales/de/validation.json";
import esValidation from "~/i18n/locales/es/validation.json";
import itValidation from "~/i18n/locales/it/validation.json";
import ptValidation from "~/i18n/locales/pt/validation.json";

describe("validation.json translations", () => {
  it("should have the same keys in english as in french when context is validation.", () => {
    const crushedFrValidationKeys = Object.keys(crush(frValidation)).toSorted();
    const crushedEnValidationKeys = Object.keys(crush(enValidation)).toSorted();

    expect(crushedEnValidationKeys).toStrictEqual(crushedFrValidationKeys);
  });

  it("should have the same keys in english as in german when context is validation.", () => {
    const crushedDeValidationKeys = Object.keys(crush(deValidation)).toSorted();
    const crushedEnValidationKeys = Object.keys(crush(enValidation)).toSorted();

    expect(crushedEnValidationKeys).toStrictEqual(crushedDeValidationKeys);
  });

  it("should have the same keys in english as in spanish when context is validation.", () => {
    const crushedEsValidationKeys = Object.keys(crush(esValidation)).toSorted();
    const crushedEnValidationKeys = Object.keys(crush(enValidation)).toSorted();

    expect(crushedEnValidationKeys).toStrictEqual(crushedEsValidationKeys);
  });

  it("should have the same keys in english as in italian when context is validation.", () => {
    const crushedItValidationKeys = Object.keys(crush(itValidation)).toSorted();
    const crushedEnValidationKeys = Object.keys(crush(enValidation)).toSorted();

    expect(crushedEnValidationKeys).toStrictEqual(crushedItValidationKeys);
  });

  it("should have the same keys in english as in portuguese when context is validation.", () => {
    const crushedPtValidationKeys = Object.keys(crush(ptValidation)).toSorted();
    const crushedEnValidationKeys = Object.keys(crush(enValidation)).toSorted();

    expect(crushedEnValidationKeys).toStrictEqual(crushedPtValidationKeys);
  });
});