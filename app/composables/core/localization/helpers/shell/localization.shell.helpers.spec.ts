import type { LocalizedText, LocalizedTexts } from "@goat-it/schemas/shared/locale";
import { describe, expect, it } from "vitest";

import type { Shell } from "#shared/types/object.types";
import { createLocalizedTextShell, createLocalizedTextsShell, isLocalizedTextShellEmpty } from "~/composables/core/localization/helpers/shell/localization.shell.helpers";

describe("Localization Shell Helpers", () => {
  describe(createLocalizedTextShell, () => {
    it("should return a shell with all locales set to undefined when called.", () => {
      const result = createLocalizedTextShell();

      expect(result).toStrictEqual<Shell<LocalizedText>>({
        en: undefined,
        fr: undefined,
        es: undefined,
        de: undefined,
        it: undefined,
        pt: undefined,
      });
    });
  });

  describe(createLocalizedTextsShell, () => {
    it("should return a shell with all locales set to undefined when called.", () => {
      const result = createLocalizedTextsShell();

      expect(result).toStrictEqual<Shell<LocalizedTexts>>({
        en: undefined,
        fr: undefined,
        es: undefined,
        de: undefined,
        it: undefined,
        pt: undefined,
      });
    });
  });

  describe(isLocalizedTextShellEmpty, () => {
    it("should return true when shell is undefined.", () => {
      expect(isLocalizedTextShellEmpty(undefined)).toBe(true);
    });

    it("should return true when all locale values are undefined.", () => {
      const shell = createLocalizedTextShell();

      expect(isLocalizedTextShellEmpty(shell)).toBe(true);
    });

    it("should return false when at least one locale value is defined.", () => {
      const shell = createLocalizedTextShell();
      shell.en = "Hello";

      expect(isLocalizedTextShellEmpty(shell)).toBe(false);
    });
  });
});