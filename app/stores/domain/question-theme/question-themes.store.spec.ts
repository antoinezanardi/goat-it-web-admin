import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createUseAppToastMock } from "~~/tests/unit/utils/mocks/composables/ui/useAppToast/useAppToast.mock";
import type { UseAppToastMock } from "~~/tests/unit/utils/mocks/composables/ui/useAppToast/useAppToast.mock";
import { createUseAsyncActionMock } from "~~/tests/unit/utils/mocks/composables/core/useAsyncAction/useAsyncAction.mock";
import type { UseAsyncActionMock } from "~~/tests/unit/utils/mocks/composables/core/useAsyncAction/useAsyncAction.mock";
import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";

import type { useQuestionThemesStore as UseQuestionThemesStoreType } from "@/stores/domain/question-theme/question-themes.store";

let useAppToastMock: UseAppToastMock;
let useAsyncActionMock: UseAsyncActionMock;
let capturedAction: (() => Promise<QuestionTheme[]>) | undefined;
let capturedOnError: (() => void) | undefined;
const repositoryGetAllMock = vi.fn<() => Promise<QuestionTheme[]>>();

mockNuxtImport("useAppToast", () => (): UseAppToastMock => useAppToastMock);

mockNuxtImport("useAsyncAction", () => (action: unknown, onError: unknown): UseAsyncActionMock => {
  capturedAction = action as () => Promise<QuestionTheme[]>;
  capturedOnError = onError as () => void;

  return useAsyncActionMock;
});

mockNuxtImport("questionThemesRepository", () => (_fetch: unknown): { getAll: () => Promise<QuestionTheme[]> } => ({
  getAll: repositoryGetAllMock,
}));

let useQuestionThemesStore: typeof UseQuestionThemesStoreType;

describe("useQuestionThemesStore", () => {
  beforeEach(async() => {
    useAppToastMock = createUseAppToastMock();
    useAsyncActionMock = createUseAsyncActionMock();
    capturedAction = undefined;
    capturedOnError = undefined;
    setActivePinia(createPinia());
    ({ useQuestionThemesStore } = await import("@/stores/domain/question-theme/question-themes.store"));
  });

  describe("questionThemes", () => {
    it("should expose an empty array as initial state when created.", () => {
      const store = useQuestionThemesStore();

      expect(store.questionThemes).toStrictEqual<QuestionTheme[]>([]);
    });
  });

  describe("fetchQuestionThemesStatus", () => {
    it("should reflect the fetchStatus value from useAsyncAction when created.", () => {
      const store = useQuestionThemesStore();

      expect(store.fetchQuestionThemesStatus).toBe(useAsyncActionMock.fetchStatus.value);
    });

    it("should update when the fetchStatus changes to pending.", () => {
      const store = useQuestionThemesStore();
      useAsyncActionMock.fetchStatus.value = "pending";

      expect(store.fetchQuestionThemesStatus).toBe("pending");
    });
  });

  describe("isFetchingQuestionThemes", () => {
    it("should be false when fetchStatus is idle.", () => {
      const store = useQuestionThemesStore();

      expect(store.isFetchingQuestionThemes).toBeFalsy();
    });

    it("should be true when fetchStatus is pending.", () => {
      const store = useQuestionThemesStore();
      useAsyncActionMock.fetchStatus.value = "pending";

      expect(store.isFetchingQuestionThemes).toBeTruthy();
    });
  });

  describe("isFetchQuestionThemesSuccess", () => {
    it("should be false when fetchStatus is idle.", () => {
      const store = useQuestionThemesStore();

      expect(store.isFetchQuestionThemesSuccess).toBeFalsy();
    });

    it("should be true when fetchStatus is success.", () => {
      const store = useQuestionThemesStore();
      useAsyncActionMock.fetchStatus.value = "success";

      expect(store.isFetchQuestionThemesSuccess).toBeTruthy();
    });
  });

  describe("isFetchingQuestionThemesError", () => {
    it("should be false when fetchStatus is idle.", () => {
      const store = useQuestionThemesStore();

      expect(store.isFetchingQuestionThemesError).toBeFalsy();
    });

    it("should be true when fetchStatus is error.", () => {
      const store = useQuestionThemesStore();
      useAsyncActionMock.fetchStatus.value = "error";

      expect(store.isFetchingQuestionThemesError).toBeTruthy();
    });
  });

  describe("fetchQuestionThemes", () => {
    it("should call the execute function from useAsyncAction when invoked.", async() => {
      const store = useQuestionThemesStore();

      await store.fetchQuestionThemes();

      expect(useAsyncActionMock.execute).toHaveBeenCalledExactlyOnceWith();
    });
  });

  describe("fetchAndStoreQuestionThemes", () => {
    it("should call fetchQuestionThemes when called.", async() => {
      const store = useQuestionThemesStore();

      await store.fetchAndStoreQuestionThemes();

      expect(useAsyncActionMock.execute).toHaveBeenCalledExactlyOnceWith();
    });

    it("should update questionThemes with the fetched themes when fetchQuestionThemes resolves with data.", async() => {
      const fakeQuestionThemes: QuestionTheme[] = [
        createFakeQuestionTheme(),
        createFakeQuestionTheme(),
      ];
      const store = useQuestionThemesStore();
      useAsyncActionMock.execute.mockResolvedValue(fakeQuestionThemes);

      await store.fetchAndStoreQuestionThemes();

      expect(store.questionThemes).toStrictEqual<QuestionTheme[]>(fakeQuestionThemes);
    });

    it("should not update questionThemes when fetchQuestionThemes resolves with undefined.", async() => {
      const store = useQuestionThemesStore();

      await store.fetchAndStoreQuestionThemes();

      expect(store.questionThemes).toStrictEqual<QuestionTheme[]>([]);
    });
  });

  describe("useAsyncAction setup", () => {
    it("should pass the repository getAll function as action to useAsyncAction when created.", () => {
      useQuestionThemesStore();

      expect(capturedAction).toBe(repositoryGetAllMock);
    });

    it("should call addErrorToast with the questionThemes.cantFetch translation key when the error callback is invoked.", () => {
      useQuestionThemesStore();

      capturedOnError?.();

      expect(useAppToastMock.addErrorToast).toHaveBeenCalledExactlyOnceWith({
        description: "questionThemes.cantFetch",
      });
    });
  });
});