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

  it("should have the same keys in french as in german when context is validation.", () => {
    const crushedFrValidationKeys = Object.keys(crush(frValidation)).toSorted();
    const crushedDeValidationKeys = Object.keys(crush(deValidation)).toSorted();

    expect(crushedDeValidationKeys).toStrictEqual(crushedFrValidationKeys);
  });

  it("should have the same keys in french as in spanish when context is validation.", () => {
    const crushedFrValidationKeys = Object.keys(crush(frValidation)).toSorted();
    const crushedEsValidationKeys = Object.keys(crush(esValidation)).toSorted();

    expect(crushedEsValidationKeys).toStrictEqual(crushedFrValidationKeys);
  });

  it("should have the same keys in french as in italian when context is validation.", () => {
    const crushedFrValidationKeys = Object.keys(crush(frValidation)).toSorted();
    const crushedItValidationKeys = Object.keys(crush(itValidation)).toSorted();

    expect(crushedItValidationKeys).toStrictEqual(crushedFrValidationKeys);
  });

  it("should have the same keys in french as in portuguese when context is validation.", () => {
    const crushedFrValidationKeys = Object.keys(crush(frValidation)).toSorted();
    const crushedPtValidationKeys = Object.keys(crush(ptValidation)).toSorted();

    expect(crushedPtValidationKeys).toStrictEqual(crushedFrValidationKeys);
  });
});