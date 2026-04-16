import type { RgbColor } from "~/utils/helpers/color/color.helpers.types";
import {
  HEX_BLUE_END_INDEX,
  HEX_BLUE_START_INDEX,
  HEX_GREEN_END_INDEX,
  HEX_GREEN_START_INDEX,
  HEX_PAD_LENGTH,
  HEX_RADIX,
  HEX_RED_END_INDEX,
  HEX_RED_START_INDEX,
  MAX_RGB_VALUE,
} from "~/utils/helpers/color/color.helpers.constants";

function toHex(value: number): string {
  return Math.round(value).toString(HEX_RADIX).padStart(HEX_PAD_LENGTH, "0");
}

function parseHexToRgb(hex: string): RgbColor {
  const sanitized = hex.replace("#", "");

  return {
    red: Number.parseInt(sanitized.slice(HEX_RED_START_INDEX, HEX_RED_END_INDEX), HEX_RADIX),
    green: Number.parseInt(sanitized.slice(HEX_GREEN_START_INDEX, HEX_GREEN_END_INDEX), HEX_RADIX),
    blue: Number.parseInt(sanitized.slice(HEX_BLUE_START_INDEX, HEX_BLUE_END_INDEX), HEX_RADIX),
  };
}

function rgbToHex(red: number, green: number, blue: number): string {
  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

function darkenHexColor(hex: string, amount: number): string {
  const { red, green, blue } = parseHexToRgb(hex);
  const factor = 1 - amount;

  return rgbToHex(
    red * factor,
    green * factor,
    blue * factor,
  );
}

function lightenHexColor(hex: string, amount: number): string {
  const { red, green, blue } = parseHexToRgb(hex);

  return rgbToHex(
    red + (MAX_RGB_VALUE - red) * amount,
    green + (MAX_RGB_VALUE - green) * amount,
    blue + (MAX_RGB_VALUE - blue) * amount,
  );
}

export {
  darkenHexColor,
  lightenHexColor,
  parseHexToRgb,
  rgbToHex,
  toHex,
};