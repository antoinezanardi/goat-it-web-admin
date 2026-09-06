import { describe, expect, it } from "vitest";

import type { RgbColor } from "~/utils/helpers/color/color.helpers.types";
import { darkenHexColor, lightenHexColor, parseHexToRgb, rgbToHex, toHex } from "~/utils/helpers/color/color.helpers";

describe(toHex, () => {
  describe(toHex, () => {
    it.each<{ value: number; expected: string }>([
      { value: 0, expected: "00" },
      { value: 255, expected: "ff" },
      { value: 128, expected: "80" },
      { value: 15, expected: "0f" },
      { value: 204.4, expected: "cc" },
      { value: -10, expected: "00" },
      { value: 300, expected: "ff" },
    ])("should return $expected when value is $value.", ({ value, expected }) => {
      expect(toHex(value)).toBe(expected);
    });
  });

  describe(parseHexToRgb, () => {
    it.each<{ hex: string }>([
      { hex: "ZZZZZZ" },
      { hex: "#GG0000" },
      { hex: "12" },
      { hex: "" },
    ])("should throw an error when hex is $hex.", ({ hex }) => {
      expect(() => parseHexToRgb(hex)).toThrow(`Invalid hex color: ${hex}`);
    });

    it.each<{ hex: string; expected: RgbColor }>([
      { hex: "#FF0000", expected: { red: 255, green: 0, blue: 0 } },
      { hex: "#00FF00", expected: { red: 0, green: 255, blue: 0 } },
      { hex: "#0000FF", expected: { red: 0, green: 0, blue: 255 } },
      { hex: "#000000", expected: { red: 0, green: 0, blue: 0 } },
      { hex: "#FFFFFF", expected: { red: 255, green: 255, blue: 255 } },
      { hex: "FF5733", expected: { red: 255, green: 87, blue: 51 } },
    ])("should return $expected when hex is $hex.", ({ hex, expected }) => {
      expect(parseHexToRgb(hex)).toStrictEqual(expected);
    });
  });

  describe(rgbToHex, () => {
    it.each<{ red: number; green: number; blue: number; expected: string }>([
      { red: 255, green: 0, blue: 0, expected: "#ff0000" },
      { red: 0, green: 255, blue: 0, expected: "#00ff00" },
      { red: 0, green: 0, blue: 255, expected: "#0000ff" },
      { red: 0, green: 0, blue: 0, expected: "#000000" },
      { red: 255, green: 255, blue: 255, expected: "#ffffff" },
    ])("should return $expected when rgb is ($red, $green, $blue).", ({ red, green, blue, expected }) => {
      expect(rgbToHex(red, green, blue)).toBe(expected);
    });
  });

  describe(darkenHexColor, () => {
    it.each<{ hex: string; amount: number; expected: string }>([
      { hex: "#FF0000", amount: 0.2, expected: "#cc0000" },
      { hex: "#0a0a0a", amount: 0.95, expected: "#010101" },
      { hex: "#FF5733", amount: 0, expected: "#ff5733" },
      { hex: "#FFFFFF", amount: 0.2, expected: "#cccccc" },
    ])("should return $expected when darkening $hex by $amount.", ({ hex, amount, expected }) => {
      expect(darkenHexColor(hex, amount)).toBe(expected);
    });
  });

  describe(lightenHexColor, () => {
    it.each<{ hex: string; amount: number; expected: string }>([
      { hex: "#000000", amount: 0.2, expected: "#333333" },
      { hex: "#f0f0f0", amount: 0.95, expected: "#fefefe" },
      { hex: "#FF5733", amount: 0, expected: "#ff5733" },
      { hex: "#000000", amount: 0.5, expected: "#808080" },
    ])("should return $expected when lightening $hex by $amount.", ({ hex, amount, expected }) => {
      expect(lightenHexColor(hex, amount)).toBe(expected);
    });
  });
});