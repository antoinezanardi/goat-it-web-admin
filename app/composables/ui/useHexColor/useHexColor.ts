import type { ComputedRef } from "vue";

import { darkenHexColor, lightenHexColor } from "~/utils/helpers/color/color.helpers";
import { HEX_COLOR_DARKEN_AMOUNT, HEX_COLOR_DEFAULT_NEUTRAL, HEX_COLOR_LIGHTEN_AMOUNT } from "~/composables/ui/useHexColor/hex-color.constants";
import { LIGHT_COLOR_MODE } from "~/utils/constants/color/color.constants";
import type { UseHexColor } from "~/composables/ui/useHexColor/hex-color.types";

function useHexColor(color: ComputedRef<string | undefined>): UseHexColor {
  const colorMode = useColorMode();

  const adaptedColor = computed<string>(() => {
    const rawColor = color.value;

    if (rawColor === undefined) {
      return HEX_COLOR_DEFAULT_NEUTRAL;
    }

    if (colorMode.value === LIGHT_COLOR_MODE) {
      return darkenHexColor(rawColor, HEX_COLOR_DARKEN_AMOUNT);
    }
    return lightenHexColor(rawColor, HEX_COLOR_LIGHTEN_AMOUNT);
  });

  return {
    adaptedColor,
  };
}

export {
  useHexColor,
};