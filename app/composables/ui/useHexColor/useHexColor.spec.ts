import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { beforeEach, describe, expect, it } from "vitest";

import { createUseColorModeMock } from "~~/tests/unit/utils/mocks/composables/nuxt/useColorMode/useColorMode.mock";
import type { UseColorModeMock } from "~~/tests/unit/utils/mocks/composables/nuxt/useColorMode/useColorMode.mock";

import type { useHexColor as UseHexColorType } from "~/composables/ui/useHexColor/useHexColor";
import { HEX_COLOR_DEFAULT_NEUTRAL } from "~/composables/ui/useHexColor/hex-color.constants";

let useColorModeMock: UseColorModeMock;
let useHexColor: typeof UseHexColorType;

mockNuxtImport("useColorMode", () => (): UseColorModeMock => useColorModeMock);

describe("useHexColor", () => {
  beforeEach(async() => {
    useColorModeMock = createUseColorModeMock("light");

    ({ useHexColor } = await import("~/composables/ui/useHexColor/useHexColor"));
  });

  describe("adaptedColor", () => {
    it("should return a darkened color when color is defined and mode is light.", () => {
      const color = computed<string | undefined>(() => "#FF0000");
      const { adaptedColor } = useHexColor(color);

      expect(adaptedColor.value).toBe("#cc0000");
    });

    it("should return a lightened color when color is defined and mode is dark.", () => {
      useColorModeMock.preference = "dark";
      const color = computed<string | undefined>(() => "#FF0000");
      const { adaptedColor } = useHexColor(color);

      expect(adaptedColor.value).toBe("#ff3333");
    });

    it("should return the default neutral color when color is undefined.", () => {
      const color = computed<string | undefined>(() => undefined);
      const { adaptedColor } = useHexColor(color);

      expect(adaptedColor.value).toBe(HEX_COLOR_DEFAULT_NEUTRAL);
    });
  });
});