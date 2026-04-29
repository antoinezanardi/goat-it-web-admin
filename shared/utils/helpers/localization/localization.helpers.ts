import type { Locale, LocalizedText, LocalizedTexts } from "@goat-it/schemas/shared/locale";

import { isNonEmptyString } from "#shared/utils/helpers/string/string.helpers";

function isLocalizedValueMissing(field: Partial<LocalizedText>, locale: Locale): boolean {
  return !isNonEmptyString(field[locale]?.trim());
}

function getLocalizedDisplayValue(field: Partial<LocalizedText>, locale: Locale): string | undefined {
  const value = field[locale]?.trim();

  if (!isNonEmptyString(value)) {
    return undefined;
  }
  return value;
}

function getLocalizedTextsDisplayValue(field: Partial<LocalizedTexts>, locale: Locale): string | undefined {
  const values = field[locale];

  if (!values || values.length === 0) {
    return undefined;
  }
  return values.join(", ");
}

export { isLocalizedValueMissing, getLocalizedDisplayValue, getLocalizedTextsDisplayValue };