import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import type { vi } from "vitest";
import { beforeEach, describe, expect, it } from "vitest";

import { createUseAsyncActionMock } from "~~/tests/unit/utils/mocks/composables/core/useAsyncAction/useAsyncAction.mock";
import type { UseAsyncActionMock } from "~~/tests/unit/utils/mocks/composables/core/useAsyncAction/useAsyncAction.mock";
import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";

import type { useQuestionThemesStore as UseQuestionThemesStoreType } from "@/stores/domain/question-theme/question-themes.store";

let fetchAsyncActionMock: UseAsyncActionMock;
let createAsyncActionMock: UseAsyncActionMock;
let capturedFetchAction: (() => Promise<QuestionTheme[]>) | undefined;
let capturedFetchOnError: (() => void) | undefined;
let capturedCreateAction: ((creationDto: unknown) => Promise<QuestionTheme>) | undefined;
let capturedCreateOnError: (() => void) | undefined;

let useAsyncActionCallCount = 0;

mockNuxtImport("useAsyncAction", () => (action: unknown, onError: unknown): UseAsyncActionMock => {
  useAsyncActionCallCount++;
  if (useAsyncActionCallCount === 1) {
    capturedFetchAction = action as () => Promise<QuestionTheme[]>;
    capturedFetchOnError = onError as () => void;
    fetchAsyncActionMock = createUseAsyncActionMock();

    return fetchAsyncActionMock;
  }

  capturedCreateAction = action as (creationDto: unknown) => Promise<QuestionTheme>;
  capturedCreateOnError = onError as () => void;
  createAsyncActionMock = createUseAsyncActionMock();

  return createAsyncActionMock;
});

let useQuestionThemesStore: typeof UseQuestionThemesStoreType;

describe("useQuestionThemesStore", () => {
  beforeEach(async() => {
    useAsyncActionCallCount = 0;
    capturedFetchAction = undefined;
    capturedFetchOnError = undefined;
    capturedCreateAction = undefined;
    capturedCreateOnError = undefined;
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

      expect(store.fetchQuestionThemesStatus).toBe(fetchAsyncActionMock.fetchStatus.value);
    });

    it("should update when the fetchStatus changes to pending.", () => {
      const store = useQuestionThemesStore();
      fetchAsyncActionMock.fetchStatus.value = "pending";

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
      fetchAsyncActionMock.fetchStatus.value = "pending";

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
      fetchAsyncActionMock.fetchStatus.value = "success";

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
      fetchAsyncActionMock.fetchStatus.value = "error";

      expect(store.isFetchingQuestionThemesError).toBeTruthy();
    });
  });

  describe("fetchQuestionThemes", () => {
    it("should call the execute function from useAsyncAction when invoked.", async() => {
      const store = useQuestionThemesStore();

      await store.fetchQuestionThemes();

      expect(fetchAsyncActionMock.execute).toHaveBeenCalledExactlyOnceWith();
    });
  });

  describe("fetchAndStoreQuestionThemes", () => {
    it("should call fetchQuestionThemes when called.", async() => {
      const store = useQuestionThemesStore();

      await store.fetchAndStoreQuestionThemes();

      expect(fetchAsyncActionMock.execute).toHaveBeenCalledExactlyOnceWith();
    });

    it("should update questionThemes with the fetched themes when fetchQuestionThemes resolves with data.", async() => {
      const fakeQuestionThemes: QuestionTheme[] = [
        createFakeQuestionTheme(),
        createFakeQuestionTheme(),
      ];
      const store = useQuestionThemesStore();
      fetchAsyncActionMock.execute.mockResolvedValue(fakeQuestionThemes);

      await store.fetchAndStoreQuestionThemes();

      expect(store.questionThemes).toStrictEqual<QuestionTheme[]>(fakeQuestionThemes);
    });

    it("should not update questionThemes when fetchQuestionThemes resolves with undefined.", async() => {
      const store = useQuestionThemesStore();

      await store.fetchAndStoreQuestionThemes();

      expect(store.questionThemes).toStrictEqual<QuestionTheme[]>([]);
    });
  });

  describe("createQuestionThemeStatus", () => {
    it("should reflect the fetchStatus value from useAsyncAction when created.", () => {
      const store = useQuestionThemesStore();

      expect(store.createQuestionThemeStatus).toBe(createAsyncActionMock.fetchStatus.value);
    });

    it("should update when the fetchStatus changes to pending.", () => {
      const store = useQuestionThemesStore();
      createAsyncActionMock.fetchStatus.value = "pending";

      expect(store.createQuestionThemeStatus).toBe("pending");
    });
  });

  describe("isCreatingQuestionTheme", () => {
    it("should be false when createStatus is idle.", () => {
      const store = useQuestionThemesStore();

      expect(store.isCreatingQuestionTheme).toBeFalsy();
    });

    it("should be true when createStatus is pending.", () => {
      const store = useQuestionThemesStore();
      createAsyncActionMock.fetchStatus.value = "pending";

      expect(store.isCreatingQuestionTheme).toBeTruthy();
    });
  });

  describe("isCreateQuestionThemeSuccess", () => {
    it("should be false when createStatus is idle.", () => {
      const store = useQuestionThemesStore();

      expect(store.isCreateQuestionThemeSuccess).toBeFalsy();
    });

    it("should be true when createStatus is success.", () => {
      const store = useQuestionThemesStore();
      createAsyncActionMock.fetchStatus.value = "success";

      expect(store.isCreateQuestionThemeSuccess).toBeTruthy();
    });
  });

  describe("isCreatingQuestionThemeError", () => {
    it("should be false when createStatus is idle.", () => {
      const store = useQuestionThemesStore();

      expect(store.isCreatingQuestionThemeError).toBeFalsy();
    });

    it("should be true when createStatus is error.", () => {
      const store = useQuestionThemesStore();
      createAsyncActionMock.fetchStatus.value = "error";

      expect(store.isCreatingQuestionThemeError).toBeTruthy();
    });
  });

  describe("createAndStoreQuestionTheme", () => {
    it("should call the create execute function with the creation dto when invoked.", async() => {
      const store = useQuestionThemesStore();
      const fakeCreationDto = {
        slug: "my-slug",
        label: { en: "My Label", fr: undefined, es: undefined, de: undefined, it: undefined, pt: undefined },
        description: { en: "My Description", fr: undefined, es: undefined, de: undefined, it: undefined, pt: undefined },
        aliases: { en: undefined, fr: undefined, es: undefined, de: undefined, it: undefined, pt: undefined },
      };

      await store.createAndStoreQuestionTheme(fakeCreationDto as QuestionTheme);

      expect(createAsyncActionMock.execute).toHaveBeenCalledExactlyOnceWith(fakeCreationDto);
    });

    it("should unshift the created theme and add success toast when creation resolves with a theme.", async() => {
      const fakeCreatedTheme = createFakeQuestionTheme();
      const store = useQuestionThemesStore();
      createAsyncActionMock.execute.mockResolvedValue(fakeCreatedTheme);
      const fakeCreationDto = {
        slug: "my-slug",
        label: { en: "My Label", fr: undefined, es: undefined, de: undefined, it: undefined, pt: undefined },
        description: { en: "My Description", fr: undefined, es: undefined, de: undefined, it: undefined, pt: undefined },
        aliases: { en: undefined, fr: undefined, es: undefined, de: undefined, it: undefined, pt: undefined },
      };

      await store.createAndStoreQuestionTheme(fakeCreationDto as QuestionTheme);

      expect(store.questionThemes).toStrictEqual<QuestionTheme[]>([fakeCreatedTheme]);
      expect(useAppToast().addSuccessToast).toHaveBeenCalledExactlyOnceWith({
        description: "questionThemes.createSuccessfully",
      });
    });

    it("should not update questionThemes when creation resolves with undefined.", async() => {
      const store = useQuestionThemesStore();
      const fakeCreationDto = {
        slug: "my-slug",
        label: { en: "My Label", fr: undefined, es: undefined, de: undefined, it: undefined, pt: undefined },
        description: { en: "My Description", fr: undefined, es: undefined, de: undefined, it: undefined, pt: undefined },
        aliases: { en: undefined, fr: undefined, es: undefined, de: undefined, it: undefined, pt: undefined },
      };

      await store.createAndStoreQuestionTheme(fakeCreationDto as QuestionTheme);

      expect(store.questionThemes).toStrictEqual<QuestionTheme[]>([]);
    });
  });

  describe("useAsyncAction setup for fetch", () => {
    it("should pass the repository getAll function as action to useAsyncAction when created.", () => {
      useQuestionThemesStore();

      expect(capturedFetchAction).toBe(questionThemesRepository($fetch).getAll);
    });

    it("should call addErrorToast with the questionThemes.cantFetch translation key when the fetch error callback is invoked.", () => {
      useQuestionThemesStore();

      capturedFetchOnError?.();

      expect(useAppToast().addErrorToast).toHaveBeenCalledExactlyOnceWith({
        description: "questionThemes.cantFetch",
      });
    });
  });

  describe("useAsyncAction setup for create", () => {
    it("should pass an async function wrapping repository.create as action to useAsyncAction when created.", async() => {
      const fakeTheme = createFakeQuestionTheme();
      useQuestionThemesStore();
      const mockCreate = questionThemesRepository($fetch).create as ReturnType<typeof vi.fn>;
      mockCreate.mockResolvedValue(fakeTheme);

      const result = await capturedCreateAction?.({ slug: "my-slug" });

      expect(mockCreate).toHaveBeenCalledExactlyOnceWith({ slug: "my-slug" });
      expect(result).toBe(fakeTheme);
    });

    it("should call addErrorToast with the questionThemes.cantCreate translation key when the create error callback is invoked.", () => {
      useQuestionThemesStore();

      capturedCreateOnError?.();

      expect(useAppToast().addErrorToast).toHaveBeenCalledExactlyOnceWith({
        description: "questionThemes.cantCreate",
      });
    });
  });
});