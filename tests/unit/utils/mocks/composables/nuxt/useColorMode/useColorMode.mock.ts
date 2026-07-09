import { computed, ref } from "vue";
import type { ComputedRef, Ref } from "vue";

type UseColorModeMock = {
  preference: string;
  readonly value: string;
  unknown: boolean;
  forced: boolean;
};

function createUseColorModeMock(initialValue = "light"): UseColorModeMock {
  const preference: Ref<string> = ref(initialValue);
  const value: ComputedRef<string> = computed(() => (preference.value === "system" ? "light" : preference.value));

  return {
    get preference() {
      return preference.value;
    },
    set preference(updatedValue: string) {
      preference.value = updatedValue;
    },
    get value() {
      return value.value;
    },
    unknown: false,
    forced: false,
  };
}

export type { UseColorModeMock };

export { createUseColorModeMock };