import { nextTick, ref } from "vue";
import type { Ref } from "vue";
import type { Composer } from "vue-i18n";
import { z } from "zod";
import { vi, beforeEach, describe, expect, it } from "vitest";

import { SLUG_REGEX_PATTERN, HEX_COLOR_REGEX_PATTERN } from "@/composables/core/zod/useZodLocale/use-zod-locale.constants";
import type {
  useZodLocale as UseZodLocaleType,
} from "@/composables/core/zod/useZodLocale/useZodLocale";
import {
  getInvalidFormatTranslation,
  isLocaleSupported,
  getCustomErrorMessage,
} from "@/composables/core/zod/useZodLocale/useZodLocale";

const SLUG_REGEX = new RegExp(SLUG_REGEX_PATTERN.slice(1, -2), "u");
const HEX_COLOR_REGEX = new RegExp(HEX_COLOR_REGEX_PATTERN.slice(1, -2), "u");

let useZodLocale: typeof UseZodLocaleType;

function createI18nMock(): Composer {
  return {
    locale: ref("en"),
    t: vi.fn<Composer["t"]>((key: string) => key),
  } as unknown as Composer;
}

describe("useZodLocale", () => {
  let i18nMock: Composer;

  beforeEach(async() => {
    i18nMock = createI18nMock();
    ({
      useZodLocale,
    } = await import("@/composables/core/zod/useZodLocale/useZodLocale"));
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

      const schema = z.string().regex(SLUG_REGEX);
      const result = schema.safeParse("INVALID SLUG!");

      expect(result.error?.issues[0]?.message).toBe("validation.invalidKebabCase");
    });

    it("should translate the hex color regex validation error to i18n key when an invalid color is validated.", () => {
      useZodLocale(i18nMock);

      const schema = z.string().regex(HEX_COLOR_REGEX);
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

    it("should fall back to the en locale error map when the current locale has no matching Zod locale.", () => {
      (i18nMock.locale as Ref<string>).value = "ja";

      useZodLocale(i18nMock);

      const schema = z.string().min(5);
      const result = schema.safeParse("ab");

      expect(result.error?.issues[0]?.message).toBeDefined();
    });
  });

  describe(getInvalidFormatTranslation, () => {
    it("should return translated slug key when issue is invalid_format with slug pattern.", () => {
      const issue: z.core.$ZodRawIssue = {
        code: "invalid_format",
        pattern: SLUG_REGEX_PATTERN,
      } as unknown as z.core.$ZodRawIssue;
      const t = vi.fn<Composer["t"]>((key: string) => key);

      const result = getInvalidFormatTranslation(issue, t as unknown as Composer["t"]);

      expect(result).toBe("validation.invalidKebabCase");
    });

    it("should return translated hex color key when issue is invalid_format with hex color pattern.", () => {
      const issue: z.core.$ZodRawIssue = {
        code: "invalid_format",
        pattern: HEX_COLOR_REGEX_PATTERN,
      } as unknown as z.core.$ZodRawIssue;
      const t = vi.fn<Composer["t"]>((key: string) => key);

      const result = getInvalidFormatTranslation(issue, t as unknown as Composer["t"]);

      expect(result).toBe("validation.invalidHexColor");
    });

    it("should return undefined without calling t when issue code is not invalid_format.", () => {
      const issue: z.core.$ZodRawIssue = {
        code: "too_small",
        pattern: SLUG_REGEX_PATTERN,
      } as unknown as z.core.$ZodRawIssue;
      const t = vi.fn<Composer["t"]>(() => "translated");

      const result = getInvalidFormatTranslation(issue, t as unknown as Composer["t"]);

      expect(result).toBeUndefined();
    });

    it("should return undefined without calling t when issue has no pattern property.", () => {
      const issue: z.core.$ZodRawIssue = {
        code: "invalid_format",
      } as unknown as z.core.$ZodRawIssue;
      const t = vi.fn<Composer["t"]>(() => "translated");

      const result = getInvalidFormatTranslation(issue, t as unknown as Composer["t"]);

      expect(result).toBeUndefined();
    });

    it("should return undefined without calling t when issue pattern is not a string.", () => {
      const patternLikeObject = { toString: (): string => SLUG_REGEX_PATTERN };
      const issue: z.core.$ZodRawIssue = {
        code: "invalid_format",
        pattern: patternLikeObject,
      } as unknown as z.core.$ZodRawIssue;
      const t = vi.fn<Composer["t"]>(() => "translated");

      const result = getInvalidFormatTranslation(issue, t as unknown as Composer["t"]);

      expect(result).toBeUndefined();
    });

    it("should return undefined without calling t when pattern does not match any known regex pattern.", () => {
      const issue: z.core.$ZodRawIssue = {
        code: "invalid_format",
        pattern: "/^unknown$/u",
      } as unknown as z.core.$ZodRawIssue;
      const t = vi.fn<Composer["t"]>(() => "translated");

      const result = getInvalidFormatTranslation(issue, t as unknown as Composer["t"]);

      expect(result).toBeUndefined();
    });
  });

  describe(getCustomErrorMessage, () => {
    it("should return translated key when issue matches a known invalid format pattern.", () => {
      const issue: z.core.$ZodRawIssue = {
        code: "invalid_format",
        pattern: SLUG_REGEX_PATTERN,
      } as unknown as z.core.$ZodRawIssue;
      const t = vi.fn<Composer["t"]>((key: string) => key);

      const result = getCustomErrorMessage(issue, t as unknown as Composer["t"]);

      expect(result).toBe("validation.invalidKebabCase");
    });

    it("should return undefined when issue does not match any known invalid format pattern.", () => {
      const issue: z.core.$ZodRawIssue = {
        code: "too_small",
      } as unknown as z.core.$ZodRawIssue;
      const t = vi.fn<Composer["t"]>((key: string) => key);

      const result = getCustomErrorMessage(issue, t as unknown as Composer["t"]);

      expect(result).toBeUndefined();
    });
  });

  describe(isLocaleSupported, () => {
    it("should return true when locale is supported.", () => {
      expect(isLocaleSupported("fr")).toBeTruthy();
    });

    it("should return false when locale is not supported.", () => {
      expect(isLocaleSupported("ja")).toBeFalsy();
    });
  });
});