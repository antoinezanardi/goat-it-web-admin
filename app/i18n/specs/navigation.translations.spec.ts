import { crush } from "radashi";
import { describe, it, expect } from "vitest";

import frNavigation from "~/i18n/locales/fr/navigation.json";
import enNavigation from "~/i18n/locales/en/navigation.json";
import deNavigation from "~/i18n/locales/de/navigation.json";
import esNavigation from "~/i18n/locales/es/navigation.json";
import itNavigation from "~/i18n/locales/it/navigation.json";
import ptNavigation from "~/i18n/locales/pt/navigation.json";

describe("navigation.json translations", () => {
  it("should have the same keys in english as in french when context is navigation.", () => {
    const crushedFrNavigationKeys = Object.keys(crush(frNavigation)).toSorted();
    const crushedEnNavigationKeys = Object.keys(crush(enNavigation)).toSorted();

    expect(crushedEnNavigationKeys).toStrictEqual(crushedFrNavigationKeys);
  });

  it("should have the same keys in english as in german when context is navigation.", () => {
    const crushedDeNavigationKeys = Object.keys(crush(deNavigation)).toSorted();
    const crushedEnNavigationKeys = Object.keys(crush(enNavigation)).toSorted();

    expect(crushedEnNavigationKeys).toStrictEqual(crushedDeNavigationKeys);
  });

  it("should have the same keys in english as in spanish when context is navigation.", () => {
    const crushedEsNavigationKeys = Object.keys(crush(esNavigation)).toSorted();
    const crushedEnNavigationKeys = Object.keys(crush(enNavigation)).toSorted();

    expect(crushedEnNavigationKeys).toStrictEqual(crushedEsNavigationKeys);
  });

  it("should have the same keys in english as in italian when context is navigation.", () => {
    const crushedItNavigationKeys = Object.keys(crush(itNavigation)).toSorted();
    const crushedEnNavigationKeys = Object.keys(crush(enNavigation)).toSorted();

    expect(crushedEnNavigationKeys).toStrictEqual(crushedItNavigationKeys);
  });

  it("should have the same keys in english as in portuguese when context is navigation.", () => {
    const crushedPtNavigationKeys = Object.keys(crush(ptNavigation)).toSorted();
    const crushedEnNavigationKeys = Object.keys(crush(enNavigation)).toSorted();

    expect(crushedEnNavigationKeys).toStrictEqual(crushedPtNavigationKeys);
  });
});