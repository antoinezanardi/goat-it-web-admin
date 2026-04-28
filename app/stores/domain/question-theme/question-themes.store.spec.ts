import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import type { vi } from "vitest";
import { beforeEach, describe, expect, it } from "vitest";

import { createUseAsyncActionMock } from "~~/tests/unit/utils/mocks/composables/core/useAsyncAction/useAsyncAction.mock";
import type { UseAsyncActionMock } from "~~/tests/unit/utils/mocks/composables/core/useAsyncAction/useAsyncAction.mock";
import { createFakeQuestionThemeCreationDto, createFakeQuestionThemeModificationDto } from "~~/tests/unit/utils/faketories/question-themes/dto/question-theme.dto.faketory";
import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";

import type { useQuestionThemesStore as UseQuestionThemesStoreType } from "@/stores/domain/question-theme/question-themes.store";

let fetchAsyncActionMock: UseAsyncActionMock;
let createAsyncActionMock: UseAsyncActionMock;
let archiveAsyncActionMock: UseAsyncActionMock;
let capturedFetchAction: (() => Promise<QuestionTheme[]>) | undefined;
let capturedFetchOnError: ((error: unknown) => void) | undefined;
let capturedCreateAction: ((creationDto: unknown) => Promise<QuestionTheme>) | undefined;
let capturedCreateOnError: ((error: unknown) => void) | undefined;
let capturedArchiveAction: ((id: string) => Promise<QuestionTheme>) | undefined;
let capturedArchiveOnError: ((error: unknown) => void) | undefined;
let modifyAsyncActionMock: UseAsyncActionMock;
let capturedModifyAction: ((id: string, modificationDto: unknown) => Promise<QuestionTheme>) | undefined;
let capturedModifyOnError: ((error: unknown) => void) | undefined;

let useAsyncActionCallCount: number;

mockNuxtImport("useAsyncAction", () => (action: unknown, onError: unknown): UseAsyncActionMock => {
  useAsyncActionCallCount++;
  if (useAsyncActionCallCount === 1) {
    capturedFetchAction = action as () => Promise<QuestionTheme[]>;
    capturedFetchOnError = onError as (error: unknown) => void;
    fetchAsyncActionMock = createUseAsyncActionMock();

    return fetchAsyncActionMock;
  }

  if (useAsyncActionCallCount === 2) {
    capturedCreateAction = action as (creationDto: unknown) => Promise<QuestionTheme>;
    capturedCreateOnError = onError as (error: unknown) => void;
    createAsyncActionMock = createUseAsyncActionMock();

    return createAsyncActionMock;
  }

  if (useAsyncActionCallCount === 3) {
    capturedArchiveAction = action as (id: string) => Promise<QuestionTheme>;
    capturedArchiveOnError = onError as (error: unknown) => void;
    archiveAsyncActionMock = createUseAsyncActionMock();

    return archiveAsyncActionMock;
  }

  capturedModifyAction = action as (id: string, modificationDto: unknown) => Promise<QuestionTheme>;
  capturedModifyOnError = onError as (error: unknown) => void;
  modifyAsyncActionMock = createUseAsyncActionMock();

  return modifyAsyncActionMock;
});

let useQuestionThemesStore: typeof UseQuestionThemesStoreType;

describe("useQuestionThemesStore", () => {
  beforeEach(async() => {
    useAsyncActionCallCount = 0;
    capturedFetchAction = undefined;
    capturedFetchOnError = undefined;
    capturedCreateAction = undefined;
    capturedCreateOnError = undefined;
    capturedArchiveAction = undefined;
    capturedArchiveOnError = undefined;
    capturedModifyAction = undefined;
    capturedModifyOnError = undefined;
    ({ useQuestionThemesStore } = await import("@/stores/domain/question-theme/question-themes.store"));
  });

  describe("questionThemes", () => {
    it("should expose an empty array as initial state when created.", () => {
      const store = useQuestionThemesStore();

      expect(store.questionThemes).toStrictEqual([]);
    });
  });

  describe("questionThemeSlugs", () => {
    it("should return an empty array when there are no question themes.", () => {
      const store = useQuestionThemesStore();

      expect(store.questionThemeSlugs).toStrictEqual<string[]>([]);
    });

    it("should return the slugs of all question themes when there are themes.", () => {
      const store = useQuestionThemesStore();
      const fakeTheme1 = createFakeQuestionTheme({ slug: "theme-one" });
      const fakeTheme2 = createFakeQuestionTheme({ slug: "theme-two" });
      store.questionThemes = [fakeTheme1, fakeTheme2];

      expect(store.questionThemeSlugs).toStrictEqual(["theme-one", "theme-two"]);
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

      expect(store.questionThemes).toStrictEqual(fakeQuestionThemes);
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
      const fakeCreationDto = createFakeQuestionThemeCreationDto();

      await store.createAndStoreQuestionTheme(fakeCreationDto);

      expect(createAsyncActionMock.execute).toHaveBeenCalledExactlyOnceWith(fakeCreationDto);
    });

    it("should unshift the created theme when creation resolves with a theme.", async() => {
      const fakeCreatedTheme = createFakeQuestionTheme();
      const store = useQuestionThemesStore();
      createAsyncActionMock.execute.mockResolvedValue(fakeCreatedTheme);
      const fakeCreationDto = createFakeQuestionThemeCreationDto();

      await store.createAndStoreQuestionTheme(fakeCreationDto);

      expect(store.questionThemes).toStrictEqual([fakeCreatedTheme]);
    });

    it("should add success toast when creation resolves with a theme.", async() => {
      const fakeCreatedTheme = createFakeQuestionTheme();
      const store = useQuestionThemesStore();
      createAsyncActionMock.execute.mockResolvedValue(fakeCreatedTheme);
      const fakeCreationDto = createFakeQuestionThemeCreationDto();

      await store.createAndStoreQuestionTheme(fakeCreationDto);

      expect(useAppToast().addSuccessToast).toHaveBeenCalledExactlyOnceWith({
        description: "questionThemes.createSuccessfully",
      });
    });

    it("should not update questionThemes when creation resolves with undefined.", async() => {
      const store = useQuestionThemesStore();
      const fakeCreationDto = createFakeQuestionThemeCreationDto();

      await store.createAndStoreQuestionTheme(fakeCreationDto);

      expect(store.questionThemes).toStrictEqual<QuestionTheme[]>([]);
    });
  });

  describe("useAsyncAction setup for fetch", () => {
    it("should pass the repository getAll function as action to useAsyncAction when created.", () => {
      useQuestionThemesStore();

      expect(capturedFetchAction).toBe(questionThemesRepository($fetch).getAll);
    });

    it("should call handleGoatItApiError with the error and cantFetch translation key when the fetch error callback is invoked.", () => {
      useQuestionThemesStore();
      const fakeError = new Error("fetch failed");

      capturedFetchOnError?.(fakeError);

      expect(useGoatItApiErrorToast().handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(fakeError, "questionThemes.cantFetch");
    });
  });

  describe("useAsyncAction setup for create", () => {
    it("should pass an async function calling repository.create as action to useAsyncAction when created.", async() => {
      const fakeTheme = createFakeQuestionTheme();
      const fakeCreationDto = createFakeQuestionThemeCreationDto();
      useQuestionThemesStore();
      const mockCreate = questionThemesRepository($fetch).create as ReturnType<typeof vi.fn>;
      mockCreate.mockResolvedValue(fakeTheme);

      await capturedCreateAction?.(fakeCreationDto);

      expect(mockCreate).toHaveBeenCalledExactlyOnceWith(fakeCreationDto);
    });

    it("should return the result from repository.create when the captured action is invoked.", async() => {
      const fakeTheme = createFakeQuestionTheme();
      const fakeCreationDto = createFakeQuestionThemeCreationDto();
      useQuestionThemesStore();
      const mockCreate = questionThemesRepository($fetch).create as ReturnType<typeof vi.fn>;
      mockCreate.mockResolvedValue(fakeTheme);

      const result = await capturedCreateAction?.(fakeCreationDto);

      expect(result).toBe(fakeTheme);
    });

    it("should call handleGoatItApiError with the error and cantCreate translation key when the create error callback is invoked.", () => {
      useQuestionThemesStore();
      const fakeError = new Error("create failed");

      capturedCreateOnError?.(fakeError);

      expect(useGoatItApiErrorToast().handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(fakeError, "questionThemes.cantCreate");
    });
  });

  describe("archiveQuestionThemeStatus", () => {
    it("should reflect the fetchStatus value from useAsyncAction when created.", () => {
      const store = useQuestionThemesStore();

      expect(store.archiveQuestionThemeStatus).toBe(archiveAsyncActionMock.fetchStatus.value);
    });

    it("should update when the fetchStatus changes to pending.", () => {
      const store = useQuestionThemesStore();
      archiveAsyncActionMock.fetchStatus.value = "pending";

      expect(store.archiveQuestionThemeStatus).toBe("pending");
    });
  });

  describe("isArchivingQuestionTheme", () => {
    it("should be false when archiveStatus is idle.", () => {
      const store = useQuestionThemesStore();

      expect(store.isArchivingQuestionTheme).toBeFalsy();
    });

    it("should be true when archiveStatus is pending.", () => {
      const store = useQuestionThemesStore();
      archiveAsyncActionMock.fetchStatus.value = "pending";

      expect(store.isArchivingQuestionTheme).toBeTruthy();
    });
  });

  describe("isArchiveQuestionThemeSuccess", () => {
    it("should be false when archiveStatus is idle.", () => {
      const store = useQuestionThemesStore();

      expect(store.isArchiveQuestionThemeSuccess).toBeFalsy();
    });

    it("should be true when archiveStatus is success.", () => {
      const store = useQuestionThemesStore();
      archiveAsyncActionMock.fetchStatus.value = "success";

      expect(store.isArchiveQuestionThemeSuccess).toBeTruthy();
    });
  });

  describe("isArchivingQuestionThemeError", () => {
    it("should be false when archiveStatus is idle.", () => {
      const store = useQuestionThemesStore();

      expect(store.isArchivingQuestionThemeError).toBeFalsy();
    });

    it("should be true when archiveStatus is error.", () => {
      const store = useQuestionThemesStore();
      archiveAsyncActionMock.fetchStatus.value = "error";

      expect(store.isArchivingQuestionThemeError).toBeTruthy();
    });
  });

  describe("archiveAndStoreQuestionTheme", () => {
    it("should call the archive execute function with the id when invoked.", async() => {
      const store = useQuestionThemesStore();

      await store.archiveAndStoreQuestionTheme("theme-id-123");

      expect(archiveAsyncActionMock.execute).toHaveBeenCalledExactlyOnceWith("theme-id-123");
    });

    it("should replace the theme in the array when archive resolves with the updated theme.", async() => {
      const existingTheme = createFakeQuestionTheme({ id: "theme-id-123", status: "active" });
      const otherTheme = createFakeQuestionTheme({ id: "other-id", status: "active" });
      const archivedTheme = createFakeQuestionTheme({ id: "theme-id-123", status: "archived" });
      const store = useQuestionThemesStore();
      store.questionThemes = [otherTheme, existingTheme];
      archiveAsyncActionMock.execute.mockResolvedValue(archivedTheme);

      await store.archiveAndStoreQuestionTheme("theme-id-123");

      expect(store.questionThemes).toStrictEqual([otherTheme, archivedTheme]);
    });

    it("should add success toast when archive resolves with the updated theme.", async() => {
      const existingTheme = createFakeQuestionTheme({ id: "theme-id-123", status: "active" });
      const archivedTheme = createFakeQuestionTheme({ id: "theme-id-123", status: "archived" });
      const store = useQuestionThemesStore();
      store.questionThemes = [existingTheme];
      archiveAsyncActionMock.execute.mockResolvedValue(archivedTheme);

      await store.archiveAndStoreQuestionTheme("theme-id-123");

      expect(useAppToast().addSuccessToast).toHaveBeenCalledExactlyOnceWith({
        description: "questionThemes.archiveSuccessfully",
      });
    });

    it("should not splice the array when the archived theme id is not found in the array.", async() => {
      const existingTheme = createFakeQuestionTheme({ id: "other-id", status: "active" });
      const archivedTheme = createFakeQuestionTheme({ id: "theme-id-123", status: "archived" });
      const store = useQuestionThemesStore();
      store.questionThemes = [existingTheme];
      archiveAsyncActionMock.execute.mockResolvedValue(archivedTheme);

      await store.archiveAndStoreQuestionTheme("theme-id-123");

      expect(store.questionThemes).toStrictEqual([existingTheme]);
    });

    it("should show toast even when the archived theme id is not found in the array.", async() => {
      const existingTheme = createFakeQuestionTheme({ id: "other-id", status: "active" });
      const archivedTheme = createFakeQuestionTheme({ id: "theme-id-123", status: "archived" });
      const store = useQuestionThemesStore();
      store.questionThemes = [existingTheme];
      archiveAsyncActionMock.execute.mockResolvedValue(archivedTheme);

      await store.archiveAndStoreQuestionTheme("theme-id-123");

      expect(useAppToast().addSuccessToast).toHaveBeenCalledExactlyOnceWith({ description: "questionThemes.archiveSuccessfully" });
    });

    it("should not update questionThemes when archive resolves with undefined.", async() => {
      const existingTheme = createFakeQuestionTheme({ id: "theme-id-123" });
      const store = useQuestionThemesStore();
      store.questionThemes = [existingTheme];

      await store.archiveAndStoreQuestionTheme("theme-id-123");

      expect(store.questionThemes).toStrictEqual([existingTheme]);
    });
  });

  describe("useAsyncAction setup for archive", () => {
    it("should pass an async function calling repository.archive as action to useAsyncAction when created.", async() => {
      const fakeTheme = createFakeQuestionTheme();
      useQuestionThemesStore();
      const mockArchive = questionThemesRepository($fetch).archive as ReturnType<typeof vi.fn>;
      mockArchive.mockResolvedValue(fakeTheme);

      await capturedArchiveAction?.("theme-id-123");

      expect(mockArchive).toHaveBeenCalledExactlyOnceWith("theme-id-123");
    });

    it("should return the result from repository.archive when the captured action is invoked.", async() => {
      const fakeTheme = createFakeQuestionTheme();
      useQuestionThemesStore();
      const mockArchive = questionThemesRepository($fetch).archive as ReturnType<typeof vi.fn>;
      mockArchive.mockResolvedValue(fakeTheme);

      const result = await capturedArchiveAction?.("theme-id-123");

      expect(result).toBe(fakeTheme);
    });

    it("should call handleGoatItApiError with the error and cantArchive translation key when the archive error callback is invoked.", () => {
      useQuestionThemesStore();
      const fakeError = new Error("archive failed");

      capturedArchiveOnError?.(fakeError);

      expect(useGoatItApiErrorToast().handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(fakeError, "questionThemes.cantArchive");
    });
  });

  describe("modifyQuestionThemeStatus", () => {
    it("should reflect the fetchStatus value from useAsyncAction when created.", () => {
      const store = useQuestionThemesStore();

      expect(store.modifyQuestionThemeStatus).toBe(modifyAsyncActionMock.fetchStatus.value);
    });

    it("should update when the fetchStatus changes to pending.", () => {
      const store = useQuestionThemesStore();
      modifyAsyncActionMock.fetchStatus.value = "pending";

      expect(store.modifyQuestionThemeStatus).toBe("pending");
    });
  });

  describe("isModifyingQuestionTheme", () => {
    it("should be false when modifyStatus is idle.", () => {
      const store = useQuestionThemesStore();

      expect(store.isModifyingQuestionTheme).toBeFalsy();
    });

    it("should be true when modifyStatus is pending.", () => {
      const store = useQuestionThemesStore();
      modifyAsyncActionMock.fetchStatus.value = "pending";

      expect(store.isModifyingQuestionTheme).toBeTruthy();
    });
  });

  describe("isModifyQuestionThemeSuccess", () => {
    it("should be false when modifyStatus is idle.", () => {
      const store = useQuestionThemesStore();

      expect(store.isModifyQuestionThemeSuccess).toBeFalsy();
    });

    it("should be true when modifyStatus is success.", () => {
      const store = useQuestionThemesStore();
      modifyAsyncActionMock.fetchStatus.value = "success";

      expect(store.isModifyQuestionThemeSuccess).toBeTruthy();
    });
  });

  describe("isModifyingQuestionThemeError", () => {
    it("should be false when modifyStatus is idle.", () => {
      const store = useQuestionThemesStore();

      expect(store.isModifyingQuestionThemeError).toBeFalsy();
    });

    it("should be true when modifyStatus is error.", () => {
      const store = useQuestionThemesStore();
      modifyAsyncActionMock.fetchStatus.value = "error";

      expect(store.isModifyingQuestionThemeError).toBeTruthy();
    });
  });

  describe("modifyAndStoreQuestionTheme", () => {
    it("should call the modify execute function with the id and the modification dto when invoked.", async() => {
      const store = useQuestionThemesStore();
      const fakeModificationDto = createFakeQuestionThemeModificationDto();

      await store.modifyAndStoreQuestionTheme("theme-id-123", fakeModificationDto);

      expect(modifyAsyncActionMock.execute).toHaveBeenCalledExactlyOnceWith("theme-id-123", fakeModificationDto);
    });

    it("should replace the theme in the array when modify resolves with the updated theme.", async() => {
      const existingTheme = createFakeQuestionTheme({ id: "theme-id-123" });
      const otherTheme = createFakeQuestionTheme({ id: "other-id" });
      const modifiedTheme = createFakeQuestionTheme({ id: "theme-id-123", slug: "modified" });
      const store = useQuestionThemesStore();
      store.questionThemes = [otherTheme, existingTheme];
      modifyAsyncActionMock.execute.mockResolvedValue(modifiedTheme);

      await store.modifyAndStoreQuestionTheme("theme-id-123", createFakeQuestionThemeModificationDto());

      expect(store.questionThemes).toStrictEqual([otherTheme, modifiedTheme]);
    });

    it("should add success toast when modify resolves with the updated theme.", async() => {
      const existingTheme = createFakeQuestionTheme({ id: "theme-id-123" });
      const modifiedTheme = createFakeQuestionTheme({ id: "theme-id-123", slug: "modified" });
      const store = useQuestionThemesStore();
      store.questionThemes = [existingTheme];
      modifyAsyncActionMock.execute.mockResolvedValue(modifiedTheme);

      await store.modifyAndStoreQuestionTheme("theme-id-123", createFakeQuestionThemeModificationDto());

      expect(useAppToast().addSuccessToast).toHaveBeenCalledExactlyOnceWith({
        description: "questionThemes.modifySuccessfully",
      });
    });

    it("should not splice the array when the modified theme id is not found in the array.", async() => {
      const existingTheme = createFakeQuestionTheme({ id: "other-id" });
      const modifiedTheme = createFakeQuestionTheme({ id: "theme-id-123" });
      const store = useQuestionThemesStore();
      store.questionThemes = [existingTheme];
      modifyAsyncActionMock.execute.mockResolvedValue(modifiedTheme);

      await store.modifyAndStoreQuestionTheme("theme-id-123", createFakeQuestionThemeModificationDto());

      expect(store.questionThemes).toStrictEqual([existingTheme]);
    });

    it("should show toast even when the modified theme id is not found in the array.", async() => {
      const existingTheme = createFakeQuestionTheme({ id: "other-id" });
      const modifiedTheme = createFakeQuestionTheme({ id: "theme-id-123" });
      const store = useQuestionThemesStore();
      store.questionThemes = [existingTheme];
      modifyAsyncActionMock.execute.mockResolvedValue(modifiedTheme);

      await store.modifyAndStoreQuestionTheme("theme-id-123", createFakeQuestionThemeModificationDto());

      expect(useAppToast().addSuccessToast).toHaveBeenCalledExactlyOnceWith({ description: "questionThemes.modifySuccessfully" });
    });

    it("should not update questionThemes when modify resolves with undefined.", async() => {
      const existingTheme = createFakeQuestionTheme({ id: "theme-id-123" });
      const store = useQuestionThemesStore();
      store.questionThemes = [existingTheme];

      await store.modifyAndStoreQuestionTheme("theme-id-123", createFakeQuestionThemeModificationDto());

      expect(store.questionThemes).toStrictEqual([existingTheme]);
    });
  });

  describe("useAsyncAction setup for modify", () => {
    it("should pass an async function calling repository.patch as action to useAsyncAction when created.", async() => {
      const fakeTheme = createFakeQuestionTheme();
      const fakeModificationDto = createFakeQuestionThemeModificationDto();
      useQuestionThemesStore();
      const mockPatch = questionThemesRepository($fetch).patch as ReturnType<typeof vi.fn>;
      mockPatch.mockResolvedValue(fakeTheme);

      await capturedModifyAction?.("theme-id-123", fakeModificationDto);

      expect(mockPatch).toHaveBeenCalledExactlyOnceWith("theme-id-123", fakeModificationDto);
    });

    it("should return the result from repository.patch when the captured action is invoked.", async() => {
      const fakeTheme = createFakeQuestionTheme();
      const fakeModificationDto = createFakeQuestionThemeModificationDto();
      useQuestionThemesStore();
      const mockPatch = questionThemesRepository($fetch).patch as ReturnType<typeof vi.fn>;
      mockPatch.mockResolvedValue(fakeTheme);

      const result = await capturedModifyAction?.("theme-id-123", fakeModificationDto);

      expect(result).toBe(fakeTheme);
    });

    it("should call handleGoatItApiError with the error and cantModify translation key when the modify error callback is invoked.", () => {
      useQuestionThemesStore();
      const fakeError = new Error("modify failed");

      capturedModifyOnError?.(fakeError);

      expect(useGoatItApiErrorToast().handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(fakeError, "questionThemes.cantModify");
    });
  });
});