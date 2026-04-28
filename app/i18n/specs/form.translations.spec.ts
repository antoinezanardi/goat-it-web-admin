import { crush } from "radashi";
import { describe, it, expect } from "vitest";

import frForm from "~/i18n/locales/fr/form.json";
import enForm from "~/i18n/locales/en/form.json";
import deForm from "~/i18n/locales/de/form.json";
import esForm from "~/i18n/locales/es/form.json";
import itForm from "~/i18n/locales/it/form.json";
import ptForm from "~/i18n/locales/pt/form.json";

describe("form.json translations", () => {
  it("should have the same keys in english as in french when context is form.", () => {
    const crushedFrFormKeys = Object.keys(crush(frForm)).toSorted();
    const crushedEnFormKeys = Object.keys(crush(enForm)).toSorted();

    expect(crushedEnFormKeys).toStrictEqual(crushedFrFormKeys);
  });

  it("should have the same keys in english as in german when context is form.", () => {
    const crushedDeFormKeys = Object.keys(crush(deForm)).toSorted();
    const crushedEnFormKeys = Object.keys(crush(enForm)).toSorted();

    expect(crushedEnFormKeys).toStrictEqual(crushedDeFormKeys);
  });

  it("should have the same keys in english as in spanish when context is form.", () => {
    const crushedEsFormKeys = Object.keys(crush(esForm)).toSorted();
    const crushedEnFormKeys = Object.keys(crush(enForm)).toSorted();

    expect(crushedEnFormKeys).toStrictEqual(crushedEsFormKeys);
  });

  it("should have the same keys in english as in italian when context is form.", () => {
    const crushedItFormKeys = Object.keys(crush(itForm)).toSorted();
    const crushedEnFormKeys = Object.keys(crush(enForm)).toSorted();

    expect(crushedEnFormKeys).toStrictEqual(crushedItFormKeys);
  });

  it("should have the same keys in english as in portuguese when context is form.", () => {
    const crushedPtFormKeys = Object.keys(crush(ptForm)).toSorted();
    const crushedEnFormKeys = Object.keys(crush(enForm)).toSorted();

    expect(crushedEnFormKeys).toStrictEqual(crushedPtFormKeys);
  });
});