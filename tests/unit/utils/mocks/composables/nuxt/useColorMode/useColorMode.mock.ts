import { ref } from "vue";
import type { Ref } from "vue";

type UseColorModeMock = {
  value: Ref<string>["value"];
};

function createUseColorModeMock(initialValue = "light"): UseColorModeMock {
  const colorModeReference = ref(initialValue);

  return {
    get value() {
      return colorModeReference.value;
    },
    set value(updatedValue: string) {
      colorModeReference.value = updatedValue;
    },
  };
}

export type { UseColorModeMock };

export { createUseColorModeMock };