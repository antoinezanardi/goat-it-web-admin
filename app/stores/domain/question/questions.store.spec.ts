import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import type { QuestionModificationDto, QuestionThemeAssignmentCreationDto, QuestionThemeAssignmentModificationDto } from "@goat-it/schemas/question";
import type { vi } from "vitest";
import { beforeEach, describe, expect, it } from "vitest";

import { createUseAsyncActionMock } from "~~/tests/unit/utils/mocks/composables/core/useAsyncAction/useAsyncAction.mock";
import type { UseAsyncActionMock } from "~~/tests/unit/utils/mocks/composables/core/useAsyncAction/useAsyncAction.mock";
import { createFakeQuestionCreationDto } from "~~/tests/unit/utils/faketories/questions/dto/question.dto.faketory";
import { createFakeQuestion } from "~~/tests/unit/utils/faketories/questions/entity/question.entity.faketory";

import type { Question } from "#shared/types/question.types";
import type { useQuestionsStore as UseQuestionsStoreType } from "@/stores/domain/question/questions.store";

let fetchAsyncActionMock: UseAsyncActionMock;
let createAsyncActionMock: UseAsyncActionMock;
let archiveAsyncActionMock: UseAsyncActionMock;
let assignThemeAsyncActionMock: UseAsyncActionMock;
let removeThemeAsyncActionMock: UseAsyncActionMock;
let modifyThemeAssignmentAsyncActionMock: UseAsyncActionMock;
let modifyAsyncActionMock: UseAsyncActionMock;

let capturedFetchAction: (() => Promise<Question[]>) | undefined;
let capturedFetchOnError: ((error: unknown) => void) | undefined;
let capturedCreateAction: ((creationDto: unknown) => Promise<Question>) | undefined;
let capturedCreateOnError: ((error: unknown) => void) | undefined;
let capturedArchiveAction: ((id: string) => Promise<Question>) | undefined;
let capturedArchiveOnError: ((error: unknown) => void) | undefined;
let capturedAssignThemeAction: ((id: string, dto: unknown) => Promise<Question>) | undefined;
let capturedAssignThemeOnError: ((error: unknown) => void) | undefined;
let capturedRemoveThemeAction: ((id: string, themeId: string) => Promise<Question>) | undefined;
let capturedRemoveThemeOnError: ((error: unknown) => void) | undefined;
let capturedModifyThemeAssignmentAction: ((id: string, themeId: string, dto: unknown) => Promise<Question>) | undefined;
let capturedModifyThemeAssignmentOnError: ((error: unknown) => void) | undefined;
let capturedModifyAction: ((id: string, dto: unknown) => Promise<Question>) | undefined;
let capturedModifyOnError: ((error: unknown) => void) | undefined;

let useAsyncActionCallCount: number;

mockNuxtImport("useAsyncAction", () => (action: unknown, onError: unknown): UseAsyncActionMock => {
  useAsyncActionCallCount++;
  if (useAsyncActionCallCount === 1) {
    capturedFetchAction = action as () => Promise<Question[]>;
    capturedFetchOnError = onError as (error: unknown) => void;
    fetchAsyncActionMock = createUseAsyncActionMock();

    return fetchAsyncActionMock;
  }

  if (useAsyncActionCallCount === 2) {
    capturedCreateAction = action as (creationDto: unknown) => Promise<Question>;
    capturedCreateOnError = onError as (error: unknown) => void;
    createAsyncActionMock = createUseAsyncActionMock();

    return createAsyncActionMock;
  }

  if (useAsyncActionCallCount === 3) {
    capturedArchiveAction = action as (id: string) => Promise<Question>;
    capturedArchiveOnError = onError as (error: unknown) => void;
    archiveAsyncActionMock = createUseAsyncActionMock();

    return archiveAsyncActionMock;
  }

  if (useAsyncActionCallCount === 4) {
    capturedAssignThemeAction = action as (id: string, dto: unknown) => Promise<Question>;
    capturedAssignThemeOnError = onError as (error: unknown) => void;
    assignThemeAsyncActionMock = createUseAsyncActionMock();

    return assignThemeAsyncActionMock;
  }

  if (useAsyncActionCallCount === 5) {
    capturedRemoveThemeAction = action as (id: string, themeId: string) => Promise<Question>;
    capturedRemoveThemeOnError = onError as (error: unknown) => void;
    removeThemeAsyncActionMock = createUseAsyncActionMock();

    return removeThemeAsyncActionMock;
  }

  if (useAsyncActionCallCount === 6) {
    capturedModifyThemeAssignmentAction = action as (id: string, themeId: string, dto: unknown) => Promise<Question>;
    capturedModifyThemeAssignmentOnError = onError as (error: unknown) => void;
    modifyThemeAssignmentAsyncActionMock = createUseAsyncActionMock();

    return modifyThemeAssignmentAsyncActionMock;
  }

  capturedModifyAction = action as (id: string, dto: unknown) => Promise<Question>;
  capturedModifyOnError = onError as (error: unknown) => void;
  modifyAsyncActionMock = createUseAsyncActionMock();

  return modifyAsyncActionMock;
});

let useQuestionsStore: typeof UseQuestionsStoreType;

describe("useQuestionsStore", () => {
  beforeEach(async() => {
    useAsyncActionCallCount = 0;
    capturedFetchAction = undefined;
    capturedFetchOnError = undefined;
    capturedCreateAction = undefined;
    capturedCreateOnError = undefined;
    capturedArchiveAction = undefined;
    capturedArchiveOnError = undefined;
    capturedAssignThemeAction = undefined;
    capturedAssignThemeOnError = undefined;
    capturedRemoveThemeAction = undefined;
    capturedRemoveThemeOnError = undefined;
    capturedModifyThemeAssignmentAction = undefined;
    capturedModifyThemeAssignmentOnError = undefined;
    capturedModifyAction = undefined;
    capturedModifyOnError = undefined;
    ({ useQuestionsStore } = await import("@/stores/domain/question/questions.store"));
  });

  describe("questions", () => {
    it("should expose an empty array as initial state when created.", () => {
      const store = useQuestionsStore();

      expect(store.questions).toStrictEqual([]);
    });
  });

  describe("fetchQuestionsStatus", () => {
    it("should reflect the fetchStatus value from useAsyncAction when created.", () => {
      const store = useQuestionsStore();

      expect(store.fetchQuestionsStatus).toBe(fetchAsyncActionMock.fetchStatus.value);
    });

    it("should update when the fetchStatus changes to pending.", () => {
      const store = useQuestionsStore();
      fetchAsyncActionMock.fetchStatus.value = "pending";

      expect(store.fetchQuestionsStatus).toBe("pending");
    });
  });

  describe("isFetchingQuestions", () => {
    it("should be false when fetchStatus is idle.", () => {
      const store = useQuestionsStore();

      expect(store.isFetchingQuestions).toBeFalsy();
    });

    it("should be true when fetchStatus is pending.", () => {
      const store = useQuestionsStore();
      fetchAsyncActionMock.fetchStatus.value = "pending";

      expect(store.isFetchingQuestions).toBeTruthy();
    });
  });

  describe("isFetchQuestionsSuccess", () => {
    it("should be false when fetchStatus is idle.", () => {
      const store = useQuestionsStore();

      expect(store.isFetchQuestionsSuccess).toBeFalsy();
    });

    it("should be true when fetchStatus is success.", () => {
      const store = useQuestionsStore();
      fetchAsyncActionMock.fetchStatus.value = "success";

      expect(store.isFetchQuestionsSuccess).toBeTruthy();
    });
  });

  describe("isFetchingQuestionsError", () => {
    it("should be false when fetchStatus is idle.", () => {
      const store = useQuestionsStore();

      expect(store.isFetchingQuestionsError).toBeFalsy();
    });

    it("should be true when fetchStatus is error.", () => {
      const store = useQuestionsStore();
      fetchAsyncActionMock.fetchStatus.value = "error";

      expect(store.isFetchingQuestionsError).toBeTruthy();
    });
  });

  describe("fetchAndStoreQuestions", () => {
    it("should call fetchQuestions when called.", async() => {
      const store = useQuestionsStore();

      await store.fetchAndStoreQuestions();

      expect(fetchAsyncActionMock.execute).toHaveBeenCalledExactlyOnceWith();
    });

    it("should update questions with the fetched questions when fetchQuestions resolves with data.", async() => {
      const fakeQuestions: Question[] = [
        createFakeQuestion(),
        createFakeQuestion(),
      ];
      const store = useQuestionsStore();
      fetchAsyncActionMock.execute.mockResolvedValue(fakeQuestions);

      await store.fetchAndStoreQuestions();

      expect(store.questions).toStrictEqual(fakeQuestions);
    });

    it("should not update questions when fetchQuestions resolves with undefined.", async() => {
      const store = useQuestionsStore();

      await store.fetchAndStoreQuestions();

      expect(store.questions).toStrictEqual<Question[]>([]);
    });
  });

  describe("createQuestionStatus", () => {
    it("should reflect the fetchStatus value from useAsyncAction when created.", () => {
      const store = useQuestionsStore();

      expect(store.createQuestionStatus).toBe(createAsyncActionMock.fetchStatus.value);
    });

    it("should update when the fetchStatus changes to pending.", () => {
      const store = useQuestionsStore();
      createAsyncActionMock.fetchStatus.value = "pending";

      expect(store.createQuestionStatus).toBe("pending");
    });
  });

  describe("isCreatingQuestion", () => {
    it("should be false when createStatus is idle.", () => {
      const store = useQuestionsStore();

      expect(store.isCreatingQuestion).toBeFalsy();
    });

    it("should be true when createStatus is pending.", () => {
      const store = useQuestionsStore();
      createAsyncActionMock.fetchStatus.value = "pending";

      expect(store.isCreatingQuestion).toBeTruthy();
    });
  });

  describe("isCreateQuestionSuccess", () => {
    it("should be false when createStatus is idle.", () => {
      const store = useQuestionsStore();

      expect(store.isCreateQuestionSuccess).toBeFalsy();
    });

    it("should be true when createStatus is success.", () => {
      const store = useQuestionsStore();
      createAsyncActionMock.fetchStatus.value = "success";

      expect(store.isCreateQuestionSuccess).toBeTruthy();
    });
  });

  describe("isCreatingQuestionError", () => {
    it("should be false when createStatus is idle.", () => {
      const store = useQuestionsStore();

      expect(store.isCreatingQuestionError).toBeFalsy();
    });

    it("should be true when createStatus is error.", () => {
      const store = useQuestionsStore();
      createAsyncActionMock.fetchStatus.value = "error";

      expect(store.isCreatingQuestionError).toBeTruthy();
    });
  });

  describe("createAndStoreQuestion", () => {
    it("should call the create execute function with the creation dto when invoked.", async() => {
      const store = useQuestionsStore();
      const fakeCreationDto = createFakeQuestionCreationDto();

      await store.createAndStoreQuestion(fakeCreationDto);

      expect(createAsyncActionMock.execute).toHaveBeenCalledExactlyOnceWith(fakeCreationDto);
    });

    it("should unshift the created question when creation resolves with a question.", async() => {
      const fakeCreatedQuestion = createFakeQuestion();
      const store = useQuestionsStore();
      createAsyncActionMock.execute.mockResolvedValue(fakeCreatedQuestion);
      const fakeCreationDto = createFakeQuestionCreationDto();

      await store.createAndStoreQuestion(fakeCreationDto);

      expect(store.questions).toStrictEqual([fakeCreatedQuestion]);
    });

    it("should add success toast when creation resolves with a question.", async() => {
      const fakeCreatedQuestion = createFakeQuestion();
      const store = useQuestionsStore();
      createAsyncActionMock.execute.mockResolvedValue(fakeCreatedQuestion);
      const fakeCreationDto = createFakeQuestionCreationDto();

      await store.createAndStoreQuestion(fakeCreationDto);

      expect(useAppToast().addSuccessToast).toHaveBeenCalledExactlyOnceWith({
        description: "questions.createSuccessfully",
      });
    });

    it("should not update questions when creation resolves with undefined.", async() => {
      const store = useQuestionsStore();
      const fakeCreationDto = createFakeQuestionCreationDto();

      await store.createAndStoreQuestion(fakeCreationDto);

      expect(store.questions).toStrictEqual<Question[]>([]);
    });
  });

  describe("useAsyncAction setup for fetch", () => {
    it("should pass the repository getAll function as action to useAsyncAction when created.", () => {
      useQuestionsStore();

      expect(capturedFetchAction).toBe(questionsRepository($fetch).getAll);
    });

    it("should call handleGoatItApiError with the error and cantFetch translation key when the fetch error callback is invoked.", () => {
      useQuestionsStore();
      const fakeError = new Error("fetch failed");

      capturedFetchOnError?.(fakeError);

      expect(useGoatItApiErrorToast().handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(fakeError, "questions.cantFetch");
    });
  });

  describe("useAsyncAction setup for create", () => {
    it("should pass an async function calling repository.create as action to useAsyncAction when created.", async() => {
      const fakeQuestion = createFakeQuestion();
      const fakeCreationDto = createFakeQuestionCreationDto();
      useQuestionsStore();
      const mockCreate = questionsRepository($fetch).create as ReturnType<typeof vi.fn>;
      mockCreate.mockResolvedValue(fakeQuestion);

      await capturedCreateAction?.(fakeCreationDto);

      expect(mockCreate).toHaveBeenCalledExactlyOnceWith(fakeCreationDto);
    });

    it("should return the result from repository.create when the captured action is invoked.", async() => {
      const fakeQuestion = createFakeQuestion();
      const fakeCreationDto = createFakeQuestionCreationDto();
      useQuestionsStore();
      const mockCreate = questionsRepository($fetch).create as ReturnType<typeof vi.fn>;
      mockCreate.mockResolvedValue(fakeQuestion);

      const result = await capturedCreateAction?.(fakeCreationDto);

      expect(result).toBe(fakeQuestion);
    });

    it("should call handleGoatItApiError with the error and cantCreate translation key when the create error callback is invoked.", () => {
      useQuestionsStore();
      const fakeError = new Error("create failed");

      capturedCreateOnError?.(fakeError);

      expect(useGoatItApiErrorToast().handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(fakeError, "questions.cantCreate");
    });
  });

  describe("archiveQuestionStatus", () => {
    it("should reflect the fetchStatus value from useAsyncAction when created.", () => {
      const store = useQuestionsStore();

      expect(store.archiveQuestionStatus).toBe(archiveAsyncActionMock.fetchStatus.value);
    });

    it("should update when the fetchStatus changes to pending.", () => {
      const store = useQuestionsStore();
      archiveAsyncActionMock.fetchStatus.value = "pending";

      expect(store.archiveQuestionStatus).toBe("pending");
    });
  });

  describe("isArchivingQuestion", () => {
    it("should be false when archiveStatus is idle.", () => {
      const store = useQuestionsStore();

      expect(store.isArchivingQuestion).toBeFalsy();
    });

    it("should be true when archiveStatus is pending.", () => {
      const store = useQuestionsStore();
      archiveAsyncActionMock.fetchStatus.value = "pending";

      expect(store.isArchivingQuestion).toBeTruthy();
    });
  });

  describe("isArchiveQuestionSuccess", () => {
    it("should be false when archiveStatus is idle.", () => {
      const store = useQuestionsStore();

      expect(store.isArchiveQuestionSuccess).toBeFalsy();
    });

    it("should be true when archiveStatus is success.", () => {
      const store = useQuestionsStore();
      archiveAsyncActionMock.fetchStatus.value = "success";

      expect(store.isArchiveQuestionSuccess).toBeTruthy();
    });
  });

  describe("isArchivingQuestionError", () => {
    it("should be false when archiveStatus is idle.", () => {
      const store = useQuestionsStore();

      expect(store.isArchivingQuestionError).toBeFalsy();
    });

    it("should be true when archiveStatus is error.", () => {
      const store = useQuestionsStore();
      archiveAsyncActionMock.fetchStatus.value = "error";

      expect(store.isArchivingQuestionError).toBeTruthy();
    });
  });

  describe("archiveAndStoreQuestion", () => {
    it("should call the archive execute function with the id when invoked.", async() => {
      const store = useQuestionsStore();

      await store.archiveAndStoreQuestion("question-id-123");

      expect(archiveAsyncActionMock.execute).toHaveBeenCalledExactlyOnceWith("question-id-123");
    });

    it("should replace the question in the array when archive resolves with the updated question.", async() => {
      const existingQuestion = createFakeQuestion({ id: "question-id-123", status: "active" });
      const otherQuestion = createFakeQuestion({ id: "other-id", status: "active" });
      const archivedQuestion = createFakeQuestion({ id: "question-id-123", status: "archived" });
      const store = useQuestionsStore();
      store.questions = [otherQuestion, existingQuestion];
      archiveAsyncActionMock.execute.mockResolvedValue(archivedQuestion);

      await store.archiveAndStoreQuestion("question-id-123");

      expect(store.questions).toStrictEqual([otherQuestion, archivedQuestion]);
    });

    it("should add success toast when archive resolves with the updated question.", async() => {
      const existingQuestion = createFakeQuestion({ id: "question-id-123", status: "active" });
      const archivedQuestion = createFakeQuestion({ id: "question-id-123", status: "archived" });
      const store = useQuestionsStore();
      store.questions = [existingQuestion];
      archiveAsyncActionMock.execute.mockResolvedValue(archivedQuestion);

      await store.archiveAndStoreQuestion("question-id-123");

      expect(useAppToast().addSuccessToast).toHaveBeenCalledExactlyOnceWith({
        description: "questions.archiveSuccessfully",
      });
    });

    it("should not splice the array when the archived question id is not found in the array.", async() => {
      const existingQuestion = createFakeQuestion({ id: "other-id", status: "active" });
      const archivedQuestion = createFakeQuestion({ id: "question-id-123", status: "archived" });
      const store = useQuestionsStore();
      store.questions = [existingQuestion];
      archiveAsyncActionMock.execute.mockResolvedValue(archivedQuestion);

      await store.archiveAndStoreQuestion("question-id-123");

      expect(store.questions).toStrictEqual([existingQuestion]);
    });

    it("should show toast even when the archived question id is not found in the array.", async() => {
      const existingQuestion = createFakeQuestion({ id: "other-id", status: "active" });
      const archivedQuestion = createFakeQuestion({ id: "question-id-123", status: "archived" });
      const store = useQuestionsStore();
      store.questions = [existingQuestion];
      archiveAsyncActionMock.execute.mockResolvedValue(archivedQuestion);

      await store.archiveAndStoreQuestion("question-id-123");

      expect(useAppToast().addSuccessToast).toHaveBeenCalledExactlyOnceWith({ description: "questions.archiveSuccessfully" });
    });

    it("should not update questions when archive resolves with undefined.", async() => {
      const existingQuestion = createFakeQuestion({ id: "question-id-123" });
      const store = useQuestionsStore();
      store.questions = [existingQuestion];

      await store.archiveAndStoreQuestion("question-id-123");

      expect(store.questions).toStrictEqual([existingQuestion]);
    });
  });

  describe("useAsyncAction setup for archive", () => {
    it("should pass an async function calling repository.archive as action to useAsyncAction when created.", async() => {
      const fakeQuestion = createFakeQuestion();
      useQuestionsStore();
      const mockArchive = questionsRepository($fetch).archive as ReturnType<typeof vi.fn>;
      mockArchive.mockResolvedValue(fakeQuestion);

      await capturedArchiveAction?.("question-id-123");

      expect(mockArchive).toHaveBeenCalledExactlyOnceWith("question-id-123");
    });

    it("should return the result from repository.archive when the captured action is invoked.", async() => {
      const fakeQuestion = createFakeQuestion();
      useQuestionsStore();
      const mockArchive = questionsRepository($fetch).archive as ReturnType<typeof vi.fn>;
      mockArchive.mockResolvedValue(fakeQuestion);

      const result = await capturedArchiveAction?.("question-id-123");

      expect(result).toBe(fakeQuestion);
    });

    it("should call handleGoatItApiError with the error and cantArchive translation key when the archive error callback is invoked.", () => {
      useQuestionsStore();
      const fakeError = new Error("archive failed");

      capturedArchiveOnError?.(fakeError);

      expect(useGoatItApiErrorToast().handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(fakeError, "questions.cantArchive");
    });
  });

  describe("assignThemeToQuestionStatus", () => {
    it("should reflect the fetchStatus value from useAsyncAction when created.", () => {
      const store = useQuestionsStore();

      expect(store.assignThemeToQuestionStatus).toBe(assignThemeAsyncActionMock.fetchStatus.value);
    });

    it("should update when the fetchStatus changes to pending.", () => {
      const store = useQuestionsStore();
      assignThemeAsyncActionMock.fetchStatus.value = "pending";

      expect(store.assignThemeToQuestionStatus).toBe("pending");
    });
  });

  describe("isAssigningThemeToQuestion", () => {
    it("should be false when assignThemeStatus is idle.", () => {
      const store = useQuestionsStore();

      expect(store.isAssigningThemeToQuestion).toBeFalsy();
    });

    it("should be true when assignThemeStatus is pending.", () => {
      const store = useQuestionsStore();
      assignThemeAsyncActionMock.fetchStatus.value = "pending";

      expect(store.isAssigningThemeToQuestion).toBeTruthy();
    });
  });

  describe("isAssignThemeToQuestionSuccess", () => {
    it("should be false when assignThemeStatus is idle.", () => {
      const store = useQuestionsStore();

      expect(store.isAssignThemeToQuestionSuccess).toBeFalsy();
    });

    it("should be true when assignThemeStatus is success.", () => {
      const store = useQuestionsStore();
      assignThemeAsyncActionMock.fetchStatus.value = "success";

      expect(store.isAssignThemeToQuestionSuccess).toBeTruthy();
    });
  });

  describe("isAssigningThemeToQuestionError", () => {
    it("should be false when assignThemeStatus is idle.", () => {
      const store = useQuestionsStore();

      expect(store.isAssigningThemeToQuestionError).toBeFalsy();
    });

    it("should be true when assignThemeStatus is error.", () => {
      const store = useQuestionsStore();
      assignThemeAsyncActionMock.fetchStatus.value = "error";

      expect(store.isAssigningThemeToQuestionError).toBeTruthy();
    });
  });

  describe("assignThemeAndStoreQuestion", () => {
    it("should call the assignTheme execute function with the id and dto when invoked.", async() => {
      const store = useQuestionsStore();
      const fakeDto: QuestionThemeAssignmentCreationDto = { themeId: "theme-id-456", isPrimary: false, isHint: true };

      await store.assignThemeAndStoreQuestion("question-id-123", fakeDto);

      expect(assignThemeAsyncActionMock.execute).toHaveBeenCalledExactlyOnceWith("question-id-123", fakeDto);
    });

    it("should replace the question in the array when assignTheme resolves with the updated question.", async() => {
      const existingQuestion = createFakeQuestion({ id: "question-id-123" });
      const otherQuestion = createFakeQuestion({ id: "other-id" });
      const updatedQuestion = createFakeQuestion({ id: "question-id-123" });
      const store = useQuestionsStore();
      store.questions = [otherQuestion, existingQuestion];
      assignThemeAsyncActionMock.execute.mockResolvedValue(updatedQuestion);
      const fakeDto: QuestionThemeAssignmentCreationDto = { themeId: "theme-id-456", isPrimary: false, isHint: true };

      await store.assignThemeAndStoreQuestion("question-id-123", fakeDto);

      expect(store.questions).toStrictEqual([otherQuestion, updatedQuestion]);
    });

    it("should add success toast when assignTheme resolves with the updated question.", async() => {
      const existingQuestion = createFakeQuestion({ id: "question-id-123" });
      const updatedQuestion = createFakeQuestion({ id: "question-id-123" });
      const store = useQuestionsStore();
      store.questions = [existingQuestion];
      assignThemeAsyncActionMock.execute.mockResolvedValue(updatedQuestion);
      const fakeDto: QuestionThemeAssignmentCreationDto = { themeId: "theme-id-456", isPrimary: false, isHint: true };

      await store.assignThemeAndStoreQuestion("question-id-123", fakeDto);

      expect(useAppToast().addSuccessToast).toHaveBeenCalledExactlyOnceWith({
        description: "questions.assignThemeSuccessfully",
      });
    });

    it("should not splice the array when the question id is not found in the array.", async() => {
      const existingQuestion = createFakeQuestion({ id: "other-id" });
      const updatedQuestion = createFakeQuestion({ id: "question-id-123" });
      const store = useQuestionsStore();
      store.questions = [existingQuestion];
      assignThemeAsyncActionMock.execute.mockResolvedValue(updatedQuestion);
      const fakeDto: QuestionThemeAssignmentCreationDto = { themeId: "theme-id-456", isPrimary: false, isHint: true };

      await store.assignThemeAndStoreQuestion("question-id-123", fakeDto);

      expect(store.questions).toStrictEqual([existingQuestion]);
    });

    it("should show toast even when the question id is not found in the array.", async() => {
      const existingQuestion = createFakeQuestion({ id: "other-id" });
      const updatedQuestion = createFakeQuestion({ id: "question-id-123" });
      const store = useQuestionsStore();
      store.questions = [existingQuestion];
      assignThemeAsyncActionMock.execute.mockResolvedValue(updatedQuestion);
      const fakeDto: QuestionThemeAssignmentCreationDto = { themeId: "theme-id-456", isPrimary: false, isHint: true };

      await store.assignThemeAndStoreQuestion("question-id-123", fakeDto);

      expect(useAppToast().addSuccessToast).toHaveBeenCalledExactlyOnceWith({ description: "questions.assignThemeSuccessfully" });
    });

    it("should not update questions when assignTheme resolves with undefined.", async() => {
      const existingQuestion = createFakeQuestion({ id: "question-id-123" });
      const store = useQuestionsStore();
      store.questions = [existingQuestion];

      await store.assignThemeAndStoreQuestion("question-id-123", { themeId: "theme-id-456", isPrimary: false, isHint: true });

      expect(store.questions).toStrictEqual([existingQuestion]);
    });
  });

  describe("useAsyncAction setup for assignTheme", () => {
    it("should pass an async function calling repository.assignTheme as action to useAsyncAction when created.", async() => {
      const fakeQuestion = createFakeQuestion();
      const fakeDto: QuestionThemeAssignmentCreationDto = { themeId: "theme-id-456", isPrimary: false, isHint: true };
      useQuestionsStore();
      const mockAssignTheme = questionsRepository($fetch).assignTheme as ReturnType<typeof vi.fn>;
      mockAssignTheme.mockResolvedValue(fakeQuestion);

      await capturedAssignThemeAction?.("question-id-123", fakeDto);

      expect(mockAssignTheme).toHaveBeenCalledExactlyOnceWith("question-id-123", fakeDto);
    });

    it("should return the result from repository.assignTheme when the captured action is invoked.", async() => {
      const fakeQuestion = createFakeQuestion();
      const fakeDto: QuestionThemeAssignmentCreationDto = { themeId: "theme-id-456", isPrimary: false, isHint: true };
      useQuestionsStore();
      const mockAssignTheme = questionsRepository($fetch).assignTheme as ReturnType<typeof vi.fn>;
      mockAssignTheme.mockResolvedValue(fakeQuestion);

      const result = await capturedAssignThemeAction?.("question-id-123", fakeDto);

      expect(result).toBe(fakeQuestion);
    });

    it("should call handleGoatItApiError with the error and cantAssignTheme translation key when the assignTheme error callback is invoked.", () => {
      useQuestionsStore();
      const fakeError = new Error("assignTheme failed");

      capturedAssignThemeOnError?.(fakeError);

      expect(useGoatItApiErrorToast().handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(fakeError, "questions.cantAssignTheme");
    });
  });

  describe("removeThemeFromQuestionStatus", () => {
    it("should reflect the fetchStatus value from useAsyncAction when created.", () => {
      const store = useQuestionsStore();

      expect(store.removeThemeFromQuestionStatus).toBe(removeThemeAsyncActionMock.fetchStatus.value);
    });

    it("should update when the fetchStatus changes to pending.", () => {
      const store = useQuestionsStore();
      removeThemeAsyncActionMock.fetchStatus.value = "pending";

      expect(store.removeThemeFromQuestionStatus).toBe("pending");
    });
  });

  describe("isRemovingThemeFromQuestion", () => {
    it("should be false when removeThemeStatus is idle.", () => {
      const store = useQuestionsStore();

      expect(store.isRemovingThemeFromQuestion).toBeFalsy();
    });

    it("should be true when removeThemeStatus is pending.", () => {
      const store = useQuestionsStore();
      removeThemeAsyncActionMock.fetchStatus.value = "pending";

      expect(store.isRemovingThemeFromQuestion).toBeTruthy();
    });
  });

  describe("isRemoveThemeFromQuestionSuccess", () => {
    it("should be false when removeThemeStatus is idle.", () => {
      const store = useQuestionsStore();

      expect(store.isRemoveThemeFromQuestionSuccess).toBeFalsy();
    });

    it("should be true when removeThemeStatus is success.", () => {
      const store = useQuestionsStore();
      removeThemeAsyncActionMock.fetchStatus.value = "success";

      expect(store.isRemoveThemeFromQuestionSuccess).toBeTruthy();
    });
  });

  describe("isRemovingThemeFromQuestionError", () => {
    it("should be false when removeThemeStatus is idle.", () => {
      const store = useQuestionsStore();

      expect(store.isRemovingThemeFromQuestionError).toBeFalsy();
    });

    it("should be true when removeThemeStatus is error.", () => {
      const store = useQuestionsStore();
      removeThemeAsyncActionMock.fetchStatus.value = "error";

      expect(store.isRemovingThemeFromQuestionError).toBeTruthy();
    });
  });

  describe("removeThemeAndStoreQuestion", () => {
    it("should call the removeTheme execute function with the id and themeId when invoked.", async() => {
      const store = useQuestionsStore();

      await store.removeThemeAndStoreQuestion("question-id-123", "theme-id-456");

      expect(removeThemeAsyncActionMock.execute).toHaveBeenCalledExactlyOnceWith("question-id-123", "theme-id-456");
    });

    it("should replace the question in the array when removeTheme resolves with the updated question.", async() => {
      const existingQuestion = createFakeQuestion({ id: "question-id-123" });
      const otherQuestion = createFakeQuestion({ id: "other-id" });
      const updatedQuestion = createFakeQuestion({ id: "question-id-123" });
      const store = useQuestionsStore();
      store.questions = [otherQuestion, existingQuestion];
      removeThemeAsyncActionMock.execute.mockResolvedValue(updatedQuestion);

      await store.removeThemeAndStoreQuestion("question-id-123", "theme-id-456");

      expect(store.questions).toStrictEqual([otherQuestion, updatedQuestion]);
    });

    it("should add success toast when removeTheme resolves with the updated question.", async() => {
      const existingQuestion = createFakeQuestion({ id: "question-id-123" });
      const updatedQuestion = createFakeQuestion({ id: "question-id-123" });
      const store = useQuestionsStore();
      store.questions = [existingQuestion];
      removeThemeAsyncActionMock.execute.mockResolvedValue(updatedQuestion);

      await store.removeThemeAndStoreQuestion("question-id-123", "theme-id-456");

      expect(useAppToast().addSuccessToast).toHaveBeenCalledExactlyOnceWith({
        description: "questions.removeThemeSuccessfully",
      });
    });

    it("should not splice the array when the question id is not found in the array.", async() => {
      const existingQuestion = createFakeQuestion({ id: "other-id" });
      const updatedQuestion = createFakeQuestion({ id: "question-id-123" });
      const store = useQuestionsStore();
      store.questions = [existingQuestion];
      removeThemeAsyncActionMock.execute.mockResolvedValue(updatedQuestion);

      await store.removeThemeAndStoreQuestion("question-id-123", "theme-id-456");

      expect(store.questions).toStrictEqual([existingQuestion]);
    });

    it("should show toast even when the question id is not found in the array.", async() => {
      const existingQuestion = createFakeQuestion({ id: "other-id" });
      const updatedQuestion = createFakeQuestion({ id: "question-id-123" });
      const store = useQuestionsStore();
      store.questions = [existingQuestion];
      removeThemeAsyncActionMock.execute.mockResolvedValue(updatedQuestion);

      await store.removeThemeAndStoreQuestion("question-id-123", "theme-id-456");

      expect(useAppToast().addSuccessToast).toHaveBeenCalledExactlyOnceWith({ description: "questions.removeThemeSuccessfully" });
    });

    it("should not update questions when removeTheme resolves with undefined.", async() => {
      const existingQuestion = createFakeQuestion({ id: "question-id-123" });
      const store = useQuestionsStore();
      store.questions = [existingQuestion];

      await store.removeThemeAndStoreQuestion("question-id-123", "theme-id-456");

      expect(store.questions).toStrictEqual([existingQuestion]);
    });
  });

  describe("useAsyncAction setup for removeTheme", () => {
    it("should pass an async function calling repository.removeTheme as action to useAsyncAction when created.", async() => {
      const fakeQuestion = createFakeQuestion();
      useQuestionsStore();
      const mockRemoveTheme = questionsRepository($fetch).removeTheme as ReturnType<typeof vi.fn>;
      mockRemoveTheme.mockResolvedValue(fakeQuestion);

      await capturedRemoveThemeAction?.("question-id-123", "theme-id-456");

      expect(mockRemoveTheme).toHaveBeenCalledExactlyOnceWith("question-id-123", "theme-id-456");
    });

    it("should return the result from repository.removeTheme when the captured action is invoked.", async() => {
      const fakeQuestion = createFakeQuestion();
      useQuestionsStore();
      const mockRemoveTheme = questionsRepository($fetch).removeTheme as ReturnType<typeof vi.fn>;
      mockRemoveTheme.mockResolvedValue(fakeQuestion);

      const result = await capturedRemoveThemeAction?.("question-id-123", "theme-id-456");

      expect(result).toBe(fakeQuestion);
    });

    it("should call handleGoatItApiError with the error and cantRemoveTheme translation key when the removeTheme error callback is invoked.", () => {
      useQuestionsStore();
      const fakeError = new Error("removeTheme failed");

      capturedRemoveThemeOnError?.(fakeError);

      expect(useGoatItApiErrorToast().handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(fakeError, "questions.cantRemoveTheme");
    });
  });

  describe("modifyQuestionThemeAssignmentStatus", () => {
    it("should reflect the fetchStatus value from useAsyncAction when created.", () => {
      const store = useQuestionsStore();

      expect(store.modifyQuestionThemeAssignmentStatus).toBe(modifyThemeAssignmentAsyncActionMock.fetchStatus.value);
    });

    it("should update when the fetchStatus changes to pending.", () => {
      const store = useQuestionsStore();
      modifyThemeAssignmentAsyncActionMock.fetchStatus.value = "pending";

      expect(store.modifyQuestionThemeAssignmentStatus).toBe("pending");
    });
  });

  describe("isModifyingQuestionThemeAssignment", () => {
    it("should be false when modifyThemeAssignmentStatus is idle.", () => {
      const store = useQuestionsStore();

      expect(store.isModifyingQuestionThemeAssignment).toBeFalsy();
    });

    it("should be true when modifyThemeAssignmentStatus is pending.", () => {
      const store = useQuestionsStore();
      modifyThemeAssignmentAsyncActionMock.fetchStatus.value = "pending";

      expect(store.isModifyingQuestionThemeAssignment).toBeTruthy();
    });
  });

  describe("isModifyQuestionThemeAssignmentSuccess", () => {
    it("should be false when modifyThemeAssignmentStatus is idle.", () => {
      const store = useQuestionsStore();

      expect(store.isModifyQuestionThemeAssignmentSuccess).toBeFalsy();
    });

    it("should be true when modifyThemeAssignmentStatus is success.", () => {
      const store = useQuestionsStore();
      modifyThemeAssignmentAsyncActionMock.fetchStatus.value = "success";

      expect(store.isModifyQuestionThemeAssignmentSuccess).toBeTruthy();
    });
  });

  describe("isModifyingQuestionThemeAssignmentError", () => {
    it("should be false when modifyThemeAssignmentStatus is idle.", () => {
      const store = useQuestionsStore();

      expect(store.isModifyingQuestionThemeAssignmentError).toBeFalsy();
    });

    it("should be true when modifyThemeAssignmentStatus is error.", () => {
      const store = useQuestionsStore();
      modifyThemeAssignmentAsyncActionMock.fetchStatus.value = "error";

      expect(store.isModifyingQuestionThemeAssignmentError).toBeTruthy();
    });
  });

  describe("modifyThemeAssignmentAndStoreQuestion", () => {
    it("should call the modifyThemeAssignment execute function with the id, themeId and dto when invoked.", async() => {
      const store = useQuestionsStore();
      const fakeDto: QuestionThemeAssignmentModificationDto = { isPrimary: true, isHint: false };

      await store.modifyThemeAssignmentAndStoreQuestion("question-id-123", "theme-id-456", fakeDto);

      expect(modifyThemeAssignmentAsyncActionMock.execute).toHaveBeenCalledExactlyOnceWith("question-id-123", "theme-id-456", fakeDto);
    });

    it("should replace the question in the array when modifyThemeAssignment resolves with the updated question.", async() => {
      const existingQuestion = createFakeQuestion({ id: "question-id-123" });
      const otherQuestion = createFakeQuestion({ id: "other-id" });
      const updatedQuestion = createFakeQuestion({ id: "question-id-123" });
      const store = useQuestionsStore();
      store.questions = [otherQuestion, existingQuestion];
      modifyThemeAssignmentAsyncActionMock.execute.mockResolvedValue(updatedQuestion);
      const fakeDto: QuestionThemeAssignmentModificationDto = { isPrimary: true, isHint: false };

      await store.modifyThemeAssignmentAndStoreQuestion("question-id-123", "theme-id-456", fakeDto);

      expect(store.questions).toStrictEqual([otherQuestion, updatedQuestion]);
    });

    it("should add success toast when modifyThemeAssignment resolves with the updated question.", async() => {
      const existingQuestion = createFakeQuestion({ id: "question-id-123" });
      const updatedQuestion = createFakeQuestion({ id: "question-id-123" });
      const store = useQuestionsStore();
      store.questions = [existingQuestion];
      modifyThemeAssignmentAsyncActionMock.execute.mockResolvedValue(updatedQuestion);
      const fakeDto: QuestionThemeAssignmentModificationDto = { isPrimary: true, isHint: false };

      await store.modifyThemeAssignmentAndStoreQuestion("question-id-123", "theme-id-456", fakeDto);

      expect(useAppToast().addSuccessToast).toHaveBeenCalledExactlyOnceWith({
        description: "questions.modifyThemeAssignmentSuccessfully",
      });
    });

    it("should not splice the array when the question id is not found in the array.", async() => {
      const existingQuestion = createFakeQuestion({ id: "other-id" });
      const updatedQuestion = createFakeQuestion({ id: "question-id-123" });
      const store = useQuestionsStore();
      store.questions = [existingQuestion];
      modifyThemeAssignmentAsyncActionMock.execute.mockResolvedValue(updatedQuestion);
      const fakeDto: QuestionThemeAssignmentModificationDto = { isPrimary: true, isHint: false };

      await store.modifyThemeAssignmentAndStoreQuestion("question-id-123", "theme-id-456", fakeDto);

      expect(store.questions).toStrictEqual([existingQuestion]);
    });

    it("should show toast even when the question id is not found in the array.", async() => {
      const existingQuestion = createFakeQuestion({ id: "other-id" });
      const updatedQuestion = createFakeQuestion({ id: "question-id-123" });
      const store = useQuestionsStore();
      store.questions = [existingQuestion];
      modifyThemeAssignmentAsyncActionMock.execute.mockResolvedValue(updatedQuestion);
      const fakeDto: QuestionThemeAssignmentModificationDto = { isPrimary: true, isHint: false };

      await store.modifyThemeAssignmentAndStoreQuestion("question-id-123", "theme-id-456", fakeDto);

      expect(useAppToast().addSuccessToast).toHaveBeenCalledExactlyOnceWith({ description: "questions.modifyThemeAssignmentSuccessfully" });
    });

    it("should not update questions when modifyThemeAssignment resolves with undefined.", async() => {
      const existingQuestion = createFakeQuestion({ id: "question-id-123" });
      const store = useQuestionsStore();
      store.questions = [existingQuestion];

      await store.modifyThemeAssignmentAndStoreQuestion("question-id-123", "theme-id-456", { isPrimary: true, isHint: false });

      expect(store.questions).toStrictEqual([existingQuestion]);
    });
  });

  describe("useAsyncAction setup for modifyThemeAssignment", () => {
    it("should pass an async function calling repository.modifyThemeAssignment as action to useAsyncAction when created.", async() => {
      const fakeQuestion = createFakeQuestion();
      const fakeDto: QuestionThemeAssignmentModificationDto = { isPrimary: true, isHint: false };
      useQuestionsStore();
      const mockModifyThemeAssignment = questionsRepository($fetch).modifyThemeAssignment as ReturnType<typeof vi.fn>;
      mockModifyThemeAssignment.mockResolvedValue(fakeQuestion);

      await capturedModifyThemeAssignmentAction?.("question-id-123", "theme-id-456", fakeDto);

      expect(mockModifyThemeAssignment).toHaveBeenCalledExactlyOnceWith("question-id-123", "theme-id-456", fakeDto);
    });

    it("should return the result from repository.modifyThemeAssignment when the captured action is invoked.", async() => {
      const fakeQuestion = createFakeQuestion();
      const fakeDto: QuestionThemeAssignmentModificationDto = { isPrimary: true, isHint: false };
      useQuestionsStore();
      const mockModifyThemeAssignment = questionsRepository($fetch).modifyThemeAssignment as ReturnType<typeof vi.fn>;
      mockModifyThemeAssignment.mockResolvedValue(fakeQuestion);

      const result = await capturedModifyThemeAssignmentAction?.("question-id-123", "theme-id-456", fakeDto);

      expect(result).toBe(fakeQuestion);
    });

    it("should call handleGoatItApiError with the error and cantModifyThemeAssignment translation key when the modifyThemeAssignment error callback is invoked.", () => {
      useQuestionsStore();
      const fakeError = new Error("modifyThemeAssignment failed");

      capturedModifyThemeAssignmentOnError?.(fakeError);

      expect(useGoatItApiErrorToast().handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(fakeError, "questions.cantModifyThemeAssignment");
    });
  });

  describe("modifyQuestionStatus", () => {
    it("should reflect the fetchStatus value from useAsyncAction when created.", () => {
      const store = useQuestionsStore();

      expect(store.modifyQuestionStatus).toBe(modifyAsyncActionMock.fetchStatus.value);
    });

    it("should update when the fetchStatus changes to pending.", () => {
      const store = useQuestionsStore();
      modifyAsyncActionMock.fetchStatus.value = "pending";

      expect(store.modifyQuestionStatus).toBe("pending");
    });
  });

  describe("isModifyingQuestion", () => {
    it("should be false when modifyQuestionStatus is idle.", () => {
      const store = useQuestionsStore();

      expect(store.isModifyingQuestion).toBeFalsy();
    });

    it("should be true when modifyQuestionStatus is pending.", () => {
      const store = useQuestionsStore();
      modifyAsyncActionMock.fetchStatus.value = "pending";

      expect(store.isModifyingQuestion).toBeTruthy();
    });
  });

  describe("isModifyQuestionSuccess", () => {
    it("should be false when modifyQuestionStatus is idle.", () => {
      const store = useQuestionsStore();

      expect(store.isModifyQuestionSuccess).toBeFalsy();
    });

    it("should be true when modifyQuestionStatus is success.", () => {
      const store = useQuestionsStore();
      modifyAsyncActionMock.fetchStatus.value = "success";

      expect(store.isModifyQuestionSuccess).toBeTruthy();
    });
  });

  describe("isModifyingQuestionError", () => {
    it("should be false when modifyQuestionStatus is idle.", () => {
      const store = useQuestionsStore();

      expect(store.isModifyingQuestionError).toBeFalsy();
    });

    it("should be true when modifyQuestionStatus is error.", () => {
      const store = useQuestionsStore();
      modifyAsyncActionMock.fetchStatus.value = "error";

      expect(store.isModifyingQuestionError).toBeTruthy();
    });
  });

  describe("modifyAndStoreQuestion", () => {
    it("should call the modifyQuestion execute function with the id and dto when invoked.", async() => {
      const store = useQuestionsStore();
      const fakeDto: QuestionModificationDto = { category: "trivia" };

      await store.modifyAndStoreQuestion("question-id-123", fakeDto);

      expect(modifyAsyncActionMock.execute).toHaveBeenCalledExactlyOnceWith("question-id-123", fakeDto);
    });

    it("should replace the question in the array when modifyQuestion resolves with the updated question.", async() => {
      const existingQuestion = createFakeQuestion({ id: "question-id-123" });
      const otherQuestion = createFakeQuestion({ id: "other-id" });
      const updatedQuestion = createFakeQuestion({ id: "question-id-123" });
      const store = useQuestionsStore();
      store.questions = [otherQuestion, existingQuestion];
      modifyAsyncActionMock.execute.mockResolvedValue(updatedQuestion);
      const fakeDto: QuestionModificationDto = { category: "trivia" };

      await store.modifyAndStoreQuestion("question-id-123", fakeDto);

      expect(store.questions).toStrictEqual([otherQuestion, updatedQuestion]);
    });

    it("should add success toast when modifyQuestion resolves with the updated question.", async() => {
      const existingQuestion = createFakeQuestion({ id: "question-id-123" });
      const updatedQuestion = createFakeQuestion({ id: "question-id-123" });
      const store = useQuestionsStore();
      store.questions = [existingQuestion];
      modifyAsyncActionMock.execute.mockResolvedValue(updatedQuestion);
      const fakeDto: QuestionModificationDto = { category: "trivia" };

      await store.modifyAndStoreQuestion("question-id-123", fakeDto);

      expect(useAppToast().addSuccessToast).toHaveBeenCalledExactlyOnceWith({
        description: "questions.modifySuccessfully",
      });
    });

    it("should not splice the array when the question id is not found in the array.", async() => {
      const existingQuestion = createFakeQuestion({ id: "other-id" });
      const updatedQuestion = createFakeQuestion({ id: "question-id-123" });
      const store = useQuestionsStore();
      store.questions = [existingQuestion];
      modifyAsyncActionMock.execute.mockResolvedValue(updatedQuestion);
      const fakeDto: QuestionModificationDto = { category: "trivia" };

      await store.modifyAndStoreQuestion("question-id-123", fakeDto);

      expect(store.questions).toStrictEqual([existingQuestion]);
    });

    it("should show toast even when the question id is not found in the array.", async() => {
      const existingQuestion = createFakeQuestion({ id: "other-id" });
      const updatedQuestion = createFakeQuestion({ id: "question-id-123" });
      const store = useQuestionsStore();
      store.questions = [existingQuestion];
      modifyAsyncActionMock.execute.mockResolvedValue(updatedQuestion);
      const fakeDto: QuestionModificationDto = { category: "trivia" };

      await store.modifyAndStoreQuestion("question-id-123", fakeDto);

      expect(useAppToast().addSuccessToast).toHaveBeenCalledExactlyOnceWith({ description: "questions.modifySuccessfully" });
    });

    it("should not update questions when modifyQuestion resolves with undefined.", async() => {
      const existingQuestion = createFakeQuestion({ id: "question-id-123" });
      const store = useQuestionsStore();
      store.questions = [existingQuestion];

      await store.modifyAndStoreQuestion("question-id-123", { category: "trivia" });

      expect(store.questions).toStrictEqual([existingQuestion]);
    });
  });

  describe("useAsyncAction setup for modifyQuestion", () => {
    it("should pass an async function calling repository.modify as action to useAsyncAction when created.", async() => {
      const fakeQuestion = createFakeQuestion();
      const fakeDto: QuestionModificationDto = { category: "trivia" };
      useQuestionsStore();
      const mockModify = questionsRepository($fetch).modify as ReturnType<typeof vi.fn>;
      mockModify.mockResolvedValue(fakeQuestion);

      await capturedModifyAction?.("question-id-123", fakeDto);

      expect(mockModify).toHaveBeenCalledExactlyOnceWith("question-id-123", fakeDto);
    });

    it("should return the result from repository.modify when the captured action is invoked.", async() => {
      const fakeQuestion = createFakeQuestion();
      const fakeDto: QuestionModificationDto = { category: "trivia" };
      useQuestionsStore();
      const mockModify = questionsRepository($fetch).modify as ReturnType<typeof vi.fn>;
      mockModify.mockResolvedValue(fakeQuestion);

      const result = await capturedModifyAction?.("question-id-123", fakeDto);

      expect(result).toBe(fakeQuestion);
    });

    it("should call handleGoatItApiError with the error and cantModify translation key when the modifyQuestion error callback is invoked.", () => {
      useQuestionsStore();
      const fakeError = new Error("modify failed");

      capturedModifyOnError?.(fakeError);

      expect(useGoatItApiErrorToast().handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(fakeError, "questions.cantModify");
    });
  });
});