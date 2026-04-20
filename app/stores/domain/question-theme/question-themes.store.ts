import type { QuestionThemeCreationDto } from "@goat-it/schemas/question-theme";

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

  async function fetchAndStoreQuestionThemes(): Promise<void> {
    const fetchedQuestionThemes = await fetchQuestionThemes();
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
    const index = questionThemes.value.findIndex(theme => theme.id === id);
    if (index === -1) {
      return;
    }
    questionThemes.value.splice(index, 1, archivedQuestionTheme);
    addSuccessToast({ description: t("questionThemes.archiveSuccessfully") });
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
  };
});