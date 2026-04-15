import { nextTick, ref } from "vue";
import { z } from "zod";
import { vi, beforeEach, describe, expect, it } from "vitest";

import type { useZodLocale as UseZodLocaleType, ZodLocaleI18n } from "@/composables/core/zod/useZodLocale/useZodLocale";

const SLUG_REGEX_PATTERN = String.raw`^[\da-z]+(?:-[\da-z]+)*$`;
const HEX_COLOR_REGEX_PATTERN = String.raw`^#[\dA-Fa-f]{6}$`;

let useZodLocale: typeof UseZodLocaleType;

function createI18nMock(): ZodLocaleI18n {
  return {
    locale: ref("en"),
    t: vi.fn<ZodLocaleI18n["t"]>((key: string) => key),
  };
}

describe("useZodLocale", () => {
  let i18nMock: ZodLocaleI18n;

  beforeEach(async() => {
    i18nMock = createI18nMock();
    ({ useZodLocale } = await import("@/composables/core/zod/useZodLocale/useZodLocale"));
  });

  describe("Zod locale configuration", () => {
    it("should configure Zod with a locale error map function when called.", () => {
      useZodLocale(i18nMock);

      expect(z.config().localeError).toBeTypeOf("function");
    });

    it("should configure Zod with a custom error function when called.", () => {
      useZodLocale(i18nMock);

      expect(z.config().customError).toBeTypeOf("function");
    });

    it("should reconfigure Zod locale error map when locale changes.", async() => {
      useZodLocale(i18nMock);

      const localeErrorBeforeChange = z.config().localeError;

      i18nMock.locale.value = "fr";
      await nextTick();

      expect(z.config().localeError).not.toBe(localeErrorBeforeChange);
    });
  });

  describe("Custom error translations", () => {
    it("should translate the slug regex validation error to i18n key when an invalid slug is validated.", () => {
      useZodLocale(i18nMock);

      const schema = z.string().regex(new RegExp(SLUG_REGEX_PATTERN, "u"));
      const result = schema.safeParse("INVALID SLUG!");

      expect(result.error?.issues[0]?.message).toBe("validation.invalidKebabCase");
    });

    it("should translate the hex color regex validation error to i18n key when an invalid color is validated.", () => {
      useZodLocale(i18nMock);

      const schema = z.string().regex(new RegExp(HEX_COLOR_REGEX_PATTERN, "u"));
      const result = schema.safeParse("not-a-color");

      expect(result.error?.issues[0]?.message).toBe("validation.invalidHexColor");
    });

    it("should not translate to any custom validation key when a min length error is triggered.", () => {
      useZodLocale(i18nMock);

      const schema = z.string().min(5);
      const result = schema.safeParse("ab");
      const customKeys = ["validation.atLeastOneLocaleRequired", "validation.invalidKebabCase", "validation.invalidHexColor"];

      expect(customKeys).not.toContain(result.error?.issues[0]?.message);
    });

    it("should not translate to slug validation key when regex pattern does not match slug.", () => {
      useZodLocale(i18nMock);

      const schema = z.string().regex(/^[A-Z]+$/u);
      const result = schema.safeParse("lowercase");

      expect(result.error?.issues[0]?.message).not.toBe("validation.invalidKebabCase");
    });

    it("should not translate to hex color validation key when regex pattern does not match hex color.", () => {
      useZodLocale(i18nMock);

      const schema = z.string().regex(/^[A-Z]+$/u);
      const result = schema.safeParse("lowercase");

      expect(result.error?.issues[0]?.message).not.toBe("validation.invalidHexColor");
    });

    it("should fall back to the en locale error map when the current locale has no matching Zod locale.", async() => {
      i18nMock.locale.value = "ja";
      await nextTick();

      useZodLocale(i18nMock);

      const schema = z.string().min(5);
      const result = schema.safeParse("ab");

      expect(result.error?.issues[0]?.message).toBeDefined();
    });
  });
});