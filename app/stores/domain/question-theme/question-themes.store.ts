import type { AdminFindQuestionThemesQueryDto, QuestionThemeCreationDto, QuestionThemeModificationDto } from "@goat-it/schemas/question-theme";

import { replaceInArrayById } from "#shared/utils/helpers/array/array.helpers";

export const useQuestionThemesStore = defineStore(StoreNames.QUESTION_THEMES, () => {
  const questionThemes = ref<QuestionTheme[]>([]);
  const questionThemeSlugs = computed<string[]>(() => questionThemes.value.map(theme => theme.slug));

  const repository = questionThemesRepository($fetch);
  const { addSuccessToast } = useAppToast();
  const { handleGoatItApiError } = useGoatItApiErrorToast();
  const { t } = useI18n();

  const {
    execute: fetchQuestionThemes,
    fetchStatus: fetchQuestionThemesStatus,
    isPending: isFetchingQuestionThemes,
    isSuccess: isFetchQuestionThemesSuccess,
    isError: isFetchingQuestionThemesError,
  } = useAsyncAction(
    repository.getAll,
    (thrownError: unknown) => handleGoatItApiError(thrownError, t("questionThemes.cantFetch")),
  );

  const {
    execute: createQuestionTheme,
    fetchStatus: createQuestionThemeStatus,
    isPending: isCreatingQuestionTheme,
    isSuccess: isCreateQuestionThemeSuccess,
    isError: isCreatingQuestionThemeError,
  } = useAsyncAction(
    async(creationDto: QuestionThemeCreationDto) => repository.create(creationDto),
    (thrownError: unknown) => handleGoatItApiError(thrownError, t("questionThemes.cantCreate")),
  );

  const {
    execute: archiveQuestionTheme,
    fetchStatus: archiveQuestionThemeStatus,
    isPending: isArchivingQuestionTheme,
    isSuccess: isArchiveQuestionThemeSuccess,
    isError: isArchivingQuestionThemeError,
  } = useAsyncAction(
    async(id: string) => repository.archive(id),
    (thrownError: unknown) => handleGoatItApiError(thrownError, t("questionThemes.cantArchive")),
  );

  const {
    execute: modifyQuestionTheme,
    fetchStatus: modifyQuestionThemeStatus,
    isPending: isModifyingQuestionTheme,
    isSuccess: isModifyQuestionThemeSuccess,
    isError: isModifyingQuestionThemeError,
  } = useAsyncAction(
    async(id: string, modificationDto: QuestionThemeModificationDto) => repository.patch(id, modificationDto),
    (thrownError: unknown) => handleGoatItApiError(thrownError, t("questionThemes.cantModify")),
  );

  async function fetchAndStoreQuestionThemes(query?: AdminFindQuestionThemesQueryDto): Promise<void> {
    const fetchedQuestionThemes = await fetchQuestionThemes(query);
    if (fetchedQuestionThemes) {
      questionThemes.value = fetchedQuestionThemes;
    }
  }

  async function createAndStoreQuestionTheme(creationDto: QuestionThemeCreationDto): Promise<void> {
    const createdQuestionTheme = await createQuestionTheme(creationDto);
    if (createdQuestionTheme) {
      questionThemes.value.unshift(createdQuestionTheme);
      addSuccessToast({ description: t("questionThemes.createSuccessfully") });
    }
  }

  async function archiveAndStoreQuestionTheme(id: string): Promise<void> {
    const archivedQuestionTheme = await archiveQuestionTheme(id);
    if (!archivedQuestionTheme) {
      return;
    }
    questionThemes.value = replaceInArrayById(questionThemes.value, id, archivedQuestionTheme);
    addSuccessToast({ description: t("questionThemes.archiveSuccessfully") });
  }

  async function modifyAndStoreQuestionTheme(id: string, modificationDto: QuestionThemeModificationDto): Promise<void> {
    const modifiedQuestionTheme = await modifyQuestionTheme(id, modificationDto);
    if (!modifiedQuestionTheme) {
      return;
    }
    questionThemes.value = replaceInArrayById(questionThemes.value, id, modifiedQuestionTheme);
    addSuccessToast({ description: t("questionThemes.modifySuccessfully") });
  }
  return {
    questionThemes,
    questionThemeSlugs,
    fetchQuestionThemesStatus,
    isFetchingQuestionThemes,
    isFetchQuestionThemesSuccess,
    isFetchingQuestionThemesError,
    fetchQuestionThemes,
    fetchAndStoreQuestionThemes,
    createQuestionThemeStatus,
    isCreatingQuestionTheme,
    isCreateQuestionThemeSuccess,
    isCreatingQuestionThemeError,
    createAndStoreQuestionTheme,
    archiveQuestionThemeStatus,
    isArchivingQuestionTheme,
    isArchiveQuestionThemeSuccess,
    isArchivingQuestionThemeError,
    archiveAndStoreQuestionTheme,
    modifyQuestionThemeStatus,
    isModifyingQuestionTheme,
    isModifyQuestionThemeSuccess,
    isModifyingQuestionThemeError,
    modifyAndStoreQuestionTheme,
  };
});