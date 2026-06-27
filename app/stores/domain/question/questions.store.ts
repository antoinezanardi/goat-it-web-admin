import type { AdminFindQuestionsQueryDto, QuestionCreationDto, QuestionModificationDto, QuestionThemeAssignmentCreationDto, QuestionThemeAssignmentModificationDto } from "@goat-it/schemas/question";

import { replaceInArrayById } from "#shared/utils/helpers/array/array.helpers";

export const useQuestionsStore = defineStore(StoreNames.QUESTIONS, () => {
  const questions = ref<Question[]>([]);

  const repository = questionsRepository($fetch);
  const { addSuccessToast } = useAppToast();
  const { handleGoatItApiError } = useGoatItApiErrorToast();
  const { t } = useI18n();

  const {
    execute: fetchQuestions,
    fetchStatus: fetchQuestionsStatus,
    isPending: isFetchingQuestions,
    isSuccess: isFetchQuestionsSuccess,
    isError: isFetchingQuestionsError,
  } = useAsyncAction(
    repository.getAll,
    (thrownError: unknown) => handleGoatItApiError(thrownError, t("questions.cantFetch")),
  );

  const {
    execute: createQuestion,
    fetchStatus: createQuestionStatus,
    isPending: isCreatingQuestion,
    isSuccess: isCreateQuestionSuccess,
    isError: isCreatingQuestionError,
  } = useAsyncAction(
    async(creationDto: QuestionCreationDto) => repository.create(creationDto),
    (thrownError: unknown) => handleGoatItApiError(thrownError, t("questions.cantCreate")),
  );

  const {
    execute: archiveQuestion,
    fetchStatus: archiveQuestionStatus,
    isPending: isArchivingQuestion,
    isSuccess: isArchiveQuestionSuccess,
    isError: isArchivingQuestionError,
  } = useAsyncAction(
    async(id: string) => repository.archive(id),
    (thrownError: unknown) => handleGoatItApiError(thrownError, t("questions.cantArchive")),
  );

  const {
    execute: assignThemeToQuestion,
    fetchStatus: assignThemeToQuestionStatus,
    isPending: isAssigningThemeToQuestion,
    isSuccess: isAssignThemeToQuestionSuccess,
    isError: isAssigningThemeToQuestionError,
  } = useAsyncAction(
    async(id: string, dto: QuestionThemeAssignmentCreationDto) => repository.assignTheme(id, dto),
    (thrownError: unknown) => handleGoatItApiError(thrownError, t("questions.cantAssignTheme")),
  );

  const {
    execute: removeThemeFromQuestion,
    fetchStatus: removeThemeFromQuestionStatus,
    isPending: isRemovingThemeFromQuestion,
    isSuccess: isRemoveThemeFromQuestionSuccess,
    isError: isRemovingThemeFromQuestionError,
  } = useAsyncAction(
    async(id: string, themeId: string) => repository.removeTheme(id, themeId),
    (thrownError: unknown) => handleGoatItApiError(thrownError, t("questions.cantRemoveTheme")),
  );

  const {
    execute: modifyQuestionThemeAssignment,
    fetchStatus: modifyQuestionThemeAssignmentStatus,
    isPending: isModifyingQuestionThemeAssignment,
    isSuccess: isModifyQuestionThemeAssignmentSuccess,
    isError: isModifyingQuestionThemeAssignmentError,
  } = useAsyncAction(
    async(id: string, themeId: string, dto: QuestionThemeAssignmentModificationDto) => repository.modifyThemeAssignment(id, themeId, dto),
    (thrownError: unknown) => handleGoatItApiError(thrownError, t("questions.cantModifyThemeAssignment")),
  );

  const {
    execute: modifyQuestion,
    fetchStatus: modifyQuestionStatus,
    isPending: isModifyingQuestion,
    isSuccess: isModifyQuestionSuccess,
    isError: isModifyingQuestionError,
  } = useAsyncAction(
    async(id: string, dto: QuestionModificationDto) => repository.modify(id, dto),
    (thrownError: unknown) => handleGoatItApiError(thrownError, t("questions.cantModify")),
  );

  async function fetchAndStoreQuestions(query?: AdminFindQuestionsQueryDto): Promise<void> {
    const fetchedQuestions = await fetchQuestions(query);
    if (fetchedQuestions) {
      questions.value = fetchedQuestions;
    }
  }

  async function createAndStoreQuestion(creationDto: QuestionCreationDto): Promise<void> {
    const createdQuestion = await createQuestion(creationDto);
    if (createdQuestion) {
      questions.value.unshift(createdQuestion);
      addSuccessToast({ description: t("questions.createSuccessfully"), id: "question-create-success" });
    }
  }

  async function archiveAndStoreQuestion(id: string): Promise<void> {
    const archivedQuestion = await archiveQuestion(id);
    if (!archivedQuestion) {
      return;
    }
    questions.value = replaceInArrayById(questions.value, id, archivedQuestion);
    addSuccessToast({ description: t("questions.archiveSuccessfully"), id: "question-archive-success" });
  }

  async function assignThemeAndStoreQuestion(id: string, dto: QuestionThemeAssignmentCreationDto): Promise<void> {
    const updatedQuestion = await assignThemeToQuestion(id, dto);
    if (!updatedQuestion) {
      return;
    }
    questions.value = replaceInArrayById(questions.value, id, updatedQuestion);
    addSuccessToast({ description: t("questions.assignThemeSuccessfully"), id: "question-assign-theme-success" });
  }

  async function removeThemeAndStoreQuestion(id: string, themeId: string): Promise<void> {
    const updatedQuestion = await removeThemeFromQuestion(id, themeId);
    if (!updatedQuestion) {
      return;
    }
    questions.value = replaceInArrayById(questions.value, id, updatedQuestion);
    addSuccessToast({ description: t("questions.removeThemeSuccessfully"), id: "question-remove-theme-success" });
  }

  async function modifyThemeAssignmentAndStoreQuestion(id: string, themeId: string, dto: QuestionThemeAssignmentModificationDto): Promise<void> {
    const updatedQuestion = await modifyQuestionThemeAssignment(id, themeId, dto);
    if (!updatedQuestion) {
      return;
    }
    questions.value = replaceInArrayById(questions.value, id, updatedQuestion);
    addSuccessToast({ description: t("questions.modifyThemeAssignmentSuccessfully"), id: "question-modify-theme-assignment-success" });
  }

  async function modifyAndStoreQuestion(id: string, dto: QuestionModificationDto): Promise<void> {
    const modifiedQuestion = await modifyQuestion(id, dto);
    if (!modifiedQuestion) {
      return;
    }
    questions.value = replaceInArrayById(questions.value, id, modifiedQuestion);
    addSuccessToast({ description: t("questions.modifySuccessfully"), id: "question-modify-success" });
  }
  return {
    questions,
    fetchQuestionsStatus,
    isFetchingQuestions,
    isFetchQuestionsSuccess,
    isFetchingQuestionsError,
    fetchAndStoreQuestions,
    createQuestionStatus,
    isCreatingQuestion,
    isCreateQuestionSuccess,
    isCreatingQuestionError,
    createAndStoreQuestion,
    archiveQuestionStatus,
    isArchivingQuestion,
    isArchiveQuestionSuccess,
    isArchivingQuestionError,
    archiveAndStoreQuestion,
    assignThemeToQuestionStatus,
    isAssigningThemeToQuestion,
    isAssignThemeToQuestionSuccess,
    isAssigningThemeToQuestionError,
    assignThemeAndStoreQuestion,
    removeThemeFromQuestionStatus,
    isRemovingThemeFromQuestion,
    isRemoveThemeFromQuestionSuccess,
    isRemovingThemeFromQuestionError,
    removeThemeAndStoreQuestion,
    modifyQuestionThemeAssignmentStatus,
    isModifyingQuestionThemeAssignment,
    isModifyQuestionThemeAssignmentSuccess,
    isModifyingQuestionThemeAssignmentError,
    modifyThemeAssignmentAndStoreQuestion,
    modifyQuestionStatus,
    isModifyingQuestion,
    isModifyQuestionSuccess,
    isModifyingQuestionError,
    modifyAndStoreQuestion,
  };
});