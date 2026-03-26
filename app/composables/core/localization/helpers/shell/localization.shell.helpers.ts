import type { LocalizedText, LocalizedTexts } from "@goat-it/schemas/shared/locale";

import type { Shell } from "#shared/types/object.types";

function createLocalizedTextShell(): Shell<LocalizedText> {
  return {
    en: undefined,
    fr: undefined,
    es: undefined,
    de: undefined,
    it: undefined,
    pt: undefined,
  };
}

function createLocalizedTextsShell(): Shell<LocalizedTexts> {
  return {
    en: undefined,
    fr: undefined,
    es: undefined,
    de: undefined,
    it: undefined,
    pt: undefined,
  };
}

export {
  createLocalizedTextShell,
  createLocalizedTextsShell,
};