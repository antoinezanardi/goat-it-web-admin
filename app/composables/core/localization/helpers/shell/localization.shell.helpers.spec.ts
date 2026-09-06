import type { LocalizedText, LocalizedTexts } from "@goat-it/schemas/shared/locale";
import { describe, expect, it } from "vitest";

import type { Shell } from "#shared/types/object.types";
import { createLocalizedTextShell, createLocalizedTextsShell } from "@/composables/core/localization/helpers/shell/localization.shell.helpers";

describe(createLocalizedTextShell, () => {
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
});