import { LOCALES } from "@goat-it/schemas/shared/locale";
import type { LocalizedText, LocalizedTexts } from "@goat-it/schemas/shared/locale";

import type { Shell } from "#shared/types/object.types";

function createLocalizedTextShell(): Shell<LocalizedText> {
  return LOCALES.reduce((agg, locale) => {
    agg[locale] = undefined;

    return agg;
    // Acceptable as we are sure that LOCALES are key of LocalizedText
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  }, {} as Shell<LocalizedText>);
}

function createLocalizedTextsShell(): Shell<LocalizedTexts> {
  return LOCALES.reduce((agg, locale: keyof LocalizedTexts) => {
    agg[locale] = undefined;

    return agg;
    // Acceptable as we are sure that LOCALES are key of LocalizedTexts
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  }, {} as Shell<LocalizedTexts>);
}

export {
  createLocalizedTextShell,
  createLocalizedTextsShell,
};