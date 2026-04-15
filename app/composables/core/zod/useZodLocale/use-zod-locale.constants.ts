import { z } from "zod";

const SLUG_REGEX_PATTERN = String.raw`/^[\da-z]+(?:-[\da-z]+)*$/u`;

const HEX_COLOR_REGEX_PATTERN = String.raw`/^#[\dA-Fa-f]{6}$/u`;

const INVALID_FORMAT_PATTERN_TO_I18N_KEY_MAP = {
  [SLUG_REGEX_PATTERN]: "validation.invalidKebabCase",
  [HEX_COLOR_REGEX_PATTERN]: "validation.invalidHexColor",
} as const;

const ZOD_LOCALE_MAP = {
  fr: z.locales.fr,
  en: z.locales.en,
} as const;

export { INVALID_FORMAT_PATTERN_TO_I18N_KEY_MAP, SLUG_REGEX_PATTERN, HEX_COLOR_REGEX_PATTERN, ZOD_LOCALE_MAP };