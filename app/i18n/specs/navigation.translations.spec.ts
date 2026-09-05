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

  it("should have the same keys in french as in german when context is navigation.", () => {
    const crushedFrNavigationKeys = Object.keys(crush(frNavigation)).toSorted();
    const crushedDeNavigationKeys = Object.keys(crush(deNavigation)).toSorted();

    expect(crushedFrNavigationKeys).toStrictEqual(crushedDeNavigationKeys);
  });

  it("should have the same keys in french as in spanish when context is navigation.", () => {
    const crushedFrNavigationKeys = Object.keys(crush(frNavigation)).toSorted();
    const crushedEsNavigationKeys = Object.keys(crush(esNavigation)).toSorted();

    expect(crushedFrNavigationKeys).toStrictEqual(crushedEsNavigationKeys);
  });

  it("should have the same keys in french as in italian when context is navigation.", () => {
    const crushedFrNavigationKeys = Object.keys(crush(frNavigation)).toSorted();
    const crushedItNavigationKeys = Object.keys(crush(itNavigation)).toSorted();

    expect(crushedFrNavigationKeys).toStrictEqual(crushedItNavigationKeys);
  });

  it("should have the same keys in french as in portuguese when context is navigation.", () => {
    const crushedFrNavigationKeys = Object.keys(crush(frNavigation)).toSorted();
    const crushedPtNavigationKeys = Object.keys(crush(ptNavigation)).toSorted();

    expect(crushedFrNavigationKeys).toStrictEqual(crushedPtNavigationKeys);
  });
});