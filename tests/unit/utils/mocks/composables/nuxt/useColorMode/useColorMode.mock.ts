import { reactive } from "vue";

type UseColorModeMock = {
  preference: string;
  value: string;
  unknown: boolean;
  forced: boolean;
};

function createUseColorModeMock(initialValue = "light"): UseColorModeMock {
  const state = reactive({
    preference: initialValue,
    value: initialValue,
    unknown: false,
    forced: false,
  });

  return {
    get preference() {
      return state.preference;
    },
    set preference(preference: string) {
      state.preference = preference;
      if (!state.forced) {
        state.value = preference;
      }
    },
    get value() {
      return state.value;
    },
    set value(value: string) {
      state.value = value;
    },
    get unknown() {
      return state.unknown;
    },
    set unknown(unknown: boolean) {
      state.unknown = unknown;
    },
    get forced() {
      return state.forced;
    },
    set forced(forced: boolean) {
      state.forced = forced;
    },
  };
}

export type { UseColorModeMock };

export { createUseColorModeMock };