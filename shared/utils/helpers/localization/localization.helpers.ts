import type { Locale, LocalizedText, LocalizedTexts } from "@goat-it/schemas/shared/locale";

import { isNonEmptyString } from "#shared/utils/helpers/string/string.helpers";

function isLocalizedValueMissing(field: Partial<LocalizedText> | Partial<LocalizedTexts>, locale: Locale): boolean {
  const value = field[locale];

  if (Array.isArray(value)) {
    return value.map(item => item.trim()).filter(Boolean).length === 0;
  }
  return !isNonEmptyString(value?.trim());
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
  const trimmedValues = values.map(value => value.trim()).filter(Boolean);

  if (trimmedValues.length === 0) {
    return undefined;
  }
  return trimmedValues.join(", ");
}

export { isLocalizedValueMissing, getLocalizedDisplayValue, getLocalizedTextsDisplayValue };